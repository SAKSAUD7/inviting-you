import { TemplateId, TemplateMetadata } from '@/types/wedding'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { WeddingData } from '@/types/wedding'

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateMetadata> = {
  velvet: {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Dark, cinematic, regal',
    description: 'A dramatic luxury experience with deep crimson tones, gold accents, crystal chandeliers, and an immersive cinematic reveal.',
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
    description: 'A light and airy editorial experience with warm ivory tones, Islamic arch motifs, and graceful botanical elements.',
    category: 'Islamic Elegance',
    price: 2499,
    priceLabel: '₹2,499',
    thumbnail: '/templates/noor-thumb.jpg',
    mood: ['Light', 'Elegant', 'Editorial', 'Serene'],
    features: ['Islamic arch motif', 'Editorial gallery', 'Botanical elements', 'Music player'],
  },
  garden: {
    id: 'garden',
    name: 'Garden',
    tagline: 'Botanical, romantic, lush',
    description: 'A lush botanical experience with watercolor florals, forest greens, and the warmth of a garden celebration.',
    category: 'Floral',
    price: 2499,
    priceLabel: '₹2,499',
    thumbnail: '/templates/garden-thumb.jpg',
    mood: ['Romantic', 'Botanical', 'Warm', 'Lush'],
    features: ['Watercolor florals', 'Parallax sections', 'Botanical gallery', 'Music player'],
  },
  pearl: {
    id: 'pearl',
    name: 'Pearl',
    tagline: 'Minimal, pure, timeless',
    description: 'An ultra-minimalist luxury experience with pure white, pearl accents, and typographic artistry.',
    category: 'Minimalist',
    price: 1999,
    priceLabel: '₹1,999',
    thumbnail: '/templates/pearl-thumb.jpg',
    mood: ['Minimal', 'Pure', 'Timeless', 'Modern'],
    features: ['Pure typography', 'Hairline rules', 'Minimal animations', 'Music player'],
  },
}

export function getTemplateMetadata(id: TemplateId): TemplateMetadata {
  return TEMPLATE_REGISTRY[id]
}

export function getAllTemplates(): TemplateMetadata[] {
  return Object.values(TEMPLATE_REGISTRY)
}

export type InvitationTemplateProps = {
  wedding: WeddingData
}

// Dynamic loaders — each template's JS only loads when needed
const templateLoaders: Record<string, () => Promise<{ default: ComponentType<InvitationTemplateProps> }>> = {
  velvet: () => import('@/templates/velvet/VelvetInvitation'),
  noor:   () => import('@/templates/noor/NoorInvitation'),
  // garden: () => import('@/templates/garden/GardenInvitation'),
  // pearl:  () => import('@/templates/pearl/PearlInvitation'),
}

export function getDynamicTemplate(id: TemplateId) {
  const loader = templateLoaders[id as string]
  if (!loader) return null
  return dynamic(loader)
}
