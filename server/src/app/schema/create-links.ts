import { z } from 'zod'

const shortUrlRegex = /^[a-zA-Z0-9_-]+$/

export const createLinkSchema = z.object({
  originalUrl: z.string().url('URL original inválida'),
  shortUrl: z
    .string()
    .min(1, 'URL encurtada não pode ser vazia')
    .regex(shortUrlRegex, 'URL encurtada mal formatada. Use apenas letras, números, - e _'),
})

export const linkSchema = z.object({
  id: z.string().uuid(),
  originalUrl: z.string().url(),
  shortUrl: z.string(),
  accessCount: z.number().int().min(0),
  createdAt: z.date(),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>
export type Link = z.infer<typeof linkSchema>