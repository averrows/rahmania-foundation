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

const blog = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        publishDate: z.date(),
        author: z.string(),
        image: image().optional(),
        excerpt: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false)
    })
});

export const collections = {
    programs: program,
    blog: blog,
};