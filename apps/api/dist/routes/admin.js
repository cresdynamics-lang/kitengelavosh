"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = adminRoutes;
const index_1 = require("../index");
const argon2_1 = require("argon2");
const shared_1 = require("@vosh/shared");
async function invalidateCache(pattern) {
    const keys = await index_1.redis.keys(pattern);
    if (keys.length > 0) {
        await index_1.redis.del(...keys);
    }
}
async function adminRoutes(fastify) {
    // All routes here require authentication (login is in admin-auth.ts)
    fastify.addHook('onRequest', async (request, reply) => {
        await fastify.authenticate(request, reply);
    });
    // Site Settings
    fastify.get('/site', async () => {
        const settings = await index_1.prisma.siteSettings.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
        return { success: true, data: settings };
    });
    fastify.put('/site', async (request) => {
        const body = request.body;
        const adminId = request.admin.id;
        const settings = await index_1.prisma.siteSettings.upsert({
            where: { id: 'default' },
            update: { ...body, updatedAt: new Date() },
            create: { ...body, id: 'default' },
        });
        await invalidateCache('public:site*');
        return { success: true, data: settings };
    });
    // Programs CRUD
    fastify.get('/programs', async () => {
        const programs = await index_1.prisma.program.findMany({
            orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
        });
        return { success: true, data: programs };
    });
    fastify.post('/programs', async (request) => {
        const body = shared_1.createProgramSchema.parse(request.body);
        const adminId = request.admin.id;
        const program = await index_1.prisma.program.create({
            data: { ...body, updatedBy: adminId },
        });
        await invalidateCache('public:programs*');
        return { success: true, data: program };
    });
    fastify.put('/programs/:id', async (request) => {
        const body = shared_1.updateProgramSchema.parse(request.body);
        const adminId = request.admin.id;
        const program = await index_1.prisma.program.update({
            where: { id: request.params.id },
            data: { ...body, updatedBy: adminId },
        });
        await invalidateCache('public:programs*');
        return { success: true, data: program };
    });
    fastify.delete('/programs/:id', async (request) => {
        await index_1.prisma.program.delete({
            where: { id: request.params.id },
        });
        await invalidateCache('public:programs*');
        return { success: true, message: 'Program deleted' };
    });
    // Events CRUD (similar pattern)
    fastify.get('/events', async () => {
        const events = await index_1.prisma.event.findMany({
            orderBy: { date: 'desc' },
        });
        return { success: true, data: events };
    });
    fastify.post('/events', async (request) => {
        const body = shared_1.createEventSchema.parse(request.body);
        const adminId = request.admin.id;
        const event = await index_1.prisma.event.create({
            data: {
                ...body,
                date: new Date(body.date),
                updatedBy: adminId,
            },
        });
        await invalidateCache('public:events*');
        return { success: true, data: event };
    });
    fastify.put('/events/:id', async (request) => {
        const body = shared_1.updateEventSchema.parse(request.body);
        const adminId = request.admin.id;
        const event = await index_1.prisma.event.update({
            where: { id: request.params.id },
            data: {
                ...body,
                ...(body.date && { date: new Date(body.date) }),
                updatedBy: adminId,
            },
        });
        await invalidateCache('public:events*');
        return { success: true, data: event };
    });
    fastify.delete('/events/:id', async (request) => {
        await index_1.prisma.event.delete({
            where: { id: request.params.id },
        });
        await invalidateCache('public:events*');
        return { success: true, message: 'Event deleted' };
    });
    // LiveStream
    fastify.get('/live', async () => {
        const live = await index_1.prisma.liveStream.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
        return { success: true, data: live };
    });
    fastify.put('/live', async (request) => {
        const body = shared_1.updateLiveStreamSchema.parse(request.body);
        const adminId = request.admin.id;
        const live = await index_1.prisma.liveStream.upsert({
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
        });
        await invalidateCache('public:live*');
        return { success: true, data: live };
    });
    // SermonSource
    fastify.get('/sermons/source', async () => {
        const source = await index_1.prisma.sermonSource.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
        return { success: true, data: source };
    });
    fastify.put('/sermons/source', async (request) => {
        const body = shared_1.updateSermonSourceSchema.parse(request.body);
        const adminId = request.admin.id;
        const source = await index_1.prisma.sermonSource.upsert({
            where: { id: 'default' },
            update: { ...body, updatedBy: adminId },
            create: { id: 'default', ...body, updatedBy: adminId },
        });
        await invalidateCache('public:sermons*');
        return { success: true, data: source };
    });
    // Sermons CRUD
    fastify.get('/sermons', async () => {
        const sermons = await index_1.prisma.sermon.findMany({
            orderBy: { date: 'desc' },
        });
        return { success: true, data: sermons };
    });
    fastify.post('/sermons', async (request) => {
        const body = shared_1.createSermonSchema.parse(request.body);
        const adminId = request.admin.id;
        const sermon = await index_1.prisma.sermon.create({
            data: {
                ...body,
                date: new Date(body.date),
                updatedBy: adminId,
            },
        });
        await invalidateCache('public:sermons*');
        return { success: true, data: sermon };
    });
    fastify.put('/sermons/:id', async (request) => {
        const body = shared_1.updateSermonSchema.parse(request.body);
        const adminId = request.admin.id;
        const sermon = await index_1.prisma.sermon.update({
            where: { id: request.params.id },
            data: {
                ...body,
                ...(body.date && { date: new Date(body.date) }),
                updatedBy: adminId,
            },
        });
        await invalidateCache('public:sermons*');
        return { success: true, data: sermon };
    });
    fastify.delete('/sermons/:id', async (request) => {
        await index_1.prisma.sermon.delete({
            where: { id: request.params.id },
        });
        await invalidateCache('public:sermons*');
        return { success: true, message: 'Sermon deleted' };
    });
    // Leaders CRUD
    fastify.get('/leaders', async () => {
        const leaders = await index_1.prisma.leader.findMany({
            orderBy: { orderIndex: 'asc' },
        });
        return { success: true, data: leaders };
    });
    fastify.post('/leaders', async (request) => {
        const body = shared_1.createLeaderSchema.parse(request.body);
        const adminId = request.admin.id;
        const leader = await index_1.prisma.leader.create({
            data: { ...body, updatedBy: adminId },
        });
        await invalidateCache('public:leaders*');
        return { success: true, data: leader };
    });
    fastify.put('/leaders/:id', async (request) => {
        const body = shared_1.updateLeaderSchema.parse(request.body);
        const adminId = request.admin.id;
        const leader = await index_1.prisma.leader.update({
            where: { id: request.params.id },
            data: { ...body, updatedBy: adminId },
        });
        await invalidateCache('public:leaders*');
        return { success: true, data: leader };
    });
    fastify.delete('/leaders/:id', async (request) => {
        await index_1.prisma.leader.delete({
            where: { id: request.params.id },
        });
        await invalidateCache('public:leaders*');
        return { success: true, message: 'Leader deleted' };
    });
    // Admins CRUD (super admin only)
    fastify.get('/admins', async (request, reply) => {
        if (!request.admin.isSuperAdmin) {
            return reply.code(403).send({ error: 'Forbidden' });
        }
        const admins = await index_1.prisma.admin.findMany({
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
        });
        return { success: true, data: admins };
    });
    fastify.post('/admins', async (request, reply) => {
        if (!request.admin.isSuperAdmin) {
            return reply.code(403).send({ error: 'Forbidden' });
        }
        const body = shared_1.createAdminSchema.parse(request.body);
        const passwordHash = await (0, argon2_1.hash)(body.password);
        const admin = await index_1.prisma.admin.create({
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
        });
        return { success: true, data: admin };
    });
}
