import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { Either, makeLeft, makeRight } from '@/infra/shared/either'
import { LinkNotFound } from '../errors/link-not-found'
import type { LinkResponse } from '../schema/link-schemas'

interface GetLinkByShortUrlInput {
  shortUrl: string
}

export async function getLinkByShortUrl(
  input: GetLinkByShortUrlInput
): Promise<Either<LinkNotFound, LinkResponse>> {
  const { shortUrl } = input

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (!link) {
    return makeLeft(new LinkNotFound())
  }

  return makeRight(link)
}

