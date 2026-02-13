"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = authenticateAdmin;
exports.authPlugin = authPlugin;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function authenticateAdmin(request, reply) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const token = authHeader.substring(7);
        // In production, verify JWT token here
        // For now, we'll use a simple token check
        const admin = await prisma.admin.findFirst({
            where: { id: token }, // Simplified - use JWT in production
        });
        if (!admin) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        request.admin = {
            id: admin.id,
            username: admin.username,
            role: admin.role,
            isSuperAdmin: admin.isSuperAdmin,
        };
    }
    catch (error) {
        return reply.code(401).send({ error: 'Unauthorized' });
    }
}
async function authPlugin(fastify) {
    fastify.decorate('authenticate', authenticateAdmin);
}
