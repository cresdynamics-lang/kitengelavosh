import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'
import { publicRoutes } from './routes/public'
import { adminAuthRoutes } from './routes/admin-auth'
import { adminRoutes } from './routes/admin'
import { authPlugin } from './plugins/auth'

// Initialize Prisma Client
export const prisma = new PrismaClient()

// Initialize Redis Client
export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
})

// Register plugins
async function build() {
  // Security
  await fastify.register(helmet)
  
  // CORS
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })

  // Rate limiting
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  // Auth plugin
  await fastify.register(authPlugin)

  // Routes (admin login first so it has no auth hook)
  await fastify.register(publicRoutes, { prefix: '/api/public' })
  await fastify.register(adminAuthRoutes, { prefix: '/api/admin' })
  await fastify.register(adminRoutes, { prefix: '/api/admin' })

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  return fastify
}

// Start server
async function start() {
  try {
    const server = await build()
    
    const port = parseInt(process.env.PORT || '3001')
    const host = process.env.HOST || '0.0.0.0'

    await server.listen({ port, host })
    console.log(`🚀 API server running on http://${host}:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await fastify.close()
  await prisma.$disconnect()
  redis.disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await fastify.close()
  await prisma.$disconnect()
  redis.disconnect()
  process.exit(0)
})

// Start the server
start()
