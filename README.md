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
URL-encoded at render time. Lab notebooks are stored without a file extension, so links
carry a `download` name ending in `.ipynb` — they save correctly and open straight in
Colab.

## Releasing material during a bootcamp

By default nothing is gated — every link is live. To drip-feed a cohort, set the first
session in the `RELEASE` block at the top of `assets/js/curriculum.js`:

```js
const RELEASE = {
  start: "2026-08-03T09:00",   // local time of day 1; null = nothing gated
  offsets: [0, 1, 2, 3, 4],    // days after start that each course day opens
  keyDelayHours: 8             // keys trail their day by this much; null = same time
};
```

That is the only edit per cohort. Behaviour:

- Days that haven't opened stay visible in the table — greyed, with an
  "Unlocks Tue, Aug 4, 9:00 AM" chip in place of the download links — so students can see
  what's coming without being able to run ahead.
- Solution keys release `keyDelayHours` after the rest of their day, so nobody has the
  answers while working the task.
- Days stay open once released; nothing expires mid-course.
- A banner above the table announces what unlocks next.
- Instructors add `?preview` to the URL
  (`…/curriculum.html?preview`) to see everything early. Share the plain link with students.

For a weekly series rather than consecutive days, change the offsets:
`offsets: [0, 7, 14, 21, 28]`.

After the camp, set `start: null` to reopen the whole archive.

**What this does and doesn't do.** This hides links on a schedule; it is not access
control. The site is static, so a locked file is still sitting at a guessable URL
(`labs/LAB 5/KEY 5 -- ...`) for anyone who looks. That's usually fine for pacing. If a
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
