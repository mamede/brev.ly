import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { Either, makeLeft, makeRight } from '@/infra/shared/either'
import { LinkNotFound } from '../errors/link-not-found'

interface IncrementLinkAccessInput {
  id: string
}

export async function incrementLinkAccess(
  input: IncrementLinkAccessInput
): Promise<Either<LinkNotFound, { success: true }>> {
  const { id } = input

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.id, id))

  if (!link) {
    return makeLeft(new LinkNotFound())
  }

  await db
    .update(schema.links)
    .set({ accessCount: link.accessCount + 1 })
    .where(eq(schema.links.id, id))

  return makeRight({ success: true })
}

