import { z } from 'zod'

const shortUrlRegex = /^[a-zA-Z0-9_-]+$/

export const createLinkSchema = z.object({
  originalUrl: z.string().url('URL inválida'),
  shortUrl: z
    .string()
    .min(1, 'Campo obrigatório')
    .regex(shortUrlRegex, 'Use apenas letras, números, - e _'),
})

export const linkSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortUrl: z.string(),
  accessCount: z.number(),
  createdAt: z.string(),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>
export type Link = z.infer<typeof linkSchema>

