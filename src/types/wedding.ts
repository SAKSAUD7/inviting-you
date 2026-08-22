export interface WeddingData {
  id: string
  slug: string
  title: string
  templateId: TemplateId
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt?: string | null
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
  events: WeddingEvent[]
  gallery: GalleryImage[]
  music?: WeddingMusic | null
  rsvpConfig?: RSVPConfig | null
  compliments: Compliment[]
  seo?: WeddingSEO | null
}

export type TemplateId = 'velvet' | 'noor' | 'garden' | 'pearl' | 'sultan'

export interface WeddingCouple {
  id: string
  brideName: string
  brideQualification?: string | null
  bridePhoto?: string | null
  groomName: string
  groomQualification?: string | null
  groomPhoto?: string | null
  couplePhoto?: string | null
  monogram?: string | null
  gregorianDate: string
  gregorianDisplay: string
  hijriDate?: string | null
  islamicVerse?: string | null
  invitationMessage?: string | null
}

export interface WeddingFamily {
  id: string
  brideParents?: string | null
  bridePaternalGrandfather?: string | null
  brideMaternalGrandfather?: string | null
  groomFather?: string | null
  groomPaternalGrandfather?: string | null
  groomMaternalGrandfather?: string | null
  invitationFromName?: string | null
  invitationFromOrg?: string | null
  invitationFromAddress?: string | null
  invitationFromPhone?: string | null
}

export interface WeddingEvent {
  id: string
  name: string
  type: string
  date?: string | null
  timeDisplay?: string | null
  description?: string | null
  venueName?: string | null
  venueAddress?: string | null
  mapsUrl?: string | null
  order: number
  enabled: boolean
}

export interface GalleryImage {
  id: string
  url: string
  caption?: string | null
  altText?: string | null
  isCover: boolean
  order: number
}

export interface WeddingMusic {
  id: string
  url?: string | null
  title?: string | null
  autoplay: boolean
}

export interface RSVPConfig {
  id: string
  enabled: boolean
  deadline?: string | null
  whatsapp?: string | null
  message?: string | null
}

export interface Compliment {
  id: string
  name: string
  order: number
}

export interface WeddingSEO {
  id: string
  title?: string | null
  description?: string | null
  ogImage?: string | null
  keywords?: string | null
}

export interface TemplateMetadata {
  id: TemplateId
  name: string
  tagline: string
  description: string
  category: string
  price: number
  priceLabel: string
  thumbnail: string
  mood: string[]
  features: string[]
}

export interface RSVPSubmission {
  weddingId: string
  guestName: string
  attending: boolean
  guestCount: number
  message?: string
}
