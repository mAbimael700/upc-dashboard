import { z } from "zod"

export const PostFormSchema = z.object({
  title: z.string().min(2).max(100).min(2),
  excerpt: z.string().min(2).optional(),
  content: z.string().min(2).optional(),
  coverUrl: z.string().url().optional(),
  categoryIds: z.array(z.number()).optional(),
  status:z.string().optional(),
})

export type PostFormSchemaType = z.infer<typeof PostFormSchema>