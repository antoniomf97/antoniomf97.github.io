/*
 * Content collections: this file tells Astro where your data lives (the YAML
 * files in src/data/) and what fields each entry must have. If you mistype a
 * field or forget a required one, `npm run dev` shows a clear error.
 */
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

/** Reads a YAML list and gives each item an id (its position), so you don't have to. */
const yamlList = (path: string) =>
  file(path, {
    parser: (text) =>
      ((parse(text) ?? []) as Record<string, unknown>[]).map((item, index) => ({
        id: String(item.id ?? index),
        ...item,
      })),
  });

const profile = defineCollection({
  loader: file('src/data/profile.yaml', {
    parser: (text) => [{ id: 'profile', ...parse(text) }],
  }),
  schema: z.object({
    name: z.string(),
    // Other spellings of your name in author lists, so they get highlighted too.
    aliases: z.array(z.string()).default([]),
    position: z.string(),
    affiliation: z.string(),
    location: z.string().optional(),
    // Path to a photo in the public/ folder, e.g. /images/profile.jpg
    photo: z.string().optional(),
    interests: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          icon: z.enum(['email', 'scholar', 'github', 'orcid', 'linkedin', 'link']),
        }),
      )
      .default([]),
  }),
});

const news = defineCollection({
  loader: yamlList('src/data/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    url: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: yamlList('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum(['journal', 'conference', 'preprint', 'thesis', 'other']),
    // Show this paper under "Selected publications" on the home page.
    selected: z.boolean().default(false),
    // Optional image for the home page, e.g. /images/papers/my-paper.png
    teaser: z.string().optional(),
    links: z
      .object({
        pdf: z.string().optional(),
        bibtex: z.string().optional(),
        doi: z.string().optional(),
        code: z.string().optional(),
        slides: z.string().optional(),
        video: z.string().optional(),
        website: z.string().optional(),
      })
      .default({}),
  }),
});

export const collections = { profile, news, publications };
