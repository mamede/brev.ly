import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import type { LinkResponse } from '../schema/link-schemas'

export async function listLinks(): Promise<LinkResponse[]> {
  const links = await db.select().from(schema.links)
  return links
}

