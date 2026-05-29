# rosalynshin.github.io

Personal academic website for Rosalyn Shin.

## Folder Structure

```
📁 Root
├── index.html                ← Homepage
├── research.html             ← Research (timeline, demos, posters, publications)
├── projects.html             ← Projects (interactive / external / showcase)
├── news.html                 ← News & updates
├── blog.html                 ← Blog posts
├── cats.html                 ← Sirius & Eleanora 🐱
│
├── 📁 site/                  ← Shared code & page logic
│   ├── shared.jsx            ← Nav, Footer, PawCursor, Theme, Layout components
│   ├── styles.css            ← Global styles & resets
│   ├── home-app.jsx          ← Homepage components
│   ├── research-app.jsx      ← Research page components
│   ├── projects-app.jsx      ← Projects page components
│   ├── news-app.jsx          ← News page components
│   ├── blog-app.jsx          ← Blog page components
│   └── cats-app.jsx          ← Cats page components
│
├── 📁 content/               ← Canonical content sources (edit here)
│   ├── entries.json          ← Unified entries: project/demo/poster/publication/news
│   ├── home.json             ← Homepage curated ID lists
│   ├── blog/                 ← Markdown blog posts with frontmatter
│   └── templates/            ← Entry/blog starter templates
│
├── 📁 scripts/
│   ├── build_content.py      ← Validate + generate site/generated/content.bundle.js
│   └── publish_content.py    ← Build + git dry-run + optional commit/push
│
├── 📁 notebooks/
│   └── content_publish.ipynb ← Form-style workflow (Execute All)
│
├── 📁 site/generated/
│   └── content.bundle.js     ← Generated content bundle consumed by pages
│
├── 📁 uploads/               ← Images & media
│   ├── RosalynShin2025.JPG   ← Portrait photo
│   ├── 현금1.jpg              ← Sirius (현금) photo
│   ├── 현옥1.png              ← Eleanora (현옥) photo
│   ├── LAB06305 sh 증명.jpg   ← Sirius studio portrait
│   └── LAB06477 sh 반쪽.jpg   ← Eleanora studio portrait
│
└── 📁 projects/              ← Embedded interactive projects
    └── rrs/
        └── index.html        ← Rapid Research Synthesis tool
```

## Tech Stack

- **React 18** + **Babel** (inline JSX transpilation)
- **Cormorant Garamond** (serif headings) + **DM Sans** (body) + **Noto Sans KR** (Korean)
- Vanilla CSS with Japandi-inspired design system
- Blue accent palette: `#4A6FA5` / `#6B8FBF` / `#E8EDF4`

## Features

- 🐾 Cat paw cursor trail on all pages
- 🔍 Publication search & filter (by type, year, keyword)
- 📂 Unified content model for projects/demos/posters/publications/news
- 📝 Markdown-based blog authoring with generated HTML rendering
- 🐱 Cat profiles with photo gallery + Instagram link (@geumi_oaki)

## Content Workflow (Form → Generate → Push)

### One-time setup

```bash
python3 -m pip install --user notebook
```

### Option A: Notebook workflow (recommended)

1. Start Jupyter from repo root:

```bash
python3 -m notebook
```

2. Open `notebooks/content_publish.ipynb`.
3. Edit form variables (`ENTRIES_FORM`, `HOME_FORM`, `BLOG_FORM`).
4. Set publish controls:
   - `TARGET_BRANCH = "main"` (or another branch)
   - `PUBLISH_CONFIRM = False` for dry-run
   - `PUBLISH_CONFIRM = True` to commit + push
5. Run **Execute All**.

### Option B: CLI workflow

```bash
python3 scripts/build_content.py --check
python3 scripts/build_content.py
python3 scripts/publish_content.py --no-push
# push only when ready:
python3 scripts/publish_content.py --target-branch main --push-confirm
```

## Deployment

Push to `main` branch on `rosalynshin.github.io` repository for GitHub Pages.
