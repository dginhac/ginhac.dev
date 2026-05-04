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

# Project context

This is an academic personal website built with Astro.

The site should remain:
- clean,
- minimal,
- text-focused,
- responsive,
- accessible,
- easy to maintain.

Use Astro-native components by default. Do not add client-side JavaScript unless necessary.


## Architecture

Astro 6 static site with Tailwind CSS v4 (via `@tailwindcss/vite`) and MDX (via `@astrojs/mdx`). TypeScript strict mode. No UI framework (React/Vue/etc.) — pure `.astro` components only.

### Configuration-driven content

All site content lives in `src/config/`:
- `content/site.ts` — name, title, description
- `content/navigation.ts` — main nav links (note: `navigation.ts` and `links.ts` stay at `src/config/` root)
- `links.ts` — external profile URLs and email
- `navigation.ts` — nav link definitions
- `content/home.ts` — all homepage section content (meta, hero, featured items, bio)
- `content/posts.ts` — posts index page content (meta, header, filters, empty state)
- `content/research.ts` — `/research` page content (meta, intro, projects list, contact)
- `content/teaching.ts` — `/teaching` page content (meta, intro, courses list, contact)
- `styles/categoryStyles.ts` — shared type/category color palette (badge + pill variants) for TypeBadge and Pill

Update these files to change content; no component edits needed for copy changes.

## Documentation policy

Use Context7 when the task involves framework-specific behavior, APIs, configuration, or version-sensitive features.

For Astro, use Context7 before implementing or modifying:
- routing;
- layouts;
- content collections;
- Markdown/MDX support;
- image optimization;
- integrations;
- i18n;
- RSS or sitemap generation;
- build/deployment configuration.

For Tailwind CSS, use Context7 before:
- installing or configuring Tailwind;
- modifying the Tailwind configuration;
- changing theme tokens or plugins;
- debugging build or configuration issues;
- using advanced or version-specific Tailwind features.

For simple content edits, copy changes, or visual adjustments using existing project patterns, Context7 is not required.

### Posts (MDX)

Posts are written in MDX and live in `src/content/posts/`. The content collection is declared in `src/content.config.ts` using Astro 6's Content Layer API (`glob` loader).

**To add a new post:** create a folder `src/content/posts/<slug>/` containing `index.mdx`. The folder is automatically routed to `/posts/<slug>/` via `src/pages/posts/[slug].astro`. No other file needs to change. Place all post-specific images and an optional `references.bib` alongside `index.mdx` in the same folder.

**Post frontmatter schema:**
```yaml
title: string               # required
description: string         # required
date: YYYY-MM-DD            # required
updated: YYYY-MM-DD         # optional — last updated date; used for archive sort order and shown as "Updated" in metadata when different from date
type: string                # optional — e.g. "insight", "tutorial", "teaching", "publication", or "howto"
tags: [string]              # optional, default []
lang: string                # optional, default "en"
featured: boolean           # optional, default false — shows post in FeaturedSection on homepage
draft: boolean              # optional, default false — excludes post from all listings
readingTime: string         # optional — e.g. "8 min read"
eyebrow: string             # optional — overrides the eyebrow label in the post header (defaults to type label)
featuredImage: string       # optional — filename relative to the post folder (e.g. "featured.webp")
featuredImageAlt: string    # optional — alt text for the featured image
showFeaturedImage: boolean  # optional — whether to display the image inside the post body
relatedPosts: [string]      # optional — list of post slugs to show in the related posts section
bibliography: string        # optional — filename of a .bib file in the post folder (e.g. "references.bib"); reserved for future rendering
resources:                  # optional — list of resources rendered automatically at end of post
  - label: string           #   required — clickable link text
    href: string            #   required — internal or external URL
    description: string     #   optional — one-line description shown below the label
```

**Available post components** (import from `../../../components/post/` within MDX):
- `Figure` — responsive image with caption; supports `align` (left/right/center/full) and `width` (third/half/two-thirds/full); left/right variants float on desktop, full-width on mobile
- `KeyPoint` — callout box with a titled highlight; soft left-border style
- `ResourceList` — editorial card list of links; driven automatically from `resources` frontmatter — do not use manually in MDX
- `Bibliography` — numbered academic citation list
- `RelatedPosts` — related posts section (driven by `relatedPosts` frontmatter)
- `TableOfContents` — in-post table of contents

### Component structure

- `layouts/BaseLayout.astro` — root HTML shell, imports `src/styles/global.css` (Tailwind entry), wraps Header + Footer + slot
- `layouts/PostLayout.astro` — post page shell; editorial header card (title, description, date, tags, type label) + prose body column; used by `pages/posts/[slug].astro`
- `components/layout/Header.astro` — fixed top bar, transparent over hero → white on scroll; site name + nav + FR language link
- `components/layout/Footer.astro` — three-column footer with nav, external links, obfuscated email
- `components/ui/TypeBadge.astro` — shared type badge with per-category tinted pill; reads color classes from `categoryStyles.ts`; used in FeaturedCard, PostLayout, and posts/index
- `components/ui/Pill.astro` — pill variant of TypeBadge (larger, rounded-full); uses `categoryStyles.ts`; used in /research and /teaching header sections
- `components/ui/Link.astro` — anchor with configurable arrow; `arrow` prop: `"auto"` (default — `→` internal, `↗` external, none for mailto), `"forward"` (force `→` after), `"back"` (force `←` before), `"none"` (no arrow); external http/https links get `target="_blank" rel="noopener noreferrer"` automatically
- `components/home/HomeHero.astro` — two-column hero (text + portrait with geometric frame)
- `components/home/FeaturedSection.astro` — section wrapper; renders eyebrow + FeaturedCard grid
- `components/home/BioSection.astro` — eyebrow + profile text + Scholar/CV links + "Currently" subsection; bio text rendered via `renderMarkdown`
- `components/cards/FeaturedCard.astro` — single card with type badge; card hover triggers "Read more →" opacity + underline
- `components/cards/AcademicCard.astro` — card used in /research and /teaching grids; shows title, metadata line (period/role or level/institution/volume), description, tags, and a "View →" link label
- `components/post/Figure.astro` — post figure with float/align support
- `components/post/KeyPoint.astro` — post callout block
- `components/post/ResourceList.astro` — post resource links
- `components/post/Bibliography.astro` — post reference list
- `components/post/RelatedPosts.astro` — related posts section at the bottom of a post
- `components/post/TableOfContents.astro` — in-post table of contents

### Utilities

- `src/utils/markdown.ts` — `renderMarkdown(source)` wraps `marked` with a custom renderer that auto-detects external vs. internal links and adds the appropriate class (`link-external` opens in new tab; `link-internal` stays in tab). Use this for any config prose that contains Markdown links.
- `src/utils/posts/slugUtils.ts` — `getPostSlug(entryId)` normalises a content entry id to a bare URL slug; supports both `slug/index.mdx` and `slug.mdx` layouts.
- `src/utils/posts/relatedPosts.ts` — `getRelatedPosts(current, all)` returns up to 3 related posts; uses manual `relatedPosts` frontmatter if set, otherwise scores by shared tags, type, and recency.
- `src/utils/posts/dateUtils.ts` — `formatPostDate(date)` formats a date for display; `getEffectivePostDate(post)` returns `updated` if set, else `date`; `hasUpdatedDate(post)` returns true when `updated` differs from `date`.

### Pages

- `pages/index.astro` — homepage; composes HomeHero + FeaturedSection + BioSection
- `pages/posts/index.astro` — posts listing; editorial header with type filter nav (client-side JS), driven by `postsContent` from `src/config/content/posts.ts`
- `pages/posts/[slug].astro` — dynamic post route; renders any entry from `src/content/posts/` using `PostLayout`
- `pages/research/index.astro` — research synthesis page; intro, topic pills, current/previous project grid using `AcademicCard`, contact line; driven by `researchConfig` from `src/config/content/research.ts`
- `pages/teaching/index.astro` — teaching synthesis page; same structure as /research; driven by `teachingConfig` from `src/config/content/teaching.ts`

### Styling

Tailwind v4 with utility classes directly in `.astro` files. No `tailwind.config.*` — v4 uses CSS-first config. Global entry point: `src/styles/global.css`, which imports Tailwind and declares all design tokens via `@theme`. Max-width container: `max-w-5xl mx-auto px-6`.

Post prose styles (headings, paragraphs, lists, links, code, etc.) are declared as `.post-body` CSS selectors at the bottom of `global.css` — do not use `@tailwindcss/typography`.

**Content links** use the `.link` utility class (defined in `global.css`): accent color, no underline at rest, underline + opacity-75 on hover. Apply `.link` to any non-nav/footer anchor. The classes `.link-external` and `.link-internal` share the same styles and are emitted automatically by `renderMarkdown`. Do not replicate hover styles inline; always use `.link` or let the markdown renderer handle it.

**Prose text in config files** (`src/config/content/home.ts` etc.) should use Markdown syntax for links, not raw HTML. Pass the string through `renderMarkdown` before `set:html`.

#### Color system

All tokens are defined in `src/styles/global.css` under `@theme` and generate Tailwind utilities automatically (e.g. `--color-accent` → `bg-accent`, `text-accent`).

| Token | Value | Tailwind class | Usage |
|---|---|---|---|
| `--color-hero-bg` | `#FBFCFF` | `bg-hero-bg` | Hero section background (light, blue-tinted) |
| `--color-hero-text` | `#0F172A` | `text-hero-text` | Hero title (deep navy) |
| `--color-hero-muted` | `#6B7280` | `text-hero-muted` | Hero subtitle |
| `--color-site-bg` | `#FBFCFF` | `bg-site-bg` | Body / bio section background |
| `--color-section-alt` | `#F3F6FA` | `bg-section-alt` | Featured section, card label pills, post header card |
| `--color-footer-bg` | `#EEF3F8` | `bg-footer-bg` | Footer (one step deeper than section-alt) |
| `--color-text-primary` | `#1F2937` | `text-text-primary` | Headings, strong labels |
| `--color-text-secondary` | `#6B7280` | `text-text-secondary` | Body text, nav, meta |
| `--color-accent` | `#2563EB` | `text-accent`, `bg-accent` | Links, CTA, focus rings, bullets — interactions only |
| `--color-accent-soft` | `#7BAFD4` | `bg-accent-soft` | Decorative only (portrait corner dot) — never interactive |
| `--color-border` | `#E5EAF0` | `border-border` | All borders and dividers (blue-gray tint) |

#### Type label colors

The shared color palette lives in `src/config/styles/categoryStyles.ts` and is consumed by both `TypeBadge.astro` (badge variant) and `Pill.astro` (pill variant). Colors are expressed as Tailwind utility class strings — do not replicate or override this logic in components.

| Category | Tailwind classes (badge) |
|---|---|
| RESEARCH | `border-blue-200 bg-blue-50 text-blue-600` |
| PUBLICATION | `border-violet-200 bg-violet-50 text-violet-600` |
| TEACHING | `border-emerald-200 bg-emerald-50 text-emerald-600` |
| INSIGHT | `border-orange-200 bg-orange-50 text-orange-600` |
| HOWTO | `border-amber-200 bg-amber-50 text-amber-700` |
| DEFAULT (fallback) | `border-slate-200 bg-slate-50 text-slate-600` |

Pill classes use the same hue with slightly darker text (e.g. `text-blue-700` instead of `text-blue-600`).

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
| Section eyebrow | Inter | 12px / `text-xs` | 500 | `0.08em` | — |
| Hero `h1` | Manrope | 36→48px | light (base) / bold (`<strong>`) | `-0.03em` | `1.07` |
| Hero subtitle | Inter | 16→18px | 400 | — | `1.65` |
| Section `h2` | Manrope | 24→30px | 700 | `-0.02em` | `1.2` |
| Card `h3` | Manrope | 16px | 600 | `-0.015em` | `1.25` |
| Card body / labels | Inter | 14px / 12px | 400 / 600 | — / `0.06em` | `1.65` / `1` |
| Bio body | Inter | 16px | 400 | — | `1.7` |
| "Currently" label | Inter | 13px | 500 | `0.08em` | — |
| Nav / links | Inter | 14px | 500 | — | — |
| Footer | Inter | 14px | 400 | — | `1.5` |
| Post `h1` | Manrope | 30→44px | 700 | `-0.03em` | `1.08` |
| Post `h2` | Manrope | 22px | 700 | `-0.02em` | `1.25` |
| Post `h3` | Manrope | 18px | 600 | `-0.01em` | `1.35` |
| Post body | Inter | 16px | 400 | — | `1.75` |

#### Design rules to preserve

- **Accent** (`#2563EB`) is for interactions only — never as a section background.
- **Accent-soft** (`#7BAFD4`) is decorative only — never used for links or interactive states.
- **Hero**: light (`#FBFCFF`), not dark. Separated from the Featured section by `border-b border-border`.
- **No colored card or section backgrounds** — cards are always white; sections step through `site-bg` → `section-alt` → `footer-bg`.
- **Shadows**: `rgba(15,23,42,0.06)` only, on hover, never static.
- **Header**: `position: fixed`, transparent over the light hero with dark text (no color flip needed on scroll — just adds white background + border). Transition controlled via JS `.is-scrolled` class and CSS custom properties (`--hdr-*`) to avoid Tailwind purge issues.
- **Post prose**: styled via `.post-body` selectors in `global.css`, not via `@tailwindcss/typography`. Post headings use `--color-hero-text` (`#0F172A`), not `--color-text-primary`.

### Internationalisation

English is the default at `/`. The header includes a placeholder `FR` link to `/fr/` for a future French version. Full i18n is not yet implemented.

### Assets

Portrait: `src/assets/home/hero-portrait-v2.jpg`  
Favicon: `public/favicon.svg`.  
Brand SVG: `src/assets/brand/dg-primary.svg`  
Post images: co-located with the post in `src/content/posts/<slug>/` — place images alongside `index.mdx` and reference them with relative paths (e.g. `import img from "./featured.webp"`) or via the `featuredImage` frontmatter field.
