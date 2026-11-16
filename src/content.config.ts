import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const episodes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/episodes' }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string(),
    publishedAt: z.coerce.date(),
    guest: z.string().optional(),
    category: z.string().optional(),
    summary: z.string(),
    points: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { episodes };
