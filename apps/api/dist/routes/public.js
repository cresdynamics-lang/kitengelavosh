"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    // Update Links (public list for footer etc.)
    fastify.get('/links', async () => {
        return getCached('public:links', async () => {
            const links = await index_1.prisma.updateLink.findMany({
                where: { isActive: true },
                orderBy: { orderIndex: 'asc' },
            });
            return { success: true, data: links };
        });
    });
    // Contact form → email via Resend
    fastify.post('/contact', async (request) => {
        const body = request.body;
        const name = (body.name || '').toString().slice(0, 200);
        const email = (body.email || '').toString().slice(0, 200);
        const message = (body.message || '').toString().slice(0, 5000);
        if (!message) {
            return { success: false, error: 'Message is required' };
        }
        try {
            const { sendContactEmail } = await Promise.resolve().then(() => __importStar(require('../utils/email')));
            await sendContactEmail({ name, email, message });
            return { success: true };
        }
        catch (error) {
            console.error('Error sending contact email:', error);
            return { success: false, error: 'Failed to send message' };
        }
    });
}
