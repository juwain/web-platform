# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Веб-платформа** — Astro static site (GitHub Pages) with blog, interactive trainers, and "Pulse" feed. Russian-language content. Based on Astro Blog starter kit.

- Site: `https://juwain.github.io/web-platform/`
- Base path: `/web-platform` (configured in `astro.config.mjs`)

## Commands

```bash
pnpm install          # Install dependencies (uses pnpm)
pnpm run dev          # Dev server at localhost:4321
pnpm run build        # Production build → ./dist/ (runs on pre-commit via husky)
pnpm run preview      # Preview production build locally
```

No test framework configured. Pre-commit hook runs `pnpm run build` (via husky).

## Architecture

**Framework**: Astro 5 + React 18 (for interactive components) + TypeScript. Deployed to GitHub Pages via GitHub Actions on push to `master`.

**Content Collections** (defined in `src/content.config.ts`):
- `blog` — `src/content/blog/` (Markdown/MDX, schema: title, description, pubDate, optional heroImage/updatedDate)
- `pulse` — `src/content/pulse/` (Markdown/MDX, schema: title, description, pubDate)

**Page Types**:
- Blog: `src/pages/blog/` — listing + `[...slug].astro` for posts
- Pulse: `src/pages/pulse/` — listing + `[...slug].astro` for posts
- Trainers: `src/pages/trainers/` — interactive coding lessons with Sandpack editor
- RSS feeds: `src/pages/rss.xml.js` (blog), `src/pages/pulse/rss.xml.js` (pulse)

**Trainer Structure**: Each trainer (e.g. `design-patterns-js/`) has numbered lesson directories. Each lesson has `_content.md` (frontmatter with title/shortTitle/category/type) and `index.astro` that imports the markdown. Lessons with code challenges use Sandpack React components (`src/components/SandpackEditor/`).

**Layouts**: `TrainersLayout.astro` for trainers, `BlogPost.astro` for blog posts, `ContentLayout.astro` and `TextLayout.astro` for generic pages.

**Path Aliases** (tsconfig):
- `~/*` → `./src/*`
- `@components/*`, `@images/*`, `@layouts/*`, `@styles/*`, `@utils/*`

## Key Conventions

- All asset paths in templates use `/web-platform/...` prefix (matching `base` config)
- Content frontmatter dates: `pubDate: YYYY-MM-DD` (coerced to Date)
- Trainers use `Astro.glob` for lesson navigation (deprecated — prefer `import.meta.glob` when updating)
- Fonts: PT Astra Sans, PT Mono (loaded from `/web-platform/fonts/`)
- Expressive Code for syntax highlighting (github-dark/github-light themes)
