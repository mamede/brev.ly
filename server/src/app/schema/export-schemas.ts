import { z } from 'zod'

export const exportCsvResponseSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
})

export type ExportCsvResponse = z.infer<typeof exportCsvResponseSchema>

