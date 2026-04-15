# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Portfolio site for Majiri OK — Data Analyst, MB, Canada.  
**Brand:** Maj OK | Telling Data Stories  
**Deployment:** Netlify (static, no build step)

## Development

No build step, no package manager, no linter, no test suite. To preview:

```
open maj-ok-portfolio/index.html   # or double-click in file explorer
```

All changes are live on refresh.

## Stack constraints

- Vanilla HTML, CSS, JS only — no frameworks, no bundlers, no npm
- Always mobile-first; test at 375px minimum
- `pages/about.html` uses `../` relative paths for CSS/JS assets

## Architecture

### Pages
- `index.html` — single-page entry; all primary sections live here as `<section id="...">` anchors
- `pages/about.html` — separate page (currently an empty shell)

### CSS
- `css/reset.css` — minimal baseline reset, loaded first on every page
- `css/style.css` — all styles (~1100 lines), organized by section with `/* ── SECTION ── */` comments

### JS
- `js/main.js` — single file, loaded with `defer`

**Functions and responsibilities:**
- `applyTheme(isDark)` — sets/removes `data-theme="dark"` on `<html>`, syncs both toggle buttons and their label text
- `getVisible()` — returns carousel visible-card count (1 / 2 / 3) based on viewport width
- `getCardWidth()` — calculates per-card pixel width from wrapper `offsetWidth` minus gaps
- `updateCarousel()` — applies `translateX` offset, updates dot indicators, disables prev/next buttons at bounds

Everything else (hamburger menu, smooth scroll, nav scroll-shadow) is inline event-listener code.

### Sections status
All nav links are implemented as `<section id="...">` anchors in `index.html`:
- `#home` — hero with CTA buttons
- `#projects` — featured carousel (4 cards) + text/case-study grid (4 cards)
- `#about` — stats block + bio + services list
- `#contact` — contact details + Formspree form

Not yet built:
- `pages/about.html` — shell only, no body content
- `blog/`, `services/` — directories exist but are empty

Built as separate pages:
- `pages/blog.html` — "Coming Soon" page; fully self-contained (see nav architecture note below)

### Theme system
- Default is **light mode** (no `data-theme` attribute on `<html>`)
- Dark mode activated by `data-theme="dark"` on `<html>`, persisted in `localStorage` key `"theme"`
- CSS pattern: base rules are light-mode; dark overrides use `[data-theme="dark"] .selector { ... }`
- Toggle buttons: `#themeToggle` (desktop) and `#themeToggleMobile` (mobile) — always kept in sync via `applyTheme()`

### Design tokens (CSS custom properties on `:root`)
| Token | Value | Usage |
|---|---|---|
| `--color-gold` | `#C8A97E` | Accent — links, borders, CTAs |
| `--color-gold-light` | `rgba(200,169,126,0.12)` | Subtle gold tint (label backgrounds) |
| `--color-cream` | `#F7F5F0` | Light mode background |
| `--color-white` | `#FFFFFF` | Nav background in light mode |
| `--color-black` | `#0E0E0E` | Dark mode background |
| `--color-text-dark` | `#1A1A1A` | Body text in light mode |
| `--color-text-light` | `#F5F0E8` | Body text in dark mode |
| `--color-muted` | `#8A8A8A` | Secondary/caption text |
| `--color-charcoal` | `#1C1A17` | Dark mode nav / footer |
| `--color-border` | `#E8E4DC` | Borders and dividers in light mode |
| `--max-width` | `1100px` | `.container` max width |
| `--radius` | `12px` | Card/button border radius |
| `--transition` | `0.2s ease` | Standard transition duration |

### CSS conventions
- **Naming:** BEM-like — block (`nav`), element (`nav__link`), modifier (`btn--primary`, `nav--shadow`)
- **Layout:** `.container` centres content at `--max-width: 1100px` with `padding: 0 24px`
- **Responsive breakpoints:** `@media (max-width: 767px)` is the main mobile cutoff in `style.css`; projects grid uses `900px` (2-col) and `600px` (1-col)
- **State class:** `.is-open` toggled on `.nav__mobile-menu` by JS (index.html only)

### Nav architecture: two separate implementations
`index.html` and `pages/*.html` have **different nav systems** — do not conflate them.

| | `index.html` | `pages/blog.html` |
|---|---|---|
| Classes | BEM: `.nav`, `.nav__links`, `.nav__hamburger`, `.nav__mobile-menu` | Non-BEM: `.navbar`, `.nav-links`, `.hamburger` |
| Open state | `.is-open` on `.nav__mobile-menu` | `.open` on `#navLinks` |
| JS | `main.js` (external, deferred) | Inline `<script>` at bottom of file |
| Theme toggle | Two synced buttons via `applyTheme()` | Single `#themeToggle`, inline logic |

When editing nav styles or hamburger behaviour in `pages/blog.html`, changes go in its inline `<style>` block — not in `css/style.css`.

### Projects section structure
Two groups, each introduced by a `.section-header` (`<h2>` + `<p>`):

1. **Featured carousel** (`.carousel-wrapper` → `.carousel-track` → `.carousel-card`) — Tableau dashboard cards with prev/next buttons and dot indicators. Visible count: 1 at ≤600px, 2 at ≤900px, 3 above. `current` index resets to 0 on window resize.
2. **Text/case-study cards** (`.text-grid`) — use `.text-card` modifier; omit `.project-image` entirely, add a left gold border instead.

Project screenshot images live in `images/projects/`. Cards use `onerror` on `<img>` to add a `no-image` class to the parent `.project-image` for graceful degradation.

## Design decisions (intentional — do not change)

- **Hero background:** Always dark, regardless of theme. Sections below use cream (`--color-cream`) in light mode.
- **Footer background:** Dark charcoal (`--color-charcoal`) in both light and dark mode — intentional, not a missing override.
- **Contact form:** Formspree ID `maqanopg` is already connected (`action="https://formspree.io/f/maqanopg"`). Do not replace or regenerate.
- **Dashboard screenshots:** All 3 project dashboard screenshots are in `images/projects/`. Do not move them.

## Progress

- `index.html` — fully built, mobile-responsive
- `pages/blog.html` — "Coming Soon" placeholder, mobile-responsive
- `pages/about.html` — shell only, no body content
