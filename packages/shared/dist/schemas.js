"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = exports.createAdminSchema = exports.loginSchema = exports.updateLeaderSchema = exports.createLeaderSchema = exports.updateSermonSchema = exports.createSermonSchema = exports.updateSermonSourceSchema = exports.updateLiveStreamSchema = exports.updateEventSchema = exports.createEventSchema = exports.updateProgramSchema = exports.createProgramSchema = exports.siteSettingsSchema = void 0;
const zod_1 = require("zod");
// Site Settings Schemas
exports.siteSettingsSchema = zod_1.z.object({
    churchName: zod_1.z.string().min(1),
    tagline: zod_1.z.string().optional(),
    locationText: zod_1.z.string().min(1),
    mapLink: zod_1.z.string().url().optional(),
    logoUrl: zod_1.z.string().url().nullable(),
    facebookUrl: zod_1.z.string().url().nullable(),
    instagramUrl: zod_1.z.string().url().nullable(),
    youtubeUrl: zod_1.z.string().url().nullable(),
    twitterUrl: zod_1.z.string().url().nullable(),
    phoneNumbers: zod_1.z.array(zod_1.z.string()),
    email: zod_1.z.string().email().nullable(),
});
// Program Schemas
exports.createProgramSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    day: zod_1.z.enum(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
    startTime: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    endTime: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    venue: zod_1.z.string().min(1),
    contacts: zod_1.z.array(zod_1.z.string()),
    posterImageUrl: zod_1.z.string().url().nullable(),
    description: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean().default(true),
    orderIndex: zod_1.z.number().int().default(0),
});
exports.updateProgramSchema = exports.createProgramSchema.partial();
// Event Schemas
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    date: zod_1.z.string().datetime(),
    time: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    venue: zod_1.z.string().min(1),
    entryFee: zod_1.z.string().nullable(),
    description: zod_1.z.string().nullable(),
    speakers: zod_1.z.array(zod_1.z.string()),
    posterImageUrl: zod_1.z.string().url().nullable(),
});
exports.updateEventSchema = exports.createEventSchema.partial();
// LiveStream Schemas
exports.updateLiveStreamSchema = zod_1.z.object({
    isLive: zod_1.z.boolean(),
    platform: zod_1.z.enum(['youtube', 'facebook', 'googlemeet']).nullable(),
    youtubeLiveUrl: zod_1.z.string().url().nullable(),
    facebookLiveUrl: zod_1.z.string().url().nullable(),
    googleMeetUrl: zod_1.z.string().url().nullable(),
    title: zod_1.z.string().nullable(),
    scheduleTime: zod_1.z.string().datetime().nullable(),
});
// SermonSource Schemas
exports.updateSermonSourceSchema = zod_1.z.object({
    youtubePlaylistUrl: zod_1.z.string().url().nullable(),
    latestSermonUrl: zod_1.z.string().url().nullable(),
});
// Sermon Schemas
exports.createSermonSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().nullable(),
    speaker: zod_1.z.string().nullable(),
    date: zod_1.z.string().datetime(),
    videoUrl: zod_1.z.string().url().nullable(),
    audioUrl: zod_1.z.string().url().nullable(),
    thumbnailUrl: zod_1.z.string().url().nullable(),
    duration: zod_1.z.number().int().positive().nullable(),
});
exports.updateSermonSchema = exports.createSermonSchema.partial();
// Leader Schemas
exports.createLeaderSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    bio: zod_1.z.string().nullable(),
    photoUrl: zod_1.z.string().url().nullable(),
    facebookUrl: zod_1.z.string().url().nullable(),
    instagramUrl: zod_1.z.string().url().nullable(),
    twitterUrl: zod_1.z.string().url().nullable(),
    orderIndex: zod_1.z.number().int().default(0),
});
exports.updateLeaderSchema = exports.createLeaderSchema.partial();
// Auth Schemas
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
});
exports.createAdminSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    fullName: zod_1.z.string().nullable(),
    role: zod_1.z.enum(['admin', 'moderator', 'editor']).default('admin'),
    isSuperAdmin: zod_1.z.boolean().default(false),
});
exports.updateAdminSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).optional(),
    email: zod_1.z.string().email().optional(),
    fullName: zod_1.z.string().nullable().optional(),
    role: zod_1.z.enum(['admin', 'moderator', 'editor']).optional(),
    isSuperAdmin: zod_1.z.boolean().optional(),
});
