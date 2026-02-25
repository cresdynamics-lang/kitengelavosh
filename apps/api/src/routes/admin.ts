import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma, redis } from '../index'
import { hash } from 'argon2'
import {
  createProgramSchema,
  updateProgramSchema,
  createEventSchema,
  updateEventSchema,
  updateLiveStreamSchema,
  updateSermonSourceSchema,
  createSermonSchema,
  updateSermonSchema,
  createLeaderSchema,
  updateLeaderSchema,
  createAdminSchema,
} from '@vosh/shared'

async function invalidateCache(pattern: string) {
  const keys = await redis.keys(pattern)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
}

export async function adminRoutes(fastify: FastifyInstance) {
  // All routes here require authentication (login is in admin-auth.ts)
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    await (fastify as any).authenticate(request, reply)
  })

  // Site Settings
  fastify.get('/site', async () => {
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { updatedAt: 'desc' },
    })
    return { success: true, data: settings }
  })

  fastify.put('/site', async (request: FastifyRequest) => {
    const body = request.body as any
    const adminId = request.admin!.id

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: { ...body, updatedAt: new Date() },
      create: { ...body, id: 'default' },
    })

    await invalidateCache('public:site*')
    return { success: true, data: settings }
  })

  // Programs CRUD
  fastify.get('/programs', async () => {
    const programs = await prisma.program.findMany({
      orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
    })
    return { success: true, data: programs }
  })

  fastify.post('/programs', async (request: FastifyRequest) => {
    const body = createProgramSchema.parse(request.body)
    const adminId = request.admin!.id

    const program = await prisma.program.create({
      data: { ...body, updatedBy: adminId },
    })

    await invalidateCache('public:programs*')
    return { success: true, data: program }
  })

  fastify.put<{ Params: { id: string } }>('/programs/:id', async (request) => {
    const body = updateProgramSchema.parse(request.body)
    const adminId = request.admin!.id

    const program = await prisma.program.update({
      where: { id: request.params.id },
      data: { ...body, updatedBy: adminId },
    })

    await invalidateCache('public:programs*')
    return { success: true, data: program }
  })

  fastify.delete<{ Params: { id: string } }>('/programs/:id', async (request) => {
    await prisma.program.delete({
      where: { id: request.params.id },
    })

    await invalidateCache('public:programs*')
    return { success: true, message: 'Program deleted' }
  })

  // Events CRUD (similar pattern)
  fastify.get('/events', async () => {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    })
    return { success: true, data: events }
  })

  fastify.post('/events', async (request: FastifyRequest) => {
    const body = createEventSchema.parse(request.body)
    const adminId = request.admin!.id

    const event = await prisma.event.create({
      data: {
        ...body,
        date: new Date(body.date),
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:events*')
    return { success: true, data: event }
  })

  fastify.put<{ Params: { id: string } }>('/events/:id', async (request) => {
    const body = updateEventSchema.parse(request.body)
    const adminId = request.admin!.id

    const event = await prisma.event.update({
      where: { id: request.params.id },
      data: {
        ...body,
        ...(body.date && { date: new Date(body.date) }),
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:events*')
    return { success: true, data: event }
  })

  fastify.delete<{ Params: { id: string } }>('/events/:id', async (request) => {
    await prisma.event.delete({
      where: { id: request.params.id },
    })

    await invalidateCache('public:events*')
    return { success: true, message: 'Event deleted' }
  })

  // LiveStream
  fastify.get('/live', async () => {
    const live = await prisma.liveStream.findFirst({
      orderBy: { updatedAt: 'desc' },
    })
    return { success: true, data: live }
  })

  fastify.put('/live', async (request: FastifyRequest) => {
    const body = updateLiveStreamSchema.parse(request.body)
    const adminId = request.admin!.id

    const live = await prisma.liveStream.upsert({
      where: { id: 'default' },
      update: {
        ...body,
        ...(body.scheduleTime && { scheduleTime: new Date(body.scheduleTime) }),
        updatedBy: adminId,
      },
      create: {
        id: 'default',
        ...body,
        ...(body.scheduleTime && { scheduleTime: new Date(body.scheduleTime) }),
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:live*')
    return { success: true, data: live }
  })

  // SermonSource
  fastify.get('/sermons/source', async () => {
    const source = await prisma.sermonSource.findFirst({
      orderBy: { updatedAt: 'desc' },
    })
    return { success: true, data: source }
  })

  fastify.put('/sermons/source', async (request: FastifyRequest) => {
    const body = updateSermonSourceSchema.parse(request.body)
    const adminId = request.admin!.id

    const source = await prisma.sermonSource.upsert({
      where: { id: 'default' },
      update: { ...body, updatedBy: adminId },
      create: { id: 'default', ...body, updatedBy: adminId },
    })

    await invalidateCache('public:sermons*')
    return { success: true, data: source }
  })

  // Sermons CRUD
  fastify.get('/sermons', async () => {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: 'desc' },
    })
    return { success: true, data: sermons }
  })

  fastify.post('/sermons', async (request: FastifyRequest) => {
    const body = createSermonSchema.parse(request.body)
    const adminId = request.admin!.id

    const sermon = await prisma.sermon.create({
      data: {
        ...body,
        date: new Date(body.date),
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:sermons*')
    return { success: true, data: sermon }
  })

  fastify.put<{ Params: { id: string } }>('/sermons/:id', async (request) => {
    const body = updateSermonSchema.parse(request.body)
    const adminId = request.admin!.id

    const sermon = await prisma.sermon.update({
      where: { id: request.params.id },
      data: {
        ...body,
        ...(body.date && { date: new Date(body.date) }),
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:sermons*')
    return { success: true, data: sermon }
  })

  fastify.delete<{ Params: { id: string } }>('/sermons/:id', async (request) => {
    await prisma.sermon.delete({
      where: { id: request.params.id },
    })

    await invalidateCache('public:sermons*')
    return { success: true, message: 'Sermon deleted' }
  })

  // Leaders CRUD
  fastify.get('/leaders', async () => {
    const leaders = await prisma.leader.findMany({
      orderBy: { orderIndex: 'asc' },
    })
    return { success: true, data: leaders }
  })

  fastify.post('/leaders', async (request: FastifyRequest) => {
    const body = createLeaderSchema.parse(request.body)
    const adminId = request.admin!.id

    const leader = await prisma.leader.create({
      data: { ...body, updatedBy: adminId },
    })

    await invalidateCache('public:leaders*')
    return { success: true, data: leader }
  })

  fastify.put<{ Params: { id: string } }>('/leaders/:id', async (request) => {
    const body = updateLeaderSchema.parse(request.body)
    const adminId = request.admin!.id

    const leader = await prisma.leader.update({
      where: { id: request.params.id },
      data: { ...body, updatedBy: adminId },
    })

    await invalidateCache('public:leaders*')
    return { success: true, data: leader }
  })

  fastify.delete<{ Params: { id: string } }>('/leaders/:id', async (request) => {
    await prisma.leader.delete({
      where: { id: request.params.id },
    })

    await invalidateCache('public:leaders*')
    return { success: true, message: 'Leader deleted' }
  })

  // Update Links CRUD
  fastify.get('/update-links', async () => {
    const links = await prisma.updateLink.findMany({
      orderBy: { orderIndex: 'asc' },
    })
    return { success: true, data: links }
  })

  fastify.post('/update-links', async (request: FastifyRequest) => {
    const body = request.body as { title: string; url: string; description?: string; category?: string; is_active?: boolean; display_order?: number }
    const adminId = request.admin!.id

    const link = await prisma.updateLink.create({
      data: {
        title: body.title,
        url: body.url,
        description: body.description ?? '',
        category: body.category ?? 'General',
        isActive: body.is_active ?? true,
        orderIndex: body.display_order ?? 0,
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:links*')
    return { success: true, data: link }
  })

  fastify.put<{ Params: { id: string } }>('/update-links/:id', async (request) => {
    const body = request.body as { title?: string; url?: string; description?: string; category?: string; is_active?: boolean; display_order?: number }
    const adminId = request.admin!.id

    const link = await prisma.updateLink.update({
      where: { id: request.params.id },
      data: {
        ...(body.title != null && { title: body.title }),
        ...(body.url != null && { url: body.url }),
        ...(body.description != null && { description: body.description }),
        ...(body.category != null && { category: body.category }),
        ...(body.is_active != null && { isActive: body.is_active }),
        ...(body.display_order != null && { orderIndex: body.display_order }),
        updatedBy: adminId,
      },
    })

    await invalidateCache('public:links*')
    return { success: true, data: link }
  })

  fastify.delete<{ Params: { id: string } }>('/update-links/:id', async (request) => {
    await prisma.updateLink.delete({
      where: { id: request.params.id },
    })

    await invalidateCache('public:links*')
    return { success: true, message: 'Link deleted' }
  })

  // Admins CRUD (super admin only)
  fastify.get('/admins', async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.admin!.isSuperAdmin) {
      return reply.code(403).send({ error: 'Forbidden' })
    }

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        isSuperAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return { success: true, data: admins }
  })

  fastify.post('/admins', async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.admin!.isSuperAdmin) {
      return reply.code(403).send({ error: 'Forbidden' })
    }

    const body = createAdminSchema.parse(request.body)
    const passwordHash = await hash(body.password)

    const admin = await prisma.admin.create({
      data: {
        ...body,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        isSuperAdmin: true,
      },
    })

    return { success: true, data: admin }
  })
}
