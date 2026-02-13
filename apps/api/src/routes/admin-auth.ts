import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../index'
import { loginSchema } from '@vosh/shared'

/**
 * Admin auth routes (no authentication required).
 * Registered separately so the auth hook never runs for login.
 */
export async function adminAuthRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = loginSchema.parse(request.body || {})
      const admin = await prisma.admin.findFirst({
        where: {
          OR: [{ username: body.username }, { email: body.username }],
        },
      })

      if (!admin) {
        return reply.code(401).send({ success: false, error: 'Invalid credentials' })
      }

      const { verify } = await import('argon2')
      const isValid = await verify(admin.passwordHash, body.password)
      if (!isValid) {
        return reply.code(401).send({ success: false, error: 'Invalid credentials' })
      }

      return reply.send({
        success: true,
        data: {
          token: admin.id,
          admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            isSuperAdmin: admin.isSuperAdmin,
          },
        },
      })
    } catch (err: any) {
      fastify.log.error(err, 'Login error')
      if (err.name === 'ZodError') {
        return reply.code(400).send({ success: false, error: 'Username and password are required.' })
      }
      if (err.code === 'P2021' || err.message?.includes('does not exist')) {
        return reply.code(503).send({ success: false, error: 'Database not ready.' })
      }
      return reply.code(500).send({ success: false, error: 'Login failed. Please try again.' })
    }
  })
}
