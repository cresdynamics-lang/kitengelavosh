import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { verify } from 'argon2'

const prisma = new PrismaClient()

declare module 'fastify' {
  interface FastifyRequest {
    admin?: {
      id: string
      username: string
      role: string
      isSuperAdmin: boolean
    }
  }
}

export async function authenticateAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    // In production, verify JWT token here
    // For now, we'll use a simple token check
    const admin = await prisma.admin.findFirst({
      where: { id: token }, // Simplified - use JWT in production
    })

    if (!admin) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    request.admin = {
      id: admin.id,
      username: admin.username,
      role: admin.role,
      isSuperAdmin: admin.isSuperAdmin,
    }
  } catch (error) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }
}

export async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate('authenticate', authenticateAdmin)
}
