import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
    // Normalise id to the bare slug regardless of file layout:
    // "slug/index.mdx" and "slug.mdx" both produce id = "slug"
    generateId: ({ entry }) =>
      entry.replace(/\/index\.(md|mdx)$/, '').replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.string().default('en'),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    showFeaturedImage: z.boolean().optional(),
    relatedPosts: z.array(z.string()).optional(),
    eyebrow: z.string().optional(),
    bibliography: z.string().optional(),
    resources: z.array(z.object({
      label: z.string(),
      href: z.string(),
      description: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { posts };
