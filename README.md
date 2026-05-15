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
- 📅 Interactive academic timeline
- 🔍 Publication search & filter (by type, year, keyword)
- 📂 Three project types: Interactive (iframe embed), External (link), Showcase (images)
- 📝 Blog with 7 category filters and full reading view
- 🐱 Cat profiles with photo gallery + Instagram link (@geumi_oaki)

## Deployment

Push to `main` branch on `rosalynshin.github.io` repository for GitHub Pages.
