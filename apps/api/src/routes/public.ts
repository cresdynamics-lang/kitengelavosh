import { FastifyInstance } from 'fastify'
import { prisma, redis } from '../index'

const CACHE_TTL = 300 // 5 minutes

async function getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key)
  if (cached) {
    return JSON.parse(cached)
  }
  const data = await fetcher()
  await redis.setex(key, CACHE_TTL, JSON.stringify(data))
  return data
}

export async function publicRoutes(fastify: FastifyInstance) {
  // Site settings
  fastify.get('/site', async () => {
    return getCached('public:site', async () => {
      const settings = await prisma.siteSettings.findFirst({
        orderBy: { updatedAt: 'desc' },
      })
      return { success: true, data: settings }
    })
  })

  // Weekly programs
  fastify.get('/programs/weekly', async () => {
    return getCached('public:programs:weekly', async () => {
      const programs = await prisma.program.findMany({
        where: { isActive: true },
        orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
      })
      return { success: true, data: programs }
    })
  })

  // Programs by day
  fastify.get<{ Querystring: { day?: string } }>('/programs', async (request) => {
    const { day } = request.query
    const cacheKey = day ? `public:programs:day:${day}` : 'public:programs:all'
    
    return getCached(cacheKey, async () => {
      const programs = await prisma.program.findMany({
        where: {
          isActive: true,
          ...(day && { day }),
        },
        orderBy: [{ orderIndex: 'asc' }],
      })
      return { success: true, data: programs }
    })
  })

  // Upcoming events
  fastify.get('/events/upcoming', async () => {
    return getCached('public:events:upcoming', async () => {
      const events = await prisma.event.findMany({
        where: {
          isUpcoming: true,
          date: { gte: new Date() },
        },
        orderBy: { date: 'asc' },
        take: 10,
      })
      return { success: true, data: events }
    })
  })

  // Events with pagination
  fastify.get<{ Querystring: { cursor?: string; limit?: string } }>('/events', async (request) => {
    const cursor = request.query.cursor
    const limit = parseInt(request.query.limit || '20')
    
    const events = await prisma.event.findMany({
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      orderBy: { date: 'desc' },
    })

    const hasMore = events.length > limit
    const data = hasMore ? events.slice(0, -1) : events
    const nextCursor = hasMore ? data[data.length - 1].id : null

    return {
      success: true,
      data,
      pagination: {
        nextCursor,
        hasMore,
      },
    }
  })

  // Live stream
  fastify.get('/live', async () => {
    return getCached('public:live', async () => {
      const live = await prisma.liveStream.findFirst({
        orderBy: { updatedAt: 'desc' },
      })
      return { success: true, data: live }
    })
  })

  // Sermon source
  fastify.get('/sermons/source', async () => {
    return getCached('public:sermons:source', async () => {
      const source = await prisma.sermonSource.findFirst({
        orderBy: { updatedAt: 'desc' },
      })
      return { success: true, data: source }
    })
  })

  // Sermons
  fastify.get('/sermons', async () => {
    return getCached('public:sermons', async () => {
      const sermons = await prisma.sermon.findMany({
        orderBy: { date: 'desc' },
      })
      return { success: true, data: sermons }
    })
  })

  // Leaders
  fastify.get('/leaders', async () => {
    return getCached('public:leaders', async () => {
      const leaders = await prisma.leader.findMany({
        orderBy: { orderIndex: 'asc' },
      })
      return { success: true, data: leaders }
    })
  })

  // Update Links (public list for footer etc.)
  fastify.get('/links', async () => {
    return getCached('public:links', async () => {
      const links = await prisma.updateLink.findMany({
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' },
      })
      return { success: true, data: links }
    })
  })

  // Contact form → email via Resend
  fastify.post('/contact', async (request) => {
    const body = request.body as { name?: string; email?: string; message?: string }
    const name = (body.name || '').toString().slice(0, 200)
    const email = (body.email || '').toString().slice(0, 200)
    const message = (body.message || '').toString().slice(0, 5000)

    if (!message) {
      return { success: false, error: 'Message is required' }
    }

    try {
      const { sendContactEmail } = await import('../utils/email')
      await sendContactEmail({ name, email, message })
      return { success: true }
    } catch (error) {
      console.error('Error sending contact email:', error)
      return { success: false, error: 'Failed to send message' }
    }
  })
}
