import { TemplateId, TemplateMetadata, WeddingData } from '@/types/wedding'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// ---------------------------------------------------------------------------
// Template Metadata — only templates with real loaders appear here
// ---------------------------------------------------------------------------

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateMetadata> = {
  velvet: {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Dark, cinematic, regal',
    description:
      'A dramatic luxury experience with deep crimson tones, gold accents, crystal chandeliers, and an immersive cinematic reveal.',
    category: 'Islamic Luxury',
    price: 2999,
    priceLabel: '₹2,999',
    thumbnail: '/templates/velvet-thumb.jpg',
    mood: ['Dark', 'Dramatic', 'Cinematic', 'Regal'],
    features: ['Scratch to Reveal date', 'Cinematic gallery', 'Animated opening', 'Music player'],
  },
  noor: {
    id: 'noor',
    name: 'Noor',
    tagline: 'Light, elegant, serene',
    description:
      'A light and airy editorial experience with warm ivory tones, Islamic arch motifs, and graceful botanical elements.',
    category: 'Islamic Elegance',
    price: 2499,
    priceLabel: '₹2,499',
    thumbnail: '/templates/noor-thumb.jpg',
    mood: ['Light', 'Elegant', 'Editorial', 'Serene'],
    features: ['Islamic arch motif', 'Editorial gallery', 'Botanical elements', 'Music player'],
  },
  sultan: {
    id: 'sultan',
    name: 'Sultan',
    tagline: 'Royal, majestic, heavy',
    description:
      'A royal Nikah experience with deep crimson, heavy gold accents, and a majestic palace door reveal.',
    category: 'Islamic Luxury',
    price: 2999,
    priceLabel: '₹2,999',
    thumbnail: '/templates/sultan-thumb.jpg',
    mood: ['Royal', 'Majestic', 'Heavy', 'Traditional'],
    features: ['Palace Door Reveal', 'Mughal motifs', 'Rich typography'],
  },
  walima: {
    id: 'walima',
    name: 'Walima',
    tagline: 'Soft pastel, romantic, elegant',
    description:
      'A premium soft pastel Walima invitation with an elegant floral reveal, Islamic arch motifs, and a custom intertwined monogram.',
    category: 'Islamic Elegance',
    price: 2999,
    priceLabel: '₹2,999',
    thumbnail: '/templates/walima-thumb.jpg',
    mood: ['Soft', 'Romantic', 'Elegant', 'Pastel'],
    features: ['Floral petal reveal', 'Custom monogram', 'Animated opening', 'Music player'],
  },
}

export function getTemplateMetadata(id: TemplateId): TemplateMetadata {
  return TEMPLATE_REGISTRY[id]
}

export function getAllTemplates(): TemplateMetadata[] {
  return Object.values(TEMPLATE_REGISTRY)
}

// ---------------------------------------------------------------------------
// Template Props Contract
// All templates receive a fully-typed WeddingData. templateVersion is required.
// ---------------------------------------------------------------------------

export interface InvitationTemplateProps {
  wedding: WeddingData
}

// ---------------------------------------------------------------------------
// Versioned Dynamic Loaders
// Key format: "<templateId>@<templateVersion>"
// Adding a new template version = add a new key. Old keys are NEVER removed.
// ---------------------------------------------------------------------------

const templateLoaders: Record<
  string,
  () => Promise<{ default: ComponentType<InvitationTemplateProps> }>
> = {
  'velvet@1': () => import('@/templates/velvet/VelvetInvitation'),
  'noor@1': () => import('@/templates/noor/NoorInvitation'),
  'sultan@1': () => import('@/templates/sultan/SultanInvitation'),
  'walima@1': () => import('@/templates/walima/WalimaInvitation'),
  // When a new version is released, ADD a new entry — never replace:
  // 'noor@2':  () => import('@/templates/noor-v2/NoorInvitation'),
}

// ---------------------------------------------------------------------------
// Template Resolver
// Returns the dynamic component for a given id+version pair.
// Returns null if the combination is not registered — caller must handle this.
// NEVER falls back silently to another version.
// ---------------------------------------------------------------------------

export function getDynamicTemplate(
  id: TemplateId,
  version: number
): ComponentType<InvitationTemplateProps> | null {
  const key = `${id}@${version}`
  const loader = templateLoaders[key]
  if (!loader) return null
  return dynamic<InvitationTemplateProps>(loader)
}
