import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    type: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.string().default('en'),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
  }),
});

export const collections = { posts };
