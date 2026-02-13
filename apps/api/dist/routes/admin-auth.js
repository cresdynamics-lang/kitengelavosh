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
exports.adminAuthRoutes = adminAuthRoutes;
const index_1 = require("../index");
const shared_1 = require("@vosh/shared");
/**
 * Admin auth routes (no authentication required).
 * Registered separately so the auth hook never runs for login.
 */
async function adminAuthRoutes(fastify) {
    fastify.post('/login', async (request, reply) => {
        try {
            const body = shared_1.loginSchema.parse(request.body || {});
            const admin = await index_1.prisma.admin.findFirst({
                where: {
                    OR: [{ username: body.username }, { email: body.username }],
                },
            });
            if (!admin) {
                return reply.code(401).send({ success: false, error: 'Invalid credentials' });
            }
            const { verify } = await Promise.resolve().then(() => __importStar(require('argon2')));
            const isValid = await verify(admin.passwordHash, body.password);
            if (!isValid) {
                return reply.code(401).send({ success: false, error: 'Invalid credentials' });
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
            });
        }
        catch (err) {
            fastify.log.error(err, 'Login error');
            if (err.name === 'ZodError') {
                return reply.code(400).send({ success: false, error: 'Username and password are required.' });
            }
            if (err.code === 'P2021' || err.message?.includes('does not exist')) {
                return reply.code(503).send({ success: false, error: 'Database not ready.' });
            }
            return reply.code(500).send({ success: false, error: 'Login failed. Please try again.' });
        }
    });
}
