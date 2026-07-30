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

  /* ------------------------------------------------- footer year stamp --- */

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
