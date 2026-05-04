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

## Project context

Academic personal website built with Astro. Keep it: clean, minimal, text-focused, responsive, accessible, easy to maintain. Astro-native components only — no client-side JS unless necessary, no React/Vue/etc.

## Architecture

Astro 6 · Tailwind CSS v4 (via `@tailwindcss/vite`) · MDX (via `@astrojs/mdx`) · TypeScript strict. No `tailwind.config.*` — CSS-first config via `@theme` in `src/styles/global.css`.

### Configuration-driven content

All site content lives in `src/config/`:

| File | Purpose |
|---|---|
| `content/site.ts` | Site name, title, description, logo |
| `content/home.ts` | Homepage: hero, featured section, bio |
| `content/posts.ts` | Posts index: meta, filters, empty state |
| `content/research.ts` | `/research` page content |
| `content/teaching.ts` | `/teaching` page content |
| `styles/categoryStyles.ts` | Shared type/category color palette (badge + pill variants) |
| `navigation.ts` | Main nav links |
| `links.ts` | External profile URLs and email |

Update these files for content changes; no component edits needed.

**`content/home.ts` shape:**
- `hero.links[]` — CTA buttons: `{ label, href, variant, external?, download? }` typed as `ButtonLinkItem`
- `bio.links[]` — action links same shape (`external: true` for Scholar, `download: true` for CV)
- `featured.items[]` — typed as `FeaturedItem[]`

**Logo glob:** `Header.astro` loads the logo via `import.meta.glob("../../assets/**/*.svg")`. The key must match `site.logo.src` exactly (currently `"../../assets/brand/dg-primary.svg"`, relative to the component file at `src/components/layout/`).

## Documentation policy

Use Context7 before implementing: routing, layouts, content collections, MDX, image optimization, integrations, i18n, RSS/sitemap, build config, Tailwind configuration.

Not required for: simple content edits, copy changes, visual tweaks using existing patterns.

### Posts (MDX)

Posts live in `src/content/posts/<slug>/index.mdx` — auto-routed to `/posts/<slug>/`.

**Frontmatter schema:**
```yaml
title: string               # required
description: string         # required
date: YYYY-MM-DD            # required
updated: YYYY-MM-DD         # optional — overrides sort date; shown as "Updated" when different from date
type: string                # optional — insight | tutorial | teaching | publication | howto
tags: [string]              # optional, default []
lang: string                # optional, default "en"
featured: boolean           # optional — shows in FeaturedSection on homepage
draft: boolean              # optional — excludes from all listings
readingTime: string         # optional — e.g. "8 min read"
eyebrow: string             # optional — overrides post header eyebrow (defaults to type)
featuredImage: string       # optional — filename relative to post folder
featuredImageAlt: string    # optional
showFeaturedImage: boolean  # optional
relatedPosts: [string]      # optional — list of post slugs
bibliography: string        # optional — .bib filename in post folder
resources:
  - label: string           # required
    href: string            # required
    description: string     # optional
```

**Available MDX components** (import from `../../../components/post/`):
`Figure`, `KeyPoint`, `ResourceList` (auto from frontmatter — don't use manually), `Bibliography`, `RelatedPosts`, `TableOfContents`.

### Component structure

**Layouts**
- `layouts/BaseLayout.astro` — root HTML shell; imports global.css; wraps Header + Footer
- `layouts/PostLayout.astro` — post shell: editorial header card + prose column

**Layout components** (`components/layout/`)
- `Header.astro` — fixed top bar; transparent → white on scroll; logo + nav + FR link; scroll/menu state via JS `.is-scrolled` / `.menu-open` and CSS custom props (`--hdr-*`)
- `Footer.astro` — three-column footer with nav, external links, obfuscated email

**UI primitives** (`components/ui/`)
- `Link.astro` — text link with configurable arrow (`arrow?: "auto" | "forward" | "back" | "none"`, default `"auto"`). Auto: `→` internal, `↗` external, none for mailto. Back arrow renders before slot, others after. Styling via `baseClasses` on `<a>` + inner `<span class="inline-flex items-center">` wrapping a `<span class="group-hover:underline">` around `<slot />` — this pattern keeps `text-align` utilities working on the caller while underline triggers only on text. External http/https get `target="_blank" rel="noopener noreferrer"` automatically.
- `ButtonLink.astro` — CTA/button-style link. Props: `variant?: "primary" | "secondary" | "ghost"` (default `"secondary"`), `size?: "sm" | "md"` (default `"md"`), `external?`, `download?`. Uses design tokens: primary = `bg-accent text-white`, secondary = `border border-border bg-white text-text-primary hover:bg-section-alt`, ghost = `text-text-secondary hover:bg-section-alt`. Pill-shaped (`rounded-full`). External and mailto safety attrs handled same as Link.
- `TypeBadge.astro` — type badge (small, rectangular); reads from `categoryStyles.ts`
- `Pill.astro` — pill variant of TypeBadge (larger, `rounded-full`); used in /research and /teaching headers

**Home components** (`components/home/`)
- `HomeHero.astro` — two-column hero (text + portrait); renders `hero.links` via `ButtonLink`
- `FeaturedSection.astro` — eyebrow + FeaturedCard grid
- `BioSection.astro` — profile text (via `renderMarkdown`) + `bio.links` rendered via `ButtonLink` + "Currently" items

**Cards** (`components/cards/`)
- `FeaturedCard.astro` — homepage featured card with TypeBadge; hover shows "Read more →"
- `AcademicCard.astro` — card for /research and /teaching grids; shows title, metadata, description, tags

**Post components** (`components/post/`): `Figure`, `KeyPoint`, `ResourceList`, `Bibliography`, `RelatedPosts`, `TableOfContents`

### Utilities

- `src/utils/markdown.ts` — `renderMarkdown(source)`: wraps `marked`, auto-detects external/internal links, emits `.link-external` / `.link-internal` classes. Use for any config prose with Markdown links.
- `src/utils/posts/slugUtils.ts` — `getPostSlug(entryId)`: normalises content entry id to bare slug
- `src/utils/posts/relatedPosts.ts` — `getRelatedPosts(current, all)`: up to 3 related posts by manual list, then tags/type/recency score
- `src/utils/posts/dateUtils.ts` — `formatPostDate`, `getEffectivePostDate` (returns `updated ?? date`), `hasUpdatedDate`

### Pages

- `pages/index.astro` — homepage
- `pages/posts/index.astro` — posts listing with type filter (client-side JS)
- `pages/posts/[slug].astro` — dynamic post route using `PostLayout`
- `pages/research/index.astro` — research synthesis page driven by `researchConfig`
- `pages/teaching/index.astro` — teaching synthesis page driven by `teachingConfig`

### Styling

Max-width container: `max-w-5xl mx-auto px-6`. Post prose: `.post-body` selectors in `global.css` (no `@tailwindcss/typography`).

**Link styling:** Use `Link.astro` for text links, `ButtonLink.astro` for CTA/button links. Do not use raw `<a>` tags for content links. Nav links, footer links, and card wrapper links remain raw `<a>` tags.

**Prose links in config** (`renderMarkdown` output): `.link-external` (opens in new tab) and `.link-internal` share the same hover style defined in `global.css`.

#### Color tokens (`@theme` in global.css)

| Token | Value | Usage |
|---|---|---|
| `--color-accent` | `#2563EB` | Links, CTAs, focus rings, bullets — interactions only |
| `--color-accent-soft` | `#7BAFD4` | Decorative only — never interactive |
| `--color-hero-bg` / `--color-site-bg` | `#FBFCFF` | Hero and body background |
| `--color-section-alt` | `#F3F6FA` | Featured section, card hover bg, secondary button hover |
| `--color-footer-bg` | `#EEF3F8` | Footer |
| `--color-text-primary` | `#1F2937` | Headings, strong labels |
| `--color-text-secondary` | `#6B7280` | Body text, nav, meta |
| `--color-border` | `#E5EAF0` | All borders and dividers |

#### Type label colors (`src/config/styles/categoryStyles.ts`)

| Category | Badge classes |
|---|---|
| RESEARCH | `border-blue-200 bg-blue-50 text-blue-600` |
| PUBLICATION | `border-violet-200 bg-violet-50 text-violet-600` |
| TEACHING | `border-emerald-200 bg-emerald-50 text-emerald-600` |
| INSIGHT | `border-orange-200 bg-orange-50 text-orange-600` |
| HOWTO | `border-amber-200 bg-amber-50 text-amber-700` |
| DEFAULT | `border-slate-200 bg-slate-50 text-slate-600` |

Pill classes use same hue with slightly darker text. Do not replicate this logic outside `TypeBadge.astro` and `Pill.astro`.

#### Design rules

- Accent is for interactions only — never a section background.
- Accent-soft is decorative only — never interactive.
- Cards always white; sections step `site-bg` → `section-alt` → `footer-bg`. No colored section backgrounds.
- Shadows: `rgba(15,23,42,0.06)` on hover only, never static.
- Post headings use `--color-hero-text` (`#0F172A`), not `--color-text-primary`.
- Fonts: `font-heading` (Manrope variable) for `h1`–`h3`; `font-sans` (Inter variable) for everything else.

### Assets

- Portrait: `src/assets/home/hero-portrait-v2.jpg`
- Brand SVG: `src/assets/brand/dg-primary.svg`
- Favicon: `public/favicon.svg`
- Post images: co-located in `src/content/posts/<slug>/`, referenced by relative path or `featuredImage` frontmatter

### Internationalisation

English default at `/`. Header has placeholder `FR` link to `/fr/` — full i18n not yet implemented.
