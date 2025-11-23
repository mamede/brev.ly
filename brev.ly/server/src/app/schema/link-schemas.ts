import { z } from 'zod'

export const linkResponseSchema = z.object({
  id: z.string(),
  originalUrl: z.string().url(),
  shortUrl: z.string(),
  accessCount: z.number().int().min(0),
  createdAt: z.date(),
})

export const linkIdParamSchema = z.object({
  id: z.string(),
})

export const shortUrlParamSchema = z.object({
  shortUrl: z.string(),
})

export type LinkResponse = z.infer<typeof linkResponseSchema>

