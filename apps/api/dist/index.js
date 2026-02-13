"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.prisma = void 0;
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const client_1 = require("@prisma/client");
const ioredis_1 = __importDefault(require("ioredis"));
const public_1 = require("./routes/public");
const admin_auth_1 = require("./routes/admin-auth");
const admin_1 = require("./routes/admin");
const auth_1 = require("./plugins/auth");
// Initialize Prisma Client
exports.prisma = new client_1.PrismaClient();
// Initialize Redis Client
exports.redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
// Create Fastify instance
const fastify = (0, fastify_1.default)({
    logger: {
        level: process.env.LOG_LEVEL || 'info',
    },
});
// Register plugins
async function build() {
    // Security
    await fastify.register(helmet_1.default);
    // CORS
    await fastify.register(cors_1.default, {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    });
    // Rate limiting
    await fastify.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute',
    });
    // Auth plugin
    await fastify.register(auth_1.authPlugin);
    // Routes (admin login first so it has no auth hook)
    await fastify.register(public_1.publicRoutes, { prefix: '/api/public' });
    await fastify.register(admin_auth_1.adminAuthRoutes, { prefix: '/api/admin' });
    await fastify.register(admin_1.adminRoutes, { prefix: '/api/admin' });
    // Health check
    fastify.get('/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });
    return fastify;
}
// Start server
async function start() {
    try {
        const server = await build();
        const port = parseInt(process.env.PORT || '3001');
        const host = process.env.HOST || '0.0.0.0';
        await server.listen({ port, host });
        console.log(`🚀 API server running on http://${host}:${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
// Handle graceful shutdown
process.on('SIGINT', async () => {
    await fastify.close();
    await exports.prisma.$disconnect();
    exports.redis.disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await fastify.close();
    await exports.prisma.$disconnect();
    exports.redis.disconnect();
    process.exit(0);
});
// Start the server
start();
