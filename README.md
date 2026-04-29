# ginhac.dev

`ginhac.dev` is a personal academic website built with `Astro`, `MDX`, and `Tailwind CSS`.
It presents the profile, research, teaching, and publications of Dominique Ginhac, Professor in Computer Science, with a focus on artificial intelligence, computer vision, digital imaging, and embedded vision systems.

## What the project does

The site serves two main purposes:

- A homepage that introduces Dominique Ginhac, highlights selected content, and summarizes current research and teaching directions.
- A content section at `/posts` that publishes research notes, publications, teaching resources, and technical articles.

Content is authored in `MDX` and organized as a single `posts` collection with structured metadata such as:

- `title`
- `description`
- `date`
- `type`
- `tags`
- `readingTime`
- `featured`
- `featuredImage`

## Editorial features

The project includes a small editorial system on top of Astro:

- Static generation of post pages from `src/content/posts`
- Featured content selection for the homepage
- Typed content metadata with Astro Content Collections
- Automatic table of contents for longer articles
- Related post suggestions based on tags, content type, and recency
- Reusable MDX components for figures, bibliographies, key points, and resource lists

## Tech stack

- `Astro`
- `TypeScript`
- `MDX`
- `Tailwind CSS`

## Project structure

```text
/
├── public/
├── src/
│   ├── assets/            # Images and visual assets
│   ├── components/        # Reusable UI and MDX components
│   ├── config/            # Site, navigation, and homepage content
│   ├── content/
│   │   └── posts/         # MDX content entries
│   ├── layouts/           # Base and post layouts
│   ├── pages/             # Homepage and route definitions
│   └── utils/             # Content-related helpers
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build the site for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Content authoring

Posts are stored in `src/content/posts` as `.md` or `.mdx` files.
Each entry is validated through the schema defined in `src/content.config.ts`.

To feature a post on the homepage, set:

```md
featured: true
```

To attach a cover image, place the asset in the corresponding folder under `src/assets/posts/<slug>/` and reference it in frontmatter.
