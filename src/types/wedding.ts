export interface WeddingData {
  id: string
  slug: string
  title: string
  templateId: TemplateId
  /** Version of the template to render. DB default is 1. Never silently ignored. */
  templateVersion: number
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt?: string | null
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
  events: WeddingEvent[]
  gallery: GalleryImage[]
  music?: WeddingMusic | null
  rsvpConfig?: RSVPConfig | null
  birthday?: BirthdayConfig | null
  compliments: Compliment[]
  seo?: WeddingSEO | null
}

/** Only templates with an available loader are valid TemplateIds. */
export type TemplateId = 'velvet' | 'noor' | 'sultan' | 'walima' | 'birthday-interactive-01'

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

export interface BirthdayConfig {
  id: string
  weddingId: string
  birthdayPersonName: string
  age?: number | null
  birthdayDate?: string | null
  senderName?: string | null
  headline?: string | null
  introMessage?: string | null
  questionText?: string | null
  balloons: number
  balloonSectionTitle?: string | null     // e.g. "Pop the Balloons"
  balloonSectionSubtitle?: string | null  // e.g. "and reveal a message from my heart"
  balloonRevealWords?: string[]           // Words that appear as balloons are popped
  bouquetMessages: string[]
  bouquetTitle?: string | null            // e.g. "For Ayman, who brings beauty to my world"
  bouquetSubtitle?: string | null         // e.g. "Each button represents a reason..."
  bouquetReasons?: string[]              // Reason cards shown when bouquet icons are clicked
  birthdayMessage?: string | null
  signature?: string | null
  finalMessage?: string | null
  heroImage?: string | null
  theme?: string | null
  loveMessage?: string | null             // Message shown after gift opens
  giftMessage?: string | null             // Subtitle for the gift box screen
}
