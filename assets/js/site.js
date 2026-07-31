/* AIBridge — shared behaviour: nav, scroll reveals, optional photo drop-ins. */

(function () {
  "use strict";

  /* ------------------------------------------------------------- nav --- */

  const nav = document.querySelector(".nav");
  if (nav) {
    const toggle = nav.querySelector(".nav__toggle");
    const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll(".nav__links a").forEach((a) =>
        a.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }

    // Mark the current page in the nav.
    const here = location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll(".nav__links a").forEach((a) => {
      if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
    });
  }

  /* --------------------------------------------------------- reveals --- */

  const targets = document.querySelectorAll(".reveal");
  if (targets.length) {
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.dataset.delay || 0) + i * 60;
            setTimeout(() => entry.target.classList.add("is-in"), delay);
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      targets.forEach((el) => io.observe(el));
    }
  }

  /* ------------------------------------------- optional hero backdrop --- */
  /* Drop a photo at assets/img/background.jpg and it layers over the gradient. */

  const heroBg = document.querySelector(".hero__bg");
  if (heroBg) {
    const probe = new Image();
    probe.onload = () => {
      heroBg.style.backgroundImage =
        "linear-gradient(180deg, rgba(6,9,14,.62), rgba(6,9,14,.9)), url('assets/img/background.jpg')";
      heroBg.classList.add("has-photo");
    };
    probe.src = "assets/img/background.jpg";
  }

  /* --------------------------------------------- photo drop-in helper --- */
  /* Elements with data-photo try that file and fall back to the monogram
     already in the markup, so real photos need no code change — just files. */

  document.querySelectorAll("[data-photo]").forEach((holder) => {
    const src = holder.dataset.photo;
    if (!src) return;
    const probe = new Image();
    probe.onload = () => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = holder.dataset.photoAlt || "";
      img.loading = "lazy";
      holder.innerHTML = "";
      holder.appendChild(img);
    };
    probe.src = src;
  });

  /* ------------------------------------------------- photo carousels --- */
  /* data-gallery="dir" + data-count="n" builds a swipeable viewer over
     dir/1.jpg … dir/n.jpg. Falls back to the monogram if image 1 is absent. */

  const AUTOPLAY_MS = 5000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-gallery]").forEach((holder) => {
    const dir = holder.dataset.gallery;
    const count = Number(holder.dataset.count || 0);
    if (!dir || count < 1) return;

    const srcs = Array.from({ length: count }, (_, i) => `${dir}/${i + 1}.jpg`);
    const label = holder.dataset.photoAlt || "";

    const probe = new Image();
    probe.onload = () => build(holder, srcs, label);
    probe.src = srcs[0];
  });

  function build(holder, srcs, label) {
    let index = 0;
    let timer = null;

    holder.innerHTML = "";
    holder.classList.add("event__media--gallery");
    holder.setAttribute("role", "group");
    holder.setAttribute("aria-roledescription", "carousel");
    if (label) holder.setAttribute("aria-label", label);

    const track = document.createElement("div");
    track.className = "carousel__track";

    const slides = srcs.map((src, i) => {
      const img = document.createElement("img");
      img.className = "carousel__slide";
      img.alt = label ? `${label} — photo ${i + 1} of ${srcs.length}` : "";
      // Only the first slide loads up front; the rest fill in on demand.
      if (i === 0) img.src = src;
      else img.dataset.src = src;
      img.loading = "lazy";
      img.draggable = false;
      track.appendChild(img);
      return img;
    });
    holder.appendChild(track);

    const live = document.createElement("span");
    live.className = "visually-hidden";
    live.setAttribute("aria-live", "polite");
    holder.appendChild(live);

    /* Neighbours are fetched ahead of time so a swipe never lands on a blank. */
    const hydrate = (i) => {
      [i, (i + 1) % slides.length, (i - 1 + slides.length) % slides.length].forEach((n) => {
        const img = slides[n];
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
      });
    };

    const show = (next, announce) => {
      index = (next + slides.length) % slides.length;
      hydrate(index);
      slides.forEach((img, i) => img.classList.toggle("is-active", i === index));
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", String(i === index));
        dot.tabIndex = i === index ? 0 : -1;
      });
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
      if (announce) live.textContent = `Photo ${index + 1} of ${slides.length}`;
    };

    const step = (delta, announce) => {
      show(index + delta, announce);
      restart();
    };

    const arrow = (dir, glyph, aria) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `carousel__arrow carousel__arrow--${dir}`;
      btn.setAttribute("aria-label", aria);
      btn.innerHTML = glyph;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        step(dir === "prev" ? -1 : 1, true);
      });
      return btn;
    };

    const chevron = (d) =>
      `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    holder.appendChild(arrow("prev", chevron("M15 5 8 12l7 7"), "Previous photo"));
    holder.appendChild(arrow("next", chevron("M9 5l7 7-7 7"), "Next photo"));

    /* Past a handful of photos a dot row wraps and turns to noise, so long
       sets get a counter instead. */
    const DOT_LIMIT = 8;
    let dots = [];
    let counter = null;

    if (srcs.length > DOT_LIMIT) {
      counter = document.createElement("div");
      counter.className = "carousel__counter";
      holder.appendChild(counter);
    } else {
      const dotWrap = document.createElement("div");
      dotWrap.className = "carousel__dots";
      dotWrap.setAttribute("role", "tablist");
      dotWrap.setAttribute("aria-label", "Choose photo");
      dots = srcs.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel__dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Photo ${i + 1}`);
        dot.addEventListener("click", (e) => {
          e.preventDefault();
          show(i, true);
          restart();
        });
        dotWrap.appendChild(dot);
        return dot;
      });
      holder.appendChild(dotWrap);
    }

    /* ------------------------------------------------------ autoplay --- */

    const stop = () => {
      clearInterval(timer);
      timer = null;
    };
    const restart = () => {
      stop();
      if (reduceMotion || slides.length < 2) return;
      timer = setInterval(() => show(index + 1, false), AUTOPLAY_MS);
    };

    // Idle carousels off-screen or in a background tab waste work.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? restart() : stop()),
        { threshold: 0.25 }
      ).observe(holder);
    } else {
      restart();
    }
    document.addEventListener("visibilitychange", () =>
      document.hidden ? stop() : restart()
    );

    holder.addEventListener("mouseenter", stop);
    holder.addEventListener("mouseleave", restart);
    holder.addEventListener("focusin", stop);
    holder.addEventListener("focusout", (e) => {
      if (!holder.contains(e.relatedTarget)) restart();
    });

    /* --------------------------------------------------------- input --- */

    holder.tabIndex = 0;
    holder.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1, true);
      }
    });

    /* Pointer swipe: horizontal drags past the threshold page the carousel,
       vertical ones are left alone so the page still scrolls. */
    const SWIPE_PX = 45;
    let startX = 0;
    let startY = 0;
    let dragging = false;
    let locked = false;

    holder.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        dragging = true;
        locked = false;
        stop();
      },
      { passive: true }
    );

    holder.addEventListener(
      "touchmove",
      (e) => {
        if (!dragging) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (!locked && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) locked = true;
        if (locked) holder.classList.add("is-swiping");
      },
      { passive: true }
    );

    const endSwipe = (endX) => {
      if (!dragging) return;
      dragging = false;
      holder.classList.remove("is-swiping");
      const dx = endX - startX;
      if (locked && Math.abs(dx) > SWIPE_PX) show(index + (dx < 0 ? 1 : -1), true);
      restart();
    };

    holder.addEventListener("touchend", (e) => endSwipe(e.changedTouches[0].clientX));
    holder.addEventListener("touchcancel", () => {
      dragging = false;
      holder.classList.remove("is-swiping");
      restart();
    });

    // Mouse drag, for trackpads and desktop pointers.
    holder.addEventListener("mousedown", (e) => {
      if (e.button !== 0 || e.target.closest("button")) return;
      startX = e.clientX;
      dragging = true;
      locked = true;
      stop();
    });
    window.addEventListener("mouseup", (e) => {
      if (dragging) endSwipe(e.clientX);
    });

    show(0, false);
  }

  /* ------------------------------------------------- footer year stamp --- */

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
