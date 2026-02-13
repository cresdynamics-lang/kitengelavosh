// Shared TypeScript types

export interface SiteSettings {
  id: string
  churchName: string
  tagline: string
  locationText: string
  mapLink: string
  logoUrl: string | null
  facebookUrl: string | null
  instagramUrl: string | null
  youtubeUrl: string | null
  twitterUrl: string | null
  phoneNumbers: string[]
  email: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Program {
  id: string
  title: string
  day: string
  startTime: string
  endTime: string
  venue: string
  contacts: string[]
  posterImageUrl: string | null
  description: string | null
  isActive: boolean
  orderIndex: number
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  date: Date
  time: string
  venue: string
  entryFee: string | null
  description: string | null
  speakers: string[]
  posterImageUrl: string | null
  isUpcoming: boolean
  createdAt: Date
  updatedAt: Date
}

export interface LiveStream {
  id: string
  isLive: boolean
  platform: 'youtube' | 'facebook' | 'googlemeet' | null
  youtubeLiveUrl: string | null
  facebookLiveUrl: string | null
  googleMeetUrl: string | null
  title: string | null
  scheduleTime: Date | null
  updatedAt: Date
}

export interface SermonSource {
  id: string
  youtubePlaylistUrl: string | null
  latestSermonUrl: string | null
  updatedAt: Date
}

export interface Sermon {
  id: string
  title: string
  description: string | null
  speaker: string | null
  date: Date
  videoUrl: string | null
  audioUrl: string | null
  thumbnailUrl: string | null
  duration: number | null
  views: number
  createdAt: Date
  updatedAt: Date
}

export interface Leader {
  id: string
  name: string
  title: string
  bio: string | null
  photoUrl: string | null
  facebookUrl: string | null
  instagramUrl: string | null
  twitterUrl: string | null
  orderIndex: number
  createdAt: Date
  updatedAt: Date
}

export interface Admin {
  id: string
  username: string
  email: string
  fullName: string | null
  role: 'admin' | 'moderator' | 'editor'
  isSuperAdmin: boolean
  createdAt: Date
  updatedAt: Date
}
