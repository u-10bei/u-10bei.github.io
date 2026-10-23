import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // File names keep the Jekyll convention: YYYY-MM-DD-<slug>.md(x)
  // Use .mdx to embed charts: <Chart name="..." /> (see scripts/build_charts.py)
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    category: z.string(),
    background: z.string().optional(),
    // Shows the data license in the footer
    license: z.literal('cc-by-3.0').optional(),
  }),
});

export const collections = { posts };
