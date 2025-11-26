import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { Either, makeLeft, makeRight } from '@/infra/shared/either'
import { LinkNotFound } from '../errors/link-not-found'

interface DeleteLinkInput {
  id: string
}

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotFound, { success: true }>> {
  const { id } = input

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.id, id))

  if (!link) {
    return makeLeft(new LinkNotFound())
  }

  await db.delete(schema.links).where(eq(schema.links.id, id))

  return makeRight({ success: true })
}

