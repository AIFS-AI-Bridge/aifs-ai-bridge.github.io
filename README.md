# AIBridge site

Static site — plain HTML, CSS, and vanilla JS. No build step, no dependencies.

```
index.html          front page: hero, mission, what we teach, stats, testimonials, CTA
team.html           current + past members
curriculum.html     five-day schedule table, linking every lecture and lab file
events.html         past camps
assets/css/         one stylesheet
assets/js/site.js   nav, scroll reveals, photo drop-ins
assets/js/curriculum.js   curriculum data + renderer  ← edit this to change the syllabus
assets/img/         logo, plus optional photos you drop in
lectures/           source .pptx decks (linked from the curriculum page)
labs/               source notebooks and task sheets (linked from the curriculum page)
```

## Running it

Serve from the project root so the `lectures/` and `labs/` links resolve:

```sh
python3 -m http.server 8765
# → http://localhost:8765
```

Opening `index.html` via `file://` mostly works, but download links to notebooks
behave better over HTTP.

## Deploying

Upload the whole directory as-is to GitHub Pages, Netlify, Cloudflare Pages, or any
static host. Keep `lectures/` and `labs/` alongside the HTML — the curriculum page
links to them by relative path.

If you'd rather not publish the raw materials, point the entries in
`assets/js/curriculum.js` at Google Drive / Colab URLs instead; the renderer takes any
URL.

## Adding photos

No photos were included, so the site ships with generated placeholders (initials for
people, gradient tiles for events) that swap themselves out the moment a real file
appears. Drop images at these paths and reload — no code changes:

| What | Where | Notes |
| --- | --- | --- |
| Hero background | `assets/img/background.jpg` | Wide; a dark scrim is applied over it |
| Team portraits | `assets/img/team/<slug>.jpg` | Square. Slugs are in each card's `data-photo` attribute, e.g. `lily-shi.jpg` |
| Event photos | `assets/img/events/<slug>.jpg` | Landscape, e.g. `cornell-2023.jpg` |

## Editing the curriculum

Everything lives in `assets/js/curriculum.js`:

- `LECTURES` — one entry per deck: title, description, path to the `.pptx`.
- `LABS` — one entry per lab: title, description, and the list of resources
  (demo notebook, demo script, task, Level 1 / Level 2, solution key).
- `SCHEDULE` — which lecture/lab pairs sit on which day. Each row is
  `[lectureNumber, labNumber]`; use `null` for a lecture with no paired lab. The day
  cell spans however many rows that day has, so adding a third pair to a day is a
  one-line edit.

Paths are written exactly as the files sit on disk (spaces and emoji included) and are
URL-encoded at render time — so renaming a material file means editing one string here.

## Opening notebooks in Colab

Colab can only open a notebook it can fetch itself — from GitHub, Google Drive, or a
gist. A file sitting on this site's own host is not reachable that way, so a notebook
link becomes an "open in Colab" jump only once you tell it where the notebook lives.
Anything unconfigured still downloads as `.ipynb`, exactly as before.

**Route A — the whole folder from GitHub. This is what's configured.**

```js
const COLAB_GITHUB = { owner: "AIFS-AI-Bridge", repo: "aifs-ai-bridge.github.io", branch: "main" };
```

All 27 notebooks link into Colab from their path in that repo, with no per-file work.
The notebooks have already been renamed to end in `.ipynb` (Colab's GitHub loader
requires it) by:

```sh
python3 tools/rename-notebooks.py          # preview
python3 tools/rename-notebooks.py --apply  # rename, and update curriculum.js paths
```

That script is safe to re-run and reports "nothing to do" once every notebook is named
correctly — run it again after adding new notebooks. **The repo must be public**, or
students hit a GitHub authorization wall before Colab will open anything.

**Route B — per notebook, from Drive.** Best if the notebooks already live in Drive.
Add a `colab:` field to any resource; it wins over the GitHub setting for that file:

```js
{ kind: "notebook", label: "Level 1", path: "labs/LAB 1/Lab 1 Level 1.ipynb",
  colab: "1MlETo1cyM8XHTitEVvwnhBTY2q6Df4jk" }
```

A bare Drive file id, a Drive share link (`https://drive.google.com/file/d/…/view`), or
a full `colab.research.google.com/…` URL all work — the id is pulled out for you. Set
the Drive files to "anyone with the link can view" or students will hit a permission
wall.

The two routes mix freely: `COLAB_GITHUB` covers the bulk, and a `colab:` field
overrides any individual notebook where a Drive copy is the one you want.

Colab links render in amber with an external-link arrow and open in a new tab; `.docx`
and `.pptx` links are unaffected. Release gating applies to Colab links exactly as it
does to downloads — a locked notebook shows the unlock time instead of the link.

## Releasing material during a bootcamp

Material unlocks on a schedule set by the `RELEASE` block at the top of
`assets/js/curriculum.js`. Currently configured for the **August 2026 cohort**:

```js
const RELEASE = {
  start: "2026-08-03",           // date of day 1; null = nothing gated
  offsets: [0, 1, 2, 3, 4],      // days after start that each course day runs
  slotTimes: ["08:00", "12:00"], // when the 1st and 2nd lecture+lab of a day open
  keyDelayHours: 3               // a key trails its own lab by this much
};
```

Which produces:

| Session | Opens | Its key opens |
| --- | --- | --- |
| Day 1 · Lecture 1 + Lab 1 | Mon Aug 3, 8:00 AM | 11:00 AM |
| Day 1 · Lecture 2 + Lab 2 | Mon Aug 3, 12:00 PM | 3:00 PM |
| Day 2 · Lecture 3 + Lab 3 | Tue Aug 4, 8:00 AM | 11:00 AM |
| Day 2 · Lecture 4 + Lab 4 | Tue Aug 4, 12:00 PM | 3:00 PM |
| … | | |
| Day 5 · Lecture 9 | Fri Aug 7, 8:00 AM | — |

Behaviour:

- The two halves of a day unlock independently — at 8:05 AM the morning lecture and lab
  are open while the afternoon pair is still greyed out with an "Unlocks 12:00 PM" chip.
- Each solution key trails **its own lab** by `keyDelayHours`, not the day, so a morning
  key lands at 11:00 while the afternoon lab hasn't even opened.
- Locked sessions stay visible in the table so students see what's coming.
- Released material stays open for the rest of the course; nothing expires.
- A banner above the table announces the next unlock.
- Instructors add `?preview` to the URL (`…/curriculum.html?preview`) to see everything
  early. Share the plain link with students.

Times are the viewer's local clock. Everyone in the room is in the same timezone as the
camp, so this is what you want; a student joining from another timezone sees the moment
translated to theirs.

To re-run for a new cohort, change `start`. For a weekly series rather than consecutive
days: `offsets: [0, 7, 14, 21, 28]`. For a day with three sessions, add a third entry to
`slotTimes`. After the camp, set `start: null` to reopen the whole archive.

**What this does and doesn't do.** This hides links on a schedule; it is not access
control. The site is static, so a locked file is still sitting at a guessable URL
(`labs/LAB 5/KEY 5 -- ....ipynb`) for anyone who looks — and with the notebooks now on
GitHub, the repo itself is browsable. That's usually fine for pacing. If a
file genuinely must not be reachable early — solution keys are the realistic case — the
only reliable fix on a static host is to not upload it yet: keep the keys out of the
deployed folder and add them after the session, or put the whole site behind your host's
password protection (Netlify/Cloudflare Access both do this in a couple of clicks).

## Curriculum mapping

Current schedule — two lectures and their paired labs per day, lecture *n* with lab *n*.
There are nine lectures against eight labs, so day 5 closes on a lecture alone:

| Day | Lecture | Lab |
| --- | --- | --- |
| 1 | 1 What Is AI? | 1 Data Exploration |
| 1 | 2 Python I — Input, Output, and Lists | 2 Python for ML |
| 2 | 3 Python II — Functions and Libraries | 3 Intro to Supervised Learning |
| 2 | 4 Models as Functions | 4 Classification Models |
| 3 | 5 Beyond Accuracy | 5 Overfitting and Feature Selection |
| 3 | 6 Classification — Decision Trees and Friends | 6 Diagnosing Bad Data |
| 4 | 7 Overfitting and Generalization | 7 Clustering and PCA |
| 4 | 8 Unsupervised Learning | 8 LLMs and Generative AI |
| 5 | 9 LLMs and Generative AI | — |

Lecture and lab titles/descriptions were written from the contents of the decks and task
sheets in `lectures/` and `labs/` — adjust the wording freely, nothing else depends on it.
