import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each Markdown file in src/content/work becomes a card on the home page
// and a case-study sub-page at /work/<file-name>.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      period: z.string(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

const side = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/side' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      period: z.string(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      order: z.number(),
      url: z.string().url().optional(),
    }),
});

export const collections = { work, side };
