import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { env } from '@/env'
import {
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

const server = fastify()

server.register(fastifyCors, { origin: '*' })

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brevly Server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.listen({ port: env.PORT || 3333, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server running on port ${env.PORT || 3333}`)
})