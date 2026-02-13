import { z } from 'zod';
export declare const siteSettingsSchema: z.ZodObject<{
    churchName: z.ZodString;
    tagline: z.ZodOptional<z.ZodString>;
    locationText: z.ZodString;
    mapLink: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    facebookUrl: z.ZodNullable<z.ZodString>;
    instagramUrl: z.ZodNullable<z.ZodString>;
    youtubeUrl: z.ZodNullable<z.ZodString>;
    twitterUrl: z.ZodNullable<z.ZodString>;
    phoneNumbers: z.ZodArray<z.ZodString, "many">;
    email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    churchName: string;
    locationText: string;
    logoUrl: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
    youtubeUrl: string | null;
    twitterUrl: string | null;
    phoneNumbers: string[];
    email: string | null;
    tagline?: string | undefined;
    mapLink?: string | undefined;
}, {
    churchName: string;
    locationText: string;
    logoUrl: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
    youtubeUrl: string | null;
    twitterUrl: string | null;
    phoneNumbers: string[];
    email: string | null;
    tagline?: string | undefined;
    mapLink?: string | undefined;
}>;
export declare const createProgramSchema: z.ZodObject<{
    title: z.ZodString;
    day: z.ZodEnum<["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>;
    startTime: z.ZodString;
    endTime: z.ZodString;
    venue: z.ZodString;
    contacts: z.ZodArray<z.ZodString, "many">;
    posterImageUrl: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    orderIndex: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title: string;
    day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    startTime: string;
    endTime: string;
    venue: string;
    contacts: string[];
    posterImageUrl: string | null;
    description: string | null;
    isActive: boolean;
    orderIndex: number;
}, {
    title: string;
    day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    startTime: string;
    endTime: string;
    venue: string;
    contacts: string[];
    posterImageUrl: string | null;
    description: string | null;
    isActive?: boolean | undefined;
    orderIndex?: number | undefined;
}>;
export declare const updateProgramSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    day: z.ZodOptional<z.ZodEnum<["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    venue: z.ZodOptional<z.ZodString>;
    contacts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    posterImageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    orderIndex: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    day?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    venue?: string | undefined;
    contacts?: string[] | undefined;
    posterImageUrl?: string | null | undefined;
    description?: string | null | undefined;
    isActive?: boolean | undefined;
    orderIndex?: number | undefined;
}, {
    title?: string | undefined;
    day?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    venue?: string | undefined;
    contacts?: string[] | undefined;
    posterImageUrl?: string | null | undefined;
    description?: string | null | undefined;
    isActive?: boolean | undefined;
    orderIndex?: number | undefined;
}>;
export declare const createEventSchema: z.ZodObject<{
    title: z.ZodString;
    date: z.ZodString;
    time: z.ZodString;
    venue: z.ZodString;
    entryFee: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    speakers: z.ZodArray<z.ZodString, "many">;
    posterImageUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date: string;
    title: string;
    venue: string;
    posterImageUrl: string | null;
    description: string | null;
    time: string;
    entryFee: string | null;
    speakers: string[];
}, {
    date: string;
    title: string;
    venue: string;
    posterImageUrl: string | null;
    description: string | null;
    time: string;
    entryFee: string | null;
    speakers: string[];
}>;
export declare const updateEventSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    time: z.ZodOptional<z.ZodString>;
    venue: z.ZodOptional<z.ZodString>;
    entryFee: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    speakers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    posterImageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    date?: string | undefined;
    title?: string | undefined;
    venue?: string | undefined;
    posterImageUrl?: string | null | undefined;
    description?: string | null | undefined;
    time?: string | undefined;
    entryFee?: string | null | undefined;
    speakers?: string[] | undefined;
}, {
    date?: string | undefined;
    title?: string | undefined;
    venue?: string | undefined;
    posterImageUrl?: string | null | undefined;
    description?: string | null | undefined;
    time?: string | undefined;
    entryFee?: string | null | undefined;
    speakers?: string[] | undefined;
}>;
export declare const updateLiveStreamSchema: z.ZodObject<{
    isLive: z.ZodBoolean;
    platform: z.ZodNullable<z.ZodEnum<["youtube", "facebook", "googlemeet"]>>;
    youtubeLiveUrl: z.ZodNullable<z.ZodString>;
    facebookLiveUrl: z.ZodNullable<z.ZodString>;
    googleMeetUrl: z.ZodNullable<z.ZodString>;
    title: z.ZodNullable<z.ZodString>;
    scheduleTime: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string | null;
    isLive: boolean;
    platform: "youtube" | "facebook" | "googlemeet" | null;
    youtubeLiveUrl: string | null;
    facebookLiveUrl: string | null;
    googleMeetUrl: string | null;
    scheduleTime: string | null;
}, {
    title: string | null;
    isLive: boolean;
    platform: "youtube" | "facebook" | "googlemeet" | null;
    youtubeLiveUrl: string | null;
    facebookLiveUrl: string | null;
    googleMeetUrl: string | null;
    scheduleTime: string | null;
}>;
export declare const updateSermonSourceSchema: z.ZodObject<{
    youtubePlaylistUrl: z.ZodNullable<z.ZodString>;
    latestSermonUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    youtubePlaylistUrl: string | null;
    latestSermonUrl: string | null;
}, {
    youtubePlaylistUrl: string | null;
    latestSermonUrl: string | null;
}>;
export declare const createSermonSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    speaker: z.ZodNullable<z.ZodString>;
    date: z.ZodString;
    videoUrl: z.ZodNullable<z.ZodString>;
    audioUrl: z.ZodNullable<z.ZodString>;
    thumbnailUrl: z.ZodNullable<z.ZodString>;
    duration: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    date: string;
    title: string;
    description: string | null;
    speaker: string | null;
    videoUrl: string | null;
    audioUrl: string | null;
    thumbnailUrl: string | null;
    duration: number | null;
}, {
    date: string;
    title: string;
    description: string | null;
    speaker: string | null;
    videoUrl: string | null;
    audioUrl: string | null;
    thumbnailUrl: string | null;
    duration: number | null;
}>;
export declare const updateSermonSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    speaker: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date: z.ZodOptional<z.ZodString>;
    videoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audioUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    thumbnailUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    date?: string | undefined;
    title?: string | undefined;
    description?: string | null | undefined;
    speaker?: string | null | undefined;
    videoUrl?: string | null | undefined;
    audioUrl?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    duration?: number | null | undefined;
}, {
    date?: string | undefined;
    title?: string | undefined;
    description?: string | null | undefined;
    speaker?: string | null | undefined;
    videoUrl?: string | null | undefined;
    audioUrl?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    duration?: number | null | undefined;
}>;
export declare const createLeaderSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodString;
    bio: z.ZodNullable<z.ZodString>;
    photoUrl: z.ZodNullable<z.ZodString>;
    facebookUrl: z.ZodNullable<z.ZodString>;
    instagramUrl: z.ZodNullable<z.ZodString>;
    twitterUrl: z.ZodNullable<z.ZodString>;
    orderIndex: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    facebookUrl: string | null;
    instagramUrl: string | null;
    twitterUrl: string | null;
    title: string;
    orderIndex: number;
    name: string;
    bio: string | null;
    photoUrl: string | null;
}, {
    facebookUrl: string | null;
    instagramUrl: string | null;
    twitterUrl: string | null;
    title: string;
    name: string;
    bio: string | null;
    photoUrl: string | null;
    orderIndex?: number | undefined;
}>;
export declare const updateLeaderSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    facebookUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    instagramUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    twitterUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    orderIndex: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    facebookUrl?: string | null | undefined;
    instagramUrl?: string | null | undefined;
    twitterUrl?: string | null | undefined;
    title?: string | undefined;
    orderIndex?: number | undefined;
    name?: string | undefined;
    bio?: string | null | undefined;
    photoUrl?: string | null | undefined;
}, {
    facebookUrl?: string | null | undefined;
    instagramUrl?: string | null | undefined;
    twitterUrl?: string | null | undefined;
    title?: string | undefined;
    orderIndex?: number | undefined;
    name?: string | undefined;
    bio?: string | null | undefined;
    photoUrl?: string | null | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createAdminSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    fullName: z.ZodNullable<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["admin", "moderator", "editor"]>>;
    isSuperAdmin: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
    fullName: string | null;
    role: "admin" | "moderator" | "editor";
    isSuperAdmin: boolean;
}, {
    email: string;
    username: string;
    password: string;
    fullName: string | null;
    role?: "admin" | "moderator" | "editor" | undefined;
    isSuperAdmin?: boolean | undefined;
}>;
export declare const updateAdminSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    role: z.ZodOptional<z.ZodEnum<["admin", "moderator", "editor"]>>;
    isSuperAdmin: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    username?: string | undefined;
    fullName?: string | null | undefined;
    role?: "admin" | "moderator" | "editor" | undefined;
    isSuperAdmin?: boolean | undefined;
}, {
    email?: string | undefined;
    username?: string | undefined;
    fullName?: string | null | undefined;
    role?: "admin" | "moderator" | "editor" | undefined;
    isSuperAdmin?: boolean | undefined;
}>;
