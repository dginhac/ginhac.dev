# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build locally
npx astro check   # TypeScript/Astro type checking
```

No test runner or linter is configured.

## Architecture

Astro 6 static site with Tailwind CSS v4 (via `@tailwindcss/vite`). TypeScript strict mode. No UI framework (React/Vue/etc.) — pure `.astro` components only.

### Configuration-driven content

All site content lives in `src/config/`:
- `site.ts` — name, title, description
- `navigation.ts` — main nav links
- `links.ts` — external profile URLs and email
- `home.ts` — all homepage section content (hero, featured items, bio)

Update these files to change content; no component edits needed for copy changes.

### Component structure

- `layouts/BaseLayout.astro` — root HTML shell, imports `src/styles/global.css` (Tailwind entry), wraps Header + Footer + slot
- `components/Header.astro` — fixed top bar, transparent over hero → white on scroll; site name + nav + FR language link
- `components/Footer.astro` — three-column footer with nav, external links, obfuscated email
- `components/HomeHero.astro` — two-column hero (text + portrait with geometric frame)
- `components/FeaturedSection.astro` — section wrapper; renders FeaturedCard grid
- `components/FeaturedCard.astro` — single card with type label (RESEARCH/ARTICLE/TEACHING/PUBLICATION)
- `components/BioSection.astro` — profile text + Scholar/CV links + "Currently" subsection

### Pages

- `pages/index.astro` — homepage; composes HomeHero + FeaturedSection + BioSection

### Styling

Tailwind v4 with utility classes directly in `.astro` files. No `tailwind.config.*` — v4 uses CSS-first config. Global entry point: `src/styles/global.css`, which imports Tailwind and declares all design tokens via `@theme`. Max-width container: `max-w-5xl mx-auto px-6`.

#### Color system

All tokens are defined in `src/styles/global.css` under `@theme` and generate Tailwind utilities automatically (e.g. `--color-accent` → `bg-accent`, `text-accent`).

| Token | Value | Tailwind class | Usage |
|---|---|---|---|
| `--color-hero-bg` | `#FBFCFF` | `bg-hero-bg` | Hero section background (light, blue-tinted) |
| `--color-hero-text` | `#0F172A` | `text-hero-text` | Hero title (deep navy) |
| `--color-hero-muted` | `#6B7280` | `text-hero-muted` | Hero eyebrow / subtitle |
| `--color-site-bg` | `#FBFCFF` | `bg-site-bg` | Body / bio section background |
| `--color-section-alt` | `#F3F6FA` | `bg-section-alt` | Featured section, card label pills |
| `--color-footer-bg` | `#EEF3F8` | `bg-footer-bg` | Footer (one step deeper than section-alt) |
| `--color-text-primary` | `#1F2937` | `text-text-primary` | Headings, strong labels |
| `--color-text-secondary` | `#6B7280` | `text-text-secondary` | Body text, nav, meta |
| `--color-accent` | `#2563EB` | `text-accent`, `bg-accent` | Links, CTA, focus rings, bullets — interactions only |
| `--color-accent-soft` | `#7BAFD4` | `bg-accent-soft` | Decorative only (portrait corner dot) — never interactive |
| `--color-border` | `#E5EAF0` | `border-border` | All borders and dividers (blue-gray tint) |

#### Type label colors (inline `style=` only — no Tailwind utilities)

| Label | Color |
|---|---|
| RESEARCH | `#2563EB` (`--color-label-research`) |
| PUBLICATION | `#7C3AED` (`--color-label-publication`) |
| TEACHING | `#059669` (`--color-label-teaching`) |
| ARTICLE | `#374151` (`--color-label-article`) |

#### Typography

Two fonts, defined as `@theme` tokens in `global.css` and installed as self-hosted variable fonts via npm (no CDN):

| Token | Package | Tailwind class | Usage |
|---|---|---|---|
| `--font-heading` | `@fontsource-variable/manrope` | `font-heading` | All headings (`h1`–`h3`), eyebrow labels use Inter |
| `--font-sans` | `@fontsource-variable/inter` | `font-sans` | Everything else — body, nav, buttons, labels, footer |

`font-sans` is set on `body` in global.css and inherited globally. `font-heading` is applied explicitly on heading elements only.

Typographic scale in use:

| Element | Font | Size | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| Hero eyebrow | Inter | 14px / `text-sm` | 500 | `0.08em` | — |
| Hero `h1` | Manrope | 36→48px | light (base) / bold (`<strong>`) | `-0.03em` | `1.07` |
| Hero subtitle | Inter | 16→18px | 400 | — | `1.65` |
| Section `h2` | Manrope | 24→30px | 700 | `-0.02em` | `1.2` |
| Card `h3` | Manrope | 16px | 600 | `-0.015em` | `1.25` |
| Card body / labels | Inter | 14px / 11px | 400 / 600 | — / `0.08em` | `1.65` / `1` |
| Bio body | Inter | 16px | 400 | — | `1.7` |
| "Currently" label | Inter | 13px | 500 | `0.08em` | — |
| Nav / links | Inter | 14px | 500 | — | — |
| Footer | Inter | 14px | 400 | — | `1.5` |

#### Design rules to preserve

- **Accent** (`#2563EB`) is for interactions only — never as a section background.
- **Accent-soft** (`#7BAFD4`) is decorative only — never used for links or interactive states.
- **Hero**: light (`#FBFCFF`), not dark. Separated from the Featured section by `border-b border-border`.
- **No colored card or section backgrounds** — cards are always white; sections step through `site-bg` → `section-alt` → `footer-bg`.
- **Shadows**: `rgba(15,23,42,0.06)` only, on hover, never static.
- **Header**: `position: fixed`, transparent over the light hero with dark text (no color flip needed on scroll — just adds white background + border). Transition controlled via JS `.is-scrolled` class and CSS custom properties (`--hdr-*`) to avoid Tailwind purge issues.

### Internationalisation

English is the default at `/`. The header includes a placeholder `FR` link to `/fr/` for a future French version. Full i18n is not yet implemented.

### Assets

Portrait: `public/images/portrait.jpg` (not committed — add the actual image here). Favicon: `public/favicon.svg`.
