"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = publicRoutes;
const index_1 = require("../index");
const CACHE_TTL = 300; // 5 minutes
async function getCached(key, fetcher) {
    const cached = await index_1.redis.get(key);
    if (cached) {
        return JSON.parse(cached);
    }
    const data = await fetcher();
    await index_1.redis.setex(key, CACHE_TTL, JSON.stringify(data));
    return data;
}
async function publicRoutes(fastify) {
    // Site settings
    fastify.get('/site', async () => {
        return getCached('public:site', async () => {
            const settings = await index_1.prisma.siteSettings.findFirst({
                orderBy: { updatedAt: 'desc' },
            });
            return { success: true, data: settings };
        });
    });
    // Weekly programs
    fastify.get('/programs/weekly', async () => {
        return getCached('public:programs:weekly', async () => {
            const programs = await index_1.prisma.program.findMany({
                where: { isActive: true },
                orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
            });
            return { success: true, data: programs };
        });
    });
    // Programs by day
    fastify.get('/programs', async (request) => {
        const { day } = request.query;
        const cacheKey = day ? `public:programs:day:${day}` : 'public:programs:all';
        return getCached(cacheKey, async () => {
            const programs = await index_1.prisma.program.findMany({
                where: {
                    isActive: true,
                    ...(day && { day }),
                },
                orderBy: [{ orderIndex: 'asc' }],
            });
            return { success: true, data: programs };
        });
    });
    // Upcoming events
    fastify.get('/events/upcoming', async () => {
        return getCached('public:events:upcoming', async () => {
            const events = await index_1.prisma.event.findMany({
                where: {
                    isUpcoming: true,
                    date: { gte: new Date() },
                },
                orderBy: { date: 'asc' },
                take: 10,
            });
            return { success: true, data: events };
        });
    });
    // Events with pagination
    fastify.get('/events', async (request) => {
        const cursor = request.query.cursor;
        const limit = parseInt(request.query.limit || '20');
        const events = await index_1.prisma.event.findMany({
            take: limit + 1,
            ...(cursor && {
                cursor: { id: cursor },
                skip: 1,
            }),
            orderBy: { date: 'desc' },
        });
        const hasMore = events.length > limit;
        const data = hasMore ? events.slice(0, -1) : events;
        const nextCursor = hasMore ? data[data.length - 1].id : null;
        return {
            success: true,
            data,
            pagination: {
                nextCursor,
                hasMore,
            },
        };
    });
    // Live stream
    fastify.get('/live', async () => {
        return getCached('public:live', async () => {
            const live = await index_1.prisma.liveStream.findFirst({
                orderBy: { updatedAt: 'desc' },
            });
            return { success: true, data: live };
        });
    });
    // Sermon source
    fastify.get('/sermons/source', async () => {
        return getCached('public:sermons:source', async () => {
            const source = await index_1.prisma.sermonSource.findFirst({
                orderBy: { updatedAt: 'desc' },
            });
            return { success: true, data: source };
        });
    });
    // Sermons
    fastify.get('/sermons', async () => {
        return getCached('public:sermons', async () => {
            const sermons = await index_1.prisma.sermon.findMany({
                orderBy: { date: 'desc' },
            });
            return { success: true, data: sermons };
        });
    });
    // Leaders
    fastify.get('/leaders', async () => {
        return getCached('public:leaders', async () => {
            const leaders = await index_1.prisma.leader.findMany({
                orderBy: { orderIndex: 'asc' },
            });
            return { success: true, data: leaders };
        });
    });
}
