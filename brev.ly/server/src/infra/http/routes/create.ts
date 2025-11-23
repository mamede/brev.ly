import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createLink } from '@/app/functions/create-link'
import { deleteLink } from '@/app/functions/delete-link'
import { getLinkByShortUrl } from '@/app/functions/get-link-by-short-url'
import { listLinks } from '@/app/functions/list-links'
import { incrementLinkAccess } from '@/app/functions/increment-link-access'
import { exportLinksCsv } from '@/app/functions/export-links-csv'
import { createLinkSchema } from '@/app/schema/create-links'
import {
  linkResponseSchema,
  linkIdParamSchema,
  shortUrlParamSchema,
} from '@/app/schema/link-schemas'
import { exportCsvResponseSchema } from '@/app/schema/export-schemas'
import { isLeft } from '@/infra/shared/either'
import { DuplicateLink } from '@/app/errors/duplicated-link'
import { LinkNotFound } from '@/app/errors/link-not-found'

export async function linksRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>()

  server.post('/links', {
    schema: {
      tags: ['Links'],
      body: createLinkSchema,
      response: {
        201: z.object({ id: z.string() }),
        400: z.object({ message: z.string() }),
        409: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      const result = await createLink(request.body)

      if (isLeft(result)) {
        if (result.left instanceof DuplicateLink) {
          return reply.status(409).send({
            message: 'URL encurtada já existente'
          })
        }
      }

      return reply.status(201).send(result.right)

    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return reply.status(400).send({
          message: 'URL encurtada mal formatada'
        })
      }
      throw error
    }
  })

  server.get('/links', {
    schema: {
      tags: ['Links'],
      response: {
        200: z.array(linkResponseSchema),
      },
    },
  }, async (request, reply) => {
    const links = await listLinks()
    return reply.status(200).send(links)
  })

  server.get('/links/:shortUrl', {
    schema: {
      tags: ['Links'],
      params: shortUrlParamSchema,
      response: {
        200: linkResponseSchema,
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const result = await getLinkByShortUrl(request.params)

    if (isLeft(result)) {
      if (result.left instanceof LinkNotFound) {
        return reply.status(404).send({
          message: 'Link não encontrado'
        })
      }
    }

    return reply.status(200).send(result.right)
  })

  server.patch('/links/:id/access', {
    schema: {
      tags: ['Links'],
      params: linkIdParamSchema,
      response: {
        204: z.null(),
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const result = await incrementLinkAccess(request.params)

    if (isLeft(result)) {
      if (result.left instanceof LinkNotFound) {
        return reply.status(404).send({
          message: 'Link não encontrado'
        })
      }
    }

    return reply.status(204).send()
  })

  server.delete('/links/:id', {
    schema: {
      tags: ['Links'],
      params: linkIdParamSchema,
      response: {
        204: z.null(),
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const result = await deleteLink(request.params)

    if (isLeft(result)) {
      if (result.left instanceof LinkNotFound) {
        return reply.status(404).send({
          message: 'Link não encontrado'
        })
      }
    }

    return reply.status(204).send()
  })

  server.post('/links/export', {
    schema: {
      tags: ['Links'],
      response: {
        200: exportCsvResponseSchema,
      },
    },
  }, async (request, reply) => {
    const result = await exportLinksCsv()
    return reply.status(200).send(result)
  })
}