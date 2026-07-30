/* AIBridge — curriculum data + renderer.
 *
 * Every resource points at a real file in ./lectures or ./labs. Paths are
 * written exactly as they appear on disk (spaces, emoji and all) and are
 * URL-encoded at render time, so renaming a file only means editing it here.
 *
 * Resource kinds:
 *   slides   .pptx lecture deck
 *   notebook .ipynb Colab notebook
 *   doc      .docx script / task / assignment sheet
 *
 * Notebook links open straight in Google Colab wherever we know the notebook's
 * home — see COLAB_GITHUB below and the per-resource `colab` field. Colab can
 * only load notebooks it can fetch itself (GitHub, Drive, or a gist), so a
 * notebook that exists only in this folder falls back to downloading.
 */

const LECTURES = {
  1: {
    title: "What Is AI?",
    desc: "The opening lecture: what artificial intelligence and machine learning actually are, how they differ, and where they are already deployed — from molecular breeding and crop forecasting to the tools everyone uses daily.",
    slides: "lectures/AIBridge Lecture 1.pptx"
  },
  2: {
    title: "Python I — Input, Output, and Lists",
    desc: "Your first Python: reading from the console and from files, writing results back out, and manipulating the list — the workhorse data structure behind everything that follows.",
    slides: "lectures/AIBridge Lecture 2.pptx"
  },
  3: {
    title: "Python II — Functions and Libraries",
    desc: "What a function really is, the built-ins worth memorising, how importing works, and how to define functions of your own — the step that turns scripts into reusable tools.",
    slides: "lectures/AIBridge Lecture 3.pptx"
  },
  4: {
    title: "Models as Functions — Supervised Learning",
    desc: "The central idea of the course: an AI model is a function that maps inputs to outputs. We build up from that to features, labels, and fitting your first supervised model to data.",
    slides: "lectures/AIBridge Lecture 4.pptx"
  },
  5: {
    title: "Beyond Accuracy — Evaluating Models",
    desc: "Why a model with 99.99% accuracy can still be useless. Class imbalance, the confusion matrix, precision and recall, and how to pick a metric that matches the decision you're making.",
    slides: "lectures/AIBridge Lecture 5.pptx"
  },
  6: {
    title: "Classification — Decision Trees and Friends",
    desc: "Predicting categories instead of numbers. Decision trees from first principles, then the family that grows out of them: random forests, support vector machines, Naïve Bayes, and k-nearest neighbours.",
    slides: "lectures/AIBridge Lecture 6.pptx"
  },
  7: {
    title: "Overfitting and Generalization",
    desc: "The difference between fitting data and learning from it. Training versus testing, what a too-precise fit costs you on unseen data, and the feature-selection habits that keep models honest.",
    slides: "lectures/AIBridge Lecture 7.pptx"
  },
  8: {
    title: "Unsupervised Learning",
    desc: "What you can learn from data with no labels at all: grouping samples with clustering, and squeezing many features into a few with dimensionality reduction.",
    slides: "lectures/AIBridge Lecture 8.pptx"
  },
  9: {
    title: "LLMs and Generative AI",
    desc: "The lecture everyone comes for. What ChatGPT and its relatives are, how they got here, what they can and can't do, and how to reason about them without hype in either direction.",
    slides: "lectures/AIBridge Lecture 9.pptx"
  }
};

const LABS = {
  1: {
    title: "Data Exploration",
    desc: "Load the iris and wine-quality datasets in Colab, then work out what you're actually holding: mean, median, min, and max of a feature, filtering rows by condition, and scaling values into the 0–1 range.",
    resources: [
      { kind: "notebook", label: "Template for demo", path: "labs/LAB 1/AIBridge Lab 1 Template.ipynb" },
      { kind: "doc",      label: "Demo script",       path: "labs/LAB 1/Lab 1 Demo Script.docx" },
      { kind: "doc",      label: "Task",              path: "labs/LAB 1/Lab 1 Assignment.docx" },
      { kind: "notebook", label: "Level 1",           note: "guided",       path: "labs/LAB 1/Lab 1 Level 1.ipynb" },
      { kind: "notebook", label: "Level 2",           note: "no scaffold",  path: "labs/LAB 1/Lab 1 Level 2.ipynb" },
      { kind: "notebook", label: "Solution key",      path: "labs/LAB 1/Lab 1 Key.ipynb" }
    ]
  },
  2: {
    title: "Python for ML",
    desc: "Pull the red wine dataset straight from the UCI repository, compute the standard deviation of every feature, rescale a column by its maximum, and plot two features against each other — colouring points by how far they sit from the mean.",
    resources: [
      { kind: "notebook", label: "Demo notebook",  path: "labs/LAB 2/✅DEMO 2 - Python for ML.ipynb" },
      { kind: "doc",      label: "Demo script",    path: "labs/LAB 2/✅DEMO 2 - Python for ML.docx" },
      { kind: "notebook", label: "Lecture demo",   path: "labs/LAB 2/Lecture 2 Demo🐰.ipynb" },
      { kind: "notebook", label: "Lab demo",       path: "labs/LAB 2/Lab 2 Demo🐰.ipynb" },
      { kind: "doc",      label: "Task",           path: "labs/LAB 2/TASK 2 - Python for ML.docx" },
      { kind: "notebook", label: "Level 1", note: "guided",      path: "labs/LAB 2/LAB 2S - Python for ML.ipynb" },
      { kind: "notebook", label: "Level 2", note: "no scaffold", path: "labs/LAB 2/LAB 2B - Python for ML.ipynb" },
      { kind: "notebook", label: "Solution key",   path: "labs/LAB 2/KEY 2 - Python for ML.ipynb" }
    ]
  },
  3: {
    title: "Intro to Supervised Learning",
    desc: "Two prediction problems on the same wine data: classify a sample as red or white from its chemistry, then predict its quality score — holding out the last 200 shuffled rows to test. Bonus round: polynomial regression and hunting for feature combinations that help.",
    resources: [
      { kind: "notebook", label: "Demo notebook", path: "labs/LAB 3/Lab 3 Demo🤖.ipynb" },
      { kind: "doc",      label: "Demo script",   path: "labs/LAB 3/✅DEMO 3 - Intro to Supervised.docx" },
      { kind: "doc",      label: "Task",          path: "labs/LAB 3/Lab 3 Assignment.docx" },
      { kind: "notebook", label: "Level 1", note: "guided",      path: "labs/LAB 3/Lab 3 Level 1.ipynb" },
      { kind: "notebook", label: "Level 2", note: "no scaffold", path: "labs/LAB 3/Lab 3 Level 2.ipynb" },
      { kind: "notebook", label: "Solution key",  path: "labs/LAB 3/Lab 3 Key.ipynb" }
    ]
  },
  4: {
    title: "Classification Models",
    desc: "Fit and plot a decision tree on the wine dataset, then put random forest, SVM, and Naïve Bayes side by side on red-vs-white classification and compare their accuracy on a held-out test set. Bonus: KNN, and what happens when one class is starved of samples.",
    resources: [
      { kind: "doc",      label: "Demo script",  path: "labs/LAB 4/Lab 4 Demo Script.docx" },
      { kind: "doc",      label: "Task",         path: "labs/LAB 4/Lab 4 Assignment.docx" },
      { kind: "notebook", label: "Level 1", note: "guided",      path: "labs/LAB 4/Lab 4 Level 1.ipynb" },
      { kind: "notebook", label: "Level 2", note: "no scaffold", path: "labs/LAB 4/Lab 4 Level 2.ipynb" },
      { kind: "notebook", label: "Solution key", path: "labs/LAB 4/Lab 4 Key.ipynb" }
    ]
  },
  5: {
    title: "Overfitting and Feature Selection",
    desc: "Fit a logistic regression to a modified iris dataset — train on the first 100 samples, test on the last 50 — then run feature selection with SelectKBest or VarianceThreshold, refit on the trimmed features, and see what fewer inputs buy you.",
    resources: [
      { kind: "notebook", label: "Demo notebook", path: "labs/LAB 5/Lab 5 Demo 🦾.ipynb" },
      { kind: "doc",      label: "Demo script",   path: "labs/LAB 5/DEMO 5 -- Overfitting and Feature Selection.docx" },
      { kind: "doc",      label: "Task",          path: "labs/LAB 5/TASK 5 -- Overfitting and Feature Selection.docx" },
      { kind: "notebook", label: "Level 1", note: "guided",      path: "labs/LAB 5/LAB 5S -- Overfitting and Feature Selection.ipynb" },
      { kind: "notebook", label: "Level 2", note: "no scaffold", path: "labs/LAB 5/LAB 5B -- Overfitting and Feature Selection.ipynb" },
      { kind: "notebook", label: "Solution key",  path: "labs/LAB 5/KEY 5 -- Overfitting and Feature Selection.ipynb" }
    ]
  },
  6: {
    title: "Diagnosing Bad Data",
    desc: "A model can be sound and still be wrong, because the data underneath it is broken. Each dataset in this lab has something deliberately wrong with it — find the fault, decide whether it can be fixed, and fix the ones that can.",
    resources: [
      { kind: "notebook", label: "Demo notebook", path: "labs/LAB 6/Lab 6 Demo.ipynb" },
      { kind: "doc",      label: "Demo script",   path: "labs/LAB 6/Lab 6 Demo Script.docx" },
      { kind: "doc",      label: "Task",          path: "labs/LAB 6/Lab 6 Assignment.docx" },
      { kind: "notebook", label: "Solution key",  path: "labs/LAB 6/Lab 6 Key.ipynb" }
    ]
  },
  7: {
    title: "Clustering and PCA",
    desc: "Run k-means on the wine data and see how closely the clusters it invents match the real classes — then sweep k to find out how much that answer depends on your guess. Follow with PCA: drop dimensions, watch accuracy respond, and plot the whole dataset in 2D.",
    resources: [
      { kind: "notebook", label: "Demo notebook", path: "labs/LAB 7/Lab 7 Demo.ipynb" },
      { kind: "doc",      label: "Demo script",   path: "labs/LAB 7/Lab 7 Demo Script.docx" },
      { kind: "doc",      label: "Task",          path: "labs/LAB 7/Lab 7 Assignment.docx" },
      { kind: "notebook", label: "Level 1", note: "guided",      path: "labs/LAB 7/Lab 7 level 1.ipynb" },
      { kind: "notebook", label: "Level 2", note: "no scaffold", path: "labs/LAB 7/Lab 7 Level 2.ipynb" },
      { kind: "notebook", label: "Solution key",  path: "labs/LAB 7/Lab 7 Key.ipynb" }
    ]
  },
  8: {
    title: "LLMs and Generative AI",
    desc: "Learn to work with an LLM rather than at it. Pick a character, brainstorm an app idea with the model, implement a short program with its help, and generate test cases that show your code is actually correct — then pitch it in one line, thirty seconds, and two minutes.",
    resources: [
      { kind: "doc", label: "Demo script", path: "labs/LAB 8/✅DEMO 8 - LLMs and Generative AI.docx" },
      { kind: "doc", label: "Task",        path: "labs/LAB 8/TASK 8 - LLMs and Generative AI.docx" }
    ]
  }
};

/* Day-by-day schedule: two lectures and their paired labs per day.
   Nine lectures against eight labs, so day 5 closes on a lecture alone. */
const SCHEDULE = [
  { day: 1, rows: [[1, 1], [2, 2]] },
  { day: 2, rows: [[3, 3], [4, 4]] },
  { day: 3, rows: [[5, 5], [6, 6]] },
  { day: 4, rows: [[7, 7], [8, 8]] },
  { day: 5, rows: [[9, null]] }
];

/* ------------------------------------------------------- release timing ---
 *
 * Materials stay locked until their day begins. Set `start` to the first
 * session of the cohort and everything else follows from it.
 *
 *   start:   local date of day 1, e.g. "2026-08-03".
 *            null  → nothing is gated (the public archive / self-paced mode).
 *   offsets: days after `start` that each course day runs.
 *            [0,1,2,3,4]      consecutive days (a week-long camp)
 *            [0,7,14,21,28]   one session a week (a library series)
 *   slotTimes: when each lecture+lab pair of a day opens. The first pair uses
 *            slotTimes[0], the second slotTimes[1], and so on; a day with more
 *            pairs than times listed reuses the last one.
 *   keyDelayHours: how long after its own lab a solution key unlocks, so
 *            students get the task before the answers. null → same time.
 *
 * Instructors can add ?preview to the URL to see everything early.
 */
const RELEASE = {
  start: "2026-08-03",
  offsets: [0, 1, 2, 3, 4],
  slotTimes: ["08:00", "12:00"],
  keyDelayHours: 3
};

/* --------------------------------------------------------------- colab ---
 *
 * Two ways to make a notebook open in Colab; either is enough.
 *
 * 1. Whole folder at once. If this site is pushed to GitHub, fill this in and
 *    every notebook below links into Colab from its path — no per-file edits.
 *    Colab's GitHub loader needs filenames ending in .ipynb, so run
 *    `python3 tools/rename-notebooks.py --apply` first (see the README).
 *
 *      const COLAB_GITHUB = { owner: "aibridgecamp", repo: "aibridge-site", branch: "main" };
 *
 * 2. Per notebook. Add `colab:` to any resource — a Colab link, a Drive share
 *    link, or a bare Drive file id. Useful if the notebooks already live in
 *    Drive. It overrides the GitHub setting for that one file:
 *
 *      { kind: "notebook", label: "Level 1", path: "…", colab: "1AbC…xyz" }
 */
const COLAB_GITHUB = { owner: "AIFS-AI-Bridge", repo: "aifs-ai-bridge.github.io", branch: "main" };

/* The Colab URL for a notebook, or null when we don't know where it lives. */
function colabUrl(res) {
  if (res.kind !== "notebook") return null;

  if (res.colab) {
    if (/colab\.research\.google\.com/.test(res.colab)) return res.colab;
    // Drive share links and bare ids both reduce to the file id.
    const id = res.colab.match(/[-\w]{25,}/);
    return id ? "https://colab.research.google.com/drive/" + id[0] : res.colab;
  }

  if (COLAB_GITHUB && COLAB_GITHUB.owner && COLAB_GITHUB.repo) {
    return "https://colab.research.google.com/github/" +
           COLAB_GITHUB.owner + "/" + COLAB_GITHUB.repo + "/blob/" +
           (COLAB_GITHUB.branch || "main") + "/" + encodeURI(res.path);
  }

  return null;
}

const PREVIEW = /[?&]preview\b/.test(location.search);

/* When a given slot opens — row 0 of a day at slotTimes[0], row 1 at
   slotTimes[1], and so on. Null when release gating is switched off. */
function unlocksAt(dayIndex, slotIndex) {
  if (!RELEASE.start) return null;

  const times = RELEASE.slotTimes && RELEASE.slotTimes.length
    ? RELEASE.slotTimes
    : ["00:00"];
  const time = times[Math.min(slotIndex, times.length - 1)];

  // Accept "2026-08-03" or "2026-08-03T08:00" for start; the date is what counts.
  const at = new Date(String(RELEASE.start).slice(0, 10) + "T" + time);
  if (isNaN(at)) return null;

  const offset = RELEASE.offsets[dayIndex] != null ? RELEASE.offsets[dayIndex] : dayIndex;
  at.setDate(at.getDate() + offset);   // keeps wall-clock time across DST
  return at;
}

function isUnlocked(when) {
  return PREVIEW || when === null || Date.now() >= when.getTime();
}

/* A solution key trails its own lab, not the day, by keyDelayHours. */
function keyUnlocksAt(when) {
  if (when === null || !RELEASE.keyDelayHours) return when;
  return new Date(when.getTime() + RELEASE.keyDelayHours * 3600000);
}

function isKey(res) {
  return /key/i.test(res.label);
}

/* Every lecture+lab slot in order, with the moment it opens. */
function allSlots() {
  const out = [];
  SCHEDULE.forEach(function (entry, dayIndex) {
    entry.rows.forEach(function (row, slotIndex) {
      out.push({
        day: entry.day,
        row: row,
        when: unlocksAt(dayIndex, slotIndex)
      });
    });
  });
  return out;
}

function slotLabel(slot) {
  return slot.row[1] === null
    ? "Lecture " + slot.row[0]
    : "Lecture " + slot.row[0] + " and Lab " + slot.row[1];
}

function formatWhen(date) {
  return date.toLocaleString(undefined, {
    weekday: "short", day: "numeric", month: "short",
    hour: "numeric", minute: "2-digit"
  });
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short", day: "numeric", month: "short"
  });
}

function formatTime(date) {
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

/* ------------------------------------------------------------ rendering --- */

const ICONS = {
  slides:   '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  notebook: '<svg viewBox="0 0 24 24"><path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 2v20M12 8h5M12 12h5"/></svg>',
  doc:      '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>'
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Notebooks are stored without a file extension; hand the browser a sensible
   download name so they land as .ipynb and open straight in Colab/Jupyter. */
function downloadName(res) {
  const base = res.path.split("/").pop();
  if (res.kind !== "notebook") return base;
  return /\.ipynb$/i.test(base) ? base : base + ".ipynb";
}

const LOCK_ICON =
  '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';

const EXTERNAL_ICON =
  '<svg class="res__ext" viewBox="0 0 24 24"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/>' +
  '<path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

function resourceLink(res) {
  const note = res.note ? " <small>· " + esc(res.note) + "</small>" : "";
  const colab = colabUrl(res);

  // Notebooks we can hand to Colab open there in a new tab.
  if (colab) {
    return (
      '<a class="res__link res__link--colab" href="' + esc(colab) + '"' +
      ' target="_blank" rel="noopener" title="Open in Google Colab">' +
      ICONS.notebook +
      "<span>" + esc(res.label) + "</span>" + note +
      EXTERNAL_ICON +
      "</a>"
    );
  }

  // Everything else downloads from this site.
  return (
    '<a class="res__link" href="' + esc(encodeURI(res.path)) + '"' +
    ' download="' + esc(downloadName(res)) + '"' +
    ' title="' + esc(res.path) + '">' +
    ICONS[res.kind] +
    "<span>" + esc(res.label) + "</span>" + note +
    "</a>"
  );
}

function lockedChip(when) {
  return (
    '<span class="res__link res__link--locked">' + LOCK_ICON +
    "<span>Unlocks " + esc(formatWhen(when)) + "</span></span>"
  );
}

/* Renders a resource list, holding back anything not yet released. */
function resourceList(resources, when) {
  if (!isUnlocked(when)) return '<div class="res">' + lockedChip(when) + "</div>";

  const keyWhen = keyUnlocksAt(when);
  const open = [];
  let heldKeys = 0;

  resources.forEach(function (res) {
    if (isKey(res) && !isUnlocked(keyWhen)) heldKeys++;
    else open.push(resourceLink(res));
  });

  if (heldKeys) open.push(lockedChip(keyWhen));
  return '<div class="res">' + open.join("") + "</div>";
}

function lectureCell(id, when) {
  const data = LECTURES[id];
  if (!data) return '<td><span class="cell__none">—</span></td>';
  return (
    "<td>" +
      '<span class="cell__kind cell__kind--lecture">Lecture ' + id + "</span>" +
      '<h3 class="cell__title">' + esc(data.title) + "</h3>" +
      '<p class="cell__desc">' + esc(data.desc) + "</p>" +
      resourceList([{ kind: "slides", label: "Slides", path: data.slides }], when) +
    "</td>"
  );
}

function labCell(id, when) {
  const data = id === null ? null : LABS[id];
  if (!data) {
    return '<td><span class="cell__none">No lab — course wrap-up and Q&amp;A</span></td>';
  }
  return (
    "<td>" +
      '<span class="cell__kind cell__kind--lab">Lab ' + id + "</span>" +
      '<h3 class="cell__title">' + esc(data.title) + "</h3>" +
      '<p class="cell__desc">' + esc(data.desc) + "</p>" +
      resourceList(data.resources, when) +
    "</td>"
  );
}

function renderSchedule() {
  const body = document.getElementById("syllabus-body");
  if (!body) return;

  body.innerHTML = SCHEDULE.map(function (entry, dayIndex) {
    const dayStart = unlocksAt(dayIndex, 0);

    return entry.rows
      .map(function (row, slotIndex) {
        const when = unlocksAt(dayIndex, slotIndex);   // each pair opens on its own clock
        const locked = !isUnlocked(when);

        const dayCell =
          slotIndex === 0
            ? '<td class="syllabus__day" rowspan="' + entry.rows.length + '">' +
                '<span class="day-pill"><small>Day</small><b>' + entry.day + "</b></span>" +
                (dayStart ? '<span class="day-when">' + esc(formatDate(dayStart)) + "</span>" : "") +
              "</td>"
            : "";

        return (
          '<tr class="' + (locked ? "is-locked" : "") + '">' +
            dayCell + lectureCell(row[0], when) + labCell(row[1], when) +
          "</tr>"
        );
      })
      .join("");
  }).join("");
}

/* Banner above the table: what's open now, and what opens next. */
function renderBanner() {
  const el = document.getElementById("release-banner");
  if (!el) return;

  if (!RELEASE.start || !unlocksAt(0, 0)) {
    el.hidden = true;
    return;
  }

  const slots = allSlots();
  const next = slots.find(function (slot) { return !isUnlocked(slot.when); });
  const times = RELEASE.slotTimes || [];

  let msg;
  if (PREVIEW) {
    msg = '<b>Preview mode.</b> You are seeing every session, including material students ' +
          "cannot open yet. Share the plain link without <code>?preview</code>.";
  } else if (!next) {
    msg = "<b>All material released.</b> Every lecture and lab from this cohort is open — " +
          "keep the notebooks and work through them at your own pace.";
  } else {
    const verb = next.row[1] === null ? "unlocks" : "unlock";
    msg = "<b>" + esc(slotLabel(next)) + " " + verb + " " + esc(formatWhen(next.when)) + ".</b> ";
    msg += next === slots[0]
      ? "Each day opens its first lecture and lab at " + esc(formatTime(unlocksAt(0, 0))) +
        (times.length > 1
          ? " and the second at " + esc(formatTime(unlocksAt(0, 1))) + "."
          : ".")
      : "Anything already released stays open for the rest of the course — nothing expires.";
  }

  el.innerHTML = msg;
  el.hidden = false;
}

document.addEventListener("DOMContentLoaded", function () {
  renderBanner();
  renderSchedule();
});
