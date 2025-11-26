import { stringify } from 'csv-stringify/sync'
import { uuidv7 } from 'uuidv7'
import { listLinks } from './list-links'
import { R2Client } from '@/infra/storage/r2-client'

interface ExportLinksCsvOutput {
  url: string
  filename: string
}

export async function exportLinksCsv(): Promise<ExportLinksCsvOutput> {
  const links = await listLinks()

  const filename = `links-export-${uuidv7()}.csv`

  const csv = stringify(
    links.map((link) => ({
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
      accessCount: link.accessCount,
      createdAt: link.createdAt.toISOString(),
    })),
    {
      header: true,
      columns: {
        originalUrl: 'URL Original',
        shortUrl: 'URL Encurtada',
        accessCount: 'Contagem de Acessos',
        createdAt: 'Data de Criação',
      },
    }
  )

  const r2Client = new R2Client()
  await r2Client.upload(filename, csv, 'text/csv')

  const url = r2Client.getPublicUrl(filename)

  return {
    url,
    filename,
  }
}

