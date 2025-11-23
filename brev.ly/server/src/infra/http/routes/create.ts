import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createLink } from '@/app/functions/create-link'
import { createLinkSchema } from '@/app/schema/create-links'
import { isLeft } from '@/infra/shared/either'
import { DuplicateLink } from '@/app/errors/duplicated-link'

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
}