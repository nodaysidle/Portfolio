<p align="center">
  <h1 align="center">NODAYSIDLE — Portfolio</h1>
</p>

<p align="center">
  <strong>Dependency-free editorial portfolio: warm paper, ink typography, real GitHub artwork, build-time HTML—no framework, analytics, or runtime GitHub dependency.</strong>
</p>

<p align="center">
  <a href="https://nodaysidle-portfolio-nine.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-nodaysidle--portfolio--nine.vercel.app-7928CA?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Node-22%2B-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node 22+">
  <img src="https://img.shields.io/badge/Output-static%20dist-151518?style=flat-square" alt="Static">
  <img src="https://img.shields.io/badge/telemetry-none-4c8c6b?style=flat-square" alt="No telemetry">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

A dependency-free, editorial personal portfolio: warm paper, ink typography, burnt-orange signals, an animated SVG contour field, and real GitHub project artwork. Build-time rendered HTML, no frontend framework, analytics, external font requests, or runtime GitHub dependency.

## Run locally

Requires Node.js 22 or newer. No installation is necessary.

```sh
npm run dev
# http://127.0.0.1:4321 — rebuilds HTML on page reload
npm test
npm run build
npm run preview
```

The production output is `dist/`. `PORT=8080 npm run dev` changes the local port. The local server is development-only; production hosting is Vercel.

## Structure

- `src/index.html`: semantic page template.
- `public/style.css`, `public/app.js`: responsive styles and progressive enhancement.
- `public/assets/`: self-hosted fonts, licenses, GitHub artwork and optimized WebP derivatives.
- `data/profile.json`: checked-in snapshot of the owner's upstream content.
- `data/presentation.json`: editorial project summaries, grouping, colors, artwork and provenance.
- `scripts/build.mjs`: HTML generator with escaping, safe URL checks and asset validation.
- `scripts/sync.mjs`: explicit upstream refresh; never runs during deployment.
- `scripts/build.test.mjs`: native Node tests.
- `vercel.json`: static hosting build configuration and security headers.

## Add or edit projects

1. Edit `data/profile.json` → `featuredProjects`. Each project needs a unique `id`, `name`, `repo` (HTTPS), `tags` array, `category`, and a `tagline` or `description`.
2. Optionally add a matching entry to `data/presentation.json` → `projects` with `title`, `summary`, `group` (`Native apps` or `AI & tooling`), `image`, `imageKind`, `tone`, and upstream `source` URL. Add artwork under `public/assets/`. Without an image the build renders a simple arrow illustration.
3. Run `npm test && npm run build`. Project numbering and filter counts update automatically. If adding a new category, add its filter button in the template.

`npm run sync` replaces the local profile snapshot with https://raw.githubusercontent.com/nodaysidle/nodaysidle/main/data/profile.json. Review changes before rebuilding. It preserves presentation overrides, but intentional local edits to the profile will be replaced.

## Content provenance

Source: https://github.com/nodaysidle/nodaysidle — `data/profile.json` and generated README. The five featured repositories were inspected for README content, release links and images. Asset URLs are recorded per project in `data/presentation.json`. Editorial summaries condense repository descriptions and are explicitly marked in that file's `_comment`; there are no fabricated testimonials, demo URLs, availability claims or stale repository counters. Project images are app icons/social previews, not alleged UI screenshots. The About section uses the owner's actual statement and operating principles.

Fonts: Manrope and DM Mono, self-hosted, SIL Open Font License; license files are included alongside assets. WebP files are resized derivatives of the original repository images, which are retained. Check upstream licensing before repurposing artwork outside this personal portfolio.

## Deploy to Vercel

```sh
npx vercel login
npx vercel --prod
```

Select framework **Other**, build command `npm run build`, output directory `dist` (already configured). For continuous deployment, push this source to your own GitHub repository and import it into Vercel. No environment variables required. Never commit `.vercel/` or credentials.

The production deployment URL and verification results are recorded in `docs/deployment.md` after deployment.

## Accessibility & motion

Semantic landmarks, skip link, labeled sections, visible keyboard focus, image alternatives, native filter buttons with pressed states and a live result announcement. All content and links remain usable without JavaScript. Reduced-motion preference disables the SVG animation and scroll reveals. Animations pause when the hero is offscreen or the tab is hidden. Images load lazily and typography uses `clamp()` and mobile breakpoints.

## Documentation consulted

- https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
- https://vercel.com/docs/cli/deploy
