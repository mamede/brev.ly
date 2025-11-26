import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { Either, makeLeft, makeRight } from '@/infra/shared/either'

import { CreateLinkInput, createLinkSchema } from '@/app/schema/create-links';
import { DuplicateLink } from '../errors/duplicated-link';

export async function createLink(
  payload: CreateLinkInput,
): Promise<Either<DuplicateLink, { id: string }>> {
  const { originalUrl, shortUrl } =
    createLinkSchema.parse(payload);
  const [existingLink] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))


  if (existingLink) {
    return makeLeft(new DuplicateLink())
  }

  const [link] = await db
    .insert(schema.links)
    .values({
      originalUrl,
      shortUrl,
    })
    .returning()

  return makeRight({ id: link.id })
}