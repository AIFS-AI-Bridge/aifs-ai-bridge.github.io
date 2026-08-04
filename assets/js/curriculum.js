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
    title: "AI/ML Mental Model + Python Basics",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 1.pptx",
        drive: "18adaARISvShcdaj3lNQRtaQwpErLexG1",
      },
    ],
  },
  2: {
    title: "Python for Data + AI-Assisted Coding",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 2.pptx",
        drive: "1w-QA7zaGjqCEZq_CTCnkLhWJpb5y81ON",
      },
    ],
  },
  3: {
    title: "Supervised Learning I: Models",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 3.pptx",
        drive: "1cVeZxt_zZCAzIZDOHokOjXUVt8dhiaZT",
      },
    ],
  },
  4: {
    title: "Evaluation and Data Quality",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 4.pptx",
        drive: "1Bdtz9x0bLsmXCK14wMtOM5yYNWDNybKn",
      },
    ],
  },
  5: {
    title: "More supervised learning models, Feature Importance",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 5.pptx",
        drive: "1VeiP0TjTe23C7MBkYDmW3E-wRVBvagfG",
      },
    ],
  },
  6: {
    title:
      "Overfitting, Feature Selection, ML pipeline, and Unsupervised Learning",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        note: "part 1",
        path: "lectures/AIBridge Lecture 6-1.pptx",
        drive: "1J-3zycxL4IFIvIWuy5eYqb_JEgV7JaXL",
      },
      {
        kind: "slides",
        label: "Slides",
        note: "part 2",
        path: "lectures/AIBridge Lecture 6-2.pptx",
        drive: "1_qnrz-IdGZ5SewiFZ3GBDSuPctLL6UOC",
      },
    ],
  },
  7: {
    title: "Deep Learning Basics: Pretraining and Fine-Tuning",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 7.pptx",
        drive: "1BpunXm1qhrSfY5ZfVMe0l4zRdBN-l0M-",
      },
    ],
  },
  8: {
    title: "How LLMs Actually Work",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 8.pptx",
        drive: "1Ty0-JqYQ1DK0EDZF2czRwah3wj48zIJS",
      },
    ],
  },
  9: {
    title: "LLMs as Research Collaborators",
    slides: [
      {
        kind: "slides",
        label: "Slides",
        path: "lectures/AIBridge Lecture 9.pptx",
        drive: "1IvsN-LwnJhQ6TlGjZ_t9u5ywPRvD_Bex",
      },
    ],
  },
};

const LABS = {
  1: {
    title: "Data Exploration",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        path: "labs/Lab 1/AIBridge Lab 1 Template.ipynb",
        drive: "1twYUNAt7L-qCekajAHkwbT-gmJKO8UnB",
      },
      {
        kind: "doc",
        label: "Task",
        path: "labs/Lab 1/Lab 1 Assignment.docx",
        drive: "13R21mkcbU-1pYXgoiGA0dwyujMs6qoDZ",
      },
      {
        kind: "notebook",
        label: "Level 1",
        note: "guided",
        path: "labs/Lab 1/Lab 1 Level 1.ipynb",
        drive: "1xBg7iGTojLax_7UuF-nuoQKj_-QvrZGk",
      },
      {
        kind: "notebook",
        label: "Level 2",
        note: "no scaffold",
        path: "labs/Lab 1/Lab 1 Level 2.ipynb",
        drive: "1CYiwSX_4RdltC7WUkLf2UBhxO_DPZbDX",
      },
      {
        kind: "notebook",
        label: "Solution key",
        path: "labs/Lab 1/Lab 1 Key.ipynb",
        drive: "1q6EPFhHfO9CXf0sx8HoU6WaNRgu0KerM",
      },
    ],
  },
  2: {
    title: "Python for ML",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        path: "labs/Lab 2/Lab 2 Demo Script.ipynb",
        drive: "1hR0UNoJjUr9lDhGCGjCDvtApXfMBVy-r",
      },
      {
        kind: "doc",
        label: "Task",
        path: "labs/Lab 2/Lab 2 Task.docx",
        drive: "1S4w0WqPp1yp2RdqSNL1fjRlGx_rCWG3U",
      },
      {
        kind: "notebook",
        label: "Level 1",
        note: "guided",
        path: "labs/Lab 2/Lab 2 Level 1.ipynb",
        drive: "1XZG6RUM7sSZ_h22lACPtYqcsBX9QjVT4",
      },
      {
        kind: "notebook",
        label: "Level 2",
        note: "no scaffold",
        path: "labs/Lab 2/Lab 2 Level 2.ipynb",
        drive: "1Yt6Ch_IaB2xI5Em5XUMBuvQvCgYW2jqv",
      },
      {
        kind: "notebook",
        label: "Solution key",
        path: "labs/Lab 2/Lab 2 Key.ipynb",
        drive: "12s1-i1R6aELyf4DRHsVvITpq5FOxUWhX",
      },
    ],
  },
  3: {
    title: "Intro to Supervised Learning",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        path: "labs/LAB 3/Lab 3 Demo🤖.ipynb",
        drive: "13R_u-FW79gZNWtXUwFZrGJ0_IDaGcxbE",
      },
      {
        kind: "doc",
        label: "Task",
        path: "labs/LAB 3/Lab 3 Assignment.docx",
        drive: "1uPmMWYYwJQ-WlDHv7aPCa5WNpD_hoKvW",
      },
      {
        kind: "notebook",
        label: "Level 1",
        note: "guided",
        path: "labs/LAB 3/Lab 3 Level 1.ipynb",
        drive: "1rqqId5oPx215BWR1ehe_u4HAnMtDQQwO",
      },
      {
        kind: "notebook",
        label: "Level 2",
        note: "no scaffold",
        path: "labs/LAB 3/Lab 3 Level 2.ipynb",
        drive: "15y0Ihz9LIHZw3JEIgjZut-HJB4UvI0LA",
      },
      {
        kind: "notebook",
        label: "Solution key",
        path: "labs/LAB 3/Lab 3 Key.ipynb",
        drive: "1VKTZNTbnazHGRTVurELt6VBfy9wcFUes",
      },
    ],
  },
  4: {
    title: "Evaluation and Data Quality",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        drive: "1IquWz2_FgoCiLpfhvKRHs_VRWi34jarR",
      },
      {
        kind: "notebook",
        label: "Demo template",
        drive: "1lu9cFadr_A3V_5ghT9VX-55ZnpMYbTlU",
      },
      {
        kind: "notebook",
        label: "Level 1",
        note: "guided",
        drive: "16NWnhRpAAZCXhoC6EseQmH542GANbKoQ",
      },
      {
        kind: "notebook",
        label: "Level 2",
        note: "no scaffold",
        drive: "1jR0t2yqhKovMnFEPiNReI0aTucCc0von",
      },
      {
        kind: "notebook",
        label: "Solution key",
        drive: "178yO3_1Z5QP3ieXsu-Ip-Kl3yw1KEuxB",
      },
    ],
  },
  5: {
    title: "Introduction to Explainability",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        path: "labs/LAB 5/Lab 5 Demo 🦾.ipynb",
        drive: "1d6TJD3_mzJ6NeTx19h4EIy0_PoT9ws1U",
      },
      {
        kind: "doc",
        label: "Task",
        path: "labs/LAB 5/TASK 5 -- Overfitting and Feature Selection.docx",
        drive: "1HsDP3nMBZ5d9KHWCGiO42AXzfCo0XSmk",
      },
      {
        kind: "notebook",
        label: "Level 1",
        note: "guided",
        path: "labs/LAB 5/LAB 5S -- Overfitting and Feature Selection.ipynb",
        drive: "1wqOSz57a9f25HxYbPSp74kyY3Db3eZoQ",
      },
      {
        kind: "notebook",
        label: "Level 2",
        note: "no scaffold",
        path: "labs/LAB 5/LAB 5B -- Overfitting and Feature Selection.ipynb",
        drive: "10zto_bLxGbHimDFGiBp3jN8mmMtpnNf7",
      },
      {
        kind: "notebook",
        label: "Solution key",
        path: "labs/LAB 5/KEY 5 -- Overfitting and Feature Selection.ipynb",
        drive: "1WtUuLVgLUTX5Br-oSFFjhnnSjTLFBKcY",
      },
    ],
  },
  6: {
    title: "Overfitting",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        path: "labs/LAB 6/Lab 6 Demo.ipynb",
        drive: "1elYtIpL4c3GPuhZ4iZD4DQOFq9OcFZ2m",
      },
      {
        kind: "doc",
        label: "Task",
        path: "labs/LAB 6/Lab 6 Assignment.docx",
        drive: "13nTGbGGpuO-_pKbiGZibI9palacMj9Ig",
      },
      {
        kind: "notebook",
        label: "Solution key",
        path: "labs/LAB 6/Lab 6 Key.ipynb",
        drive: "15FLNqxXzhE2j14zwn7DQByIPkVwUbO4_",
      },
    ],
  },
  7: {
    title: "Deep Learning and Transfer Learning",
    resources: [
      {
        kind: "notebook",
        label: "Demo",
        path: "labs/LAB 7/Lab 7 Demo.ipynb",
        drive: "1yg0EMREsR5pcdimiShKZI2sulJKZmKop",
      },
      {
        kind: "doc",
        label: "Task",
        path: "labs/LAB 7/Lab 7 Assignment.docx",
        drive: "1jdbI00YMc_wjLlo2ZCcbF5T7w0m1bScq",
      },
      {
        kind: "notebook",
        label: "Level 1",
        note: "guided",
        drive: "1NeUaETvQYWbnhr95fjOKxqhvmf_w5Jvu",
      },
      {
        kind: "notebook",
        label: "Level 2",
        note: "no scaffold",
        drive: "1TNiWS7Mv9F1INe4wj2d1XBHR8pRsQ76F",
      },
      {
        kind: "notebook",
        label: "Solution key",
        path: "labs/LAB 7/Lab 7 Key.ipynb",
        drive: "1te6V5KJorcdXfvG0u3cJR9s7EP1V7QbP",
      },
    ],
  },
  8: {
    title: "LLMs and Generative AI",
    resources: [
      {
        kind: "slides",
        label: "Slides",
        drive: "1kNVWQMzFe9NDQ-RFDRZyuNBkxgSCVabq",
      },
    ],
  },
};

/* Day-by-day schedule: two lectures and their paired labs per day.
   Nine lectures against eight labs, so day 5 closes on a lecture alone. */
const SCHEDULE = [
  {
    day: 1,
    rows: [
      [1, 1],
      [2, 2],
    ],
  },
  {
    day: 2,
    rows: [
      [3, 3],
      [4, 4],
    ],
  },
  {
    day: 3,
    rows: [
      [5, 5],
      [6, 6],
    ],
  },
  {
    day: 4,
    rows: [
      [7, 7],
      [8, 8],
    ],
  },
  { day: 5, rows: [[9, null]] },
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
  keyDelayHours: 3,
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
const COLAB_GITHUB = {
  owner: "AIFS-AI-Bridge",
  repo: "aifs-ai-bridge.github.io",
  branch: "main",
};

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
    return (
      "https://colab.research.google.com/github/" +
      COLAB_GITHUB.owner +
      "/" +
      COLAB_GITHUB.repo +
      "/blob/" +
      (COLAB_GITHUB.branch || "main") +
      "/" +
      encodeURI(res.path)
    );
  }

  return null;
}

const PREVIEW = /[?&]preview\b/.test(location.search);

/* When a given slot opens — row 0 of a day at slotTimes[0], row 1 at
   slotTimes[1], and so on. Null when release gating is switched off. */
function unlocksAt(dayIndex, slotIndex) {
  if (!RELEASE.start) return null;

  const times =
    RELEASE.slotTimes && RELEASE.slotTimes.length
      ? RELEASE.slotTimes
      : ["00:00"];
  const time = times[Math.min(slotIndex, times.length - 1)];

  // Accept "2026-08-03" or "2026-08-03T08:00" for start; the date is what counts.
  const at = new Date(String(RELEASE.start).slice(0, 10) + "T" + time);
  if (isNaN(at)) return null;

  const offset =
    RELEASE.offsets[dayIndex] != null ? RELEASE.offsets[dayIndex] : dayIndex;
  at.setDate(at.getDate() + offset); // keeps wall-clock time across DST
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
        when: unlocksAt(dayIndex, slotIndex),
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
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/* ------------------------------------------------------------ rendering --- */

const ICONS = {
  slides:
    '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  notebook:
    '<svg viewBox="0 0 24 24"><path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 2v20M12 8h5M12 12h5"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
};

const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

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

/* Where a resource opens. A Drive id wins: notebooks go to Colab, everything
   else to the Drive viewer. Without one we fall back to the repo copy. */
function resourceUrl(res) {
  if (res.drive) {
    return res.kind === "notebook"
      ? {
          href: "https://colab.research.google.com/drive/" + res.drive,
          away: true,
        }
      : {
          href: "https://drive.google.com/file/d/" + res.drive + "/view",
          away: true,
        };
  }
  const gh = colabUrl(res);
  if (gh) return { href: gh, away: true };
  return {
    href: encodeURI(res.path),
    away: false,
    download: downloadName(res),
  };
}

function resourceLink(res) {
  const note = res.note ? " <small>· " + esc(res.note) + "</small>" : "";
  const target = resourceUrl(res);

  if (target.away) {
    return (
      '<a class="res__link res__link--colab" href="' +
      esc(target.href) +
      '"' +
      ' target="_blank" rel="noopener">' +
      ICONS[res.kind] +
      "<span>" +
      esc(res.label) +
      "</span>" +
      note +
      EXTERNAL_ICON +
      "</a>"
    );
  }

  return (
    '<a class="res__link" href="' +
    esc(target.href) +
    '"' +
    ' download="' +
    esc(target.download) +
    '"' +
    ' title="' +
    esc(res.path) +
    '">' +
    ICONS[res.kind] +
    "<span>" +
    esc(res.label) +
    "</span>" +
    note +
    "</a>"
  );
}

function lockedChip(when) {
  return (
    '<span class="res__link res__link--locked">' +
    LOCK_ICON +
    "<span>Unlocks " +
    esc(formatWhen(when)) +
    "</span></span>"
  );
}

/* Renders a resource list, holding back anything not yet released. */
function resourceList(resources, when) {
  if (!isUnlocked(when))
    return '<div class="res">' + lockedChip(when) + "</div>";

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
    '<span class="cell__kind cell__kind--lecture">Lecture ' +
    id +
    "</span>" +
    '<h3 class="cell__title">' +
    esc(data.title) +
    "</h3>" +
    resourceList(data.slides, when) +
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
    '<span class="cell__kind cell__kind--lab">Lab ' +
    id +
    "</span>" +
    '<h3 class="cell__title">' +
    esc(data.title) +
    "</h3>" +
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
        const when = unlocksAt(dayIndex, slotIndex); // each pair opens on its own clock
        const locked = !isUnlocked(when);

        const dayCell =
          slotIndex === 0
            ? '<td class="syllabus__day" rowspan="' +
              entry.rows.length +
              '">' +
              '<span class="day-pill"><small>Day</small><b>' +
              entry.day +
              "</b></span>" +
              (dayStart
                ? '<span class="day-when">' +
                  esc(formatDate(dayStart)) +
                  "</span>"
                : "") +
              "</td>"
            : "";

        return (
          '<tr class="' +
          (locked ? "is-locked" : "") +
          '">' +
          dayCell +
          lectureCell(row[0], when) +
          labCell(row[1], when) +
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
  const next = slots.find(function (slot) {
    return !isUnlocked(slot.when);
  });

  let msg;
  if (PREVIEW) {
    msg = "<b>Preview mode</b> — showing unreleased material.";
  } else if (!next) {
    msg = "<b>All material released.</b>";
  } else {
    const verb = next.row[1] === null ? "unlocks" : "unlock";
    msg =
      "<b>" +
      esc(slotLabel(next)) +
      " " +
      verb +
      " " +
      esc(formatWhen(next.when)) +
      ".</b>";
  }

  el.innerHTML = msg;
  el.hidden = false;
}

document.addEventListener("DOMContentLoaded", function () {
  renderBanner();
  renderSchedule();
});
