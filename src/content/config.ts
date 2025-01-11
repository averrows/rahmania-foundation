// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const program = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        location: z.string(),
        images: z.array(z.object({
            src: image(),
            alt: z.string()
        }))
    })
});

// Type for use in components
export const collections = {
    programs: program,
};