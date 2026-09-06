import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getDynamicTemplate } from '@/templates/registry'
import { TemplateId, WeddingData } from '@/types/wedding'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

// ---------------------------------------------------------------------------
// Prisma Wedding include shape — used in both metadata and page render
// ---------------------------------------------------------------------------
const weddingInclude = {
  couple: true,
  family: true,
  events: { orderBy: { order: 'asc' } as const },
  gallery: { orderBy: { order: 'asc' } as const },
  music: true,
  rsvpConfig: true,
  compliments: { orderBy: { order: 'asc' } as const },
  seo: true,
} as const

// ---------------------------------------------------------------------------
// Type-safe adapter: Prisma result → WeddingData
// Avoids `as unknown as WeddingData` double cast.
// Only maps fields that WeddingData explicitly declares.
// ---------------------------------------------------------------------------
function toWeddingData(record: Awaited<ReturnType<typeof fetchWeddingBySlug>>): WeddingData {
  if (!record) throw new Error('Record is null')
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    templateId: record.templateId as TemplateId,
    templateVersion: record.templateVersion,
    status: record.status as WeddingData['status'],
    publishedAt: record.publishedAt ? record.publishedAt.toISOString() : null,
    couple: record.couple
      ? {
          id: record.couple.id,
          brideName: record.couple.brideName,
          brideQualification: record.couple.brideQualification,
          bridePhoto: record.couple.bridePhoto,
          groomName: record.couple.groomName,
          groomQualification: record.couple.groomQualification,
          groomPhoto: record.couple.groomPhoto,
          couplePhoto: record.couple.couplePhoto,
          monogram: record.couple.monogram,
          gregorianDate: record.couple.gregorianDate.toISOString(),
          gregorianDisplay: record.couple.gregorianDisplay,
          hijriDate: record.couple.hijriDate,
          islamicVerse: record.couple.islamicVerse,
          invitationMessage: record.couple.invitationMessage,
        }
      : null,
    family: record.family
      ? {
          id: record.family.id,
          brideParents: record.family.brideParents,
          bridePaternalGrandfather: record.family.bridePaternalGrandfather,
          brideMaternalGrandfather: record.family.brideMaternalGrandfather,
          groomFather: record.family.groomFather,
          groomPaternalGrandfather: record.family.groomPaternalGrandfather,
          groomMaternalGrandfather: record.family.groomMaternalGrandfather,
          invitationFromName: record.family.invitationFromName,
          invitationFromOrg: record.family.invitationFromOrg,
          invitationFromAddress: record.family.invitationFromAddress,
          invitationFromPhone: record.family.invitationFromPhone,
        }
      : null,
    events: record.events.map((e) => ({
      id: e.id,
      name: e.name,
      type: e.type,
      date: e.date ? e.date.toISOString() : null,
      timeDisplay: e.timeDisplay,
      description: e.description,
      venueName: e.venueName,
      venueAddress: e.venueAddress,
      mapsUrl: e.mapsUrl,
      order: e.order,
      enabled: e.enabled,
    })),
    gallery: record.gallery.map((g) => ({
      id: g.id,
      url: g.url,
      caption: g.caption,
      altText: g.altText,
      isCover: g.isCover,
      order: g.order,
    })),
    music: record.music
      ? {
          id: record.music.id,
          url: record.music.url,
          title: record.music.title,
          autoplay: record.music.autoplay,
        }
      : null,
    rsvpConfig: record.rsvpConfig
      ? {
          id: record.rsvpConfig.id,
          enabled: record.rsvpConfig.enabled,
          deadline: record.rsvpConfig.deadline ? record.rsvpConfig.deadline.toISOString() : null,
          whatsapp: record.rsvpConfig.whatsapp,
          message: record.rsvpConfig.message,
        }
      : null,
    compliments: record.compliments.map((c) => ({
      id: c.id,
      name: c.name,
      order: c.order,
    })),
    seo: record.seo
      ? {
          id: record.seo.id,
          title: record.seo.title,
          description: record.seo.description,
          ogImage: record.seo.ogImage,
          keywords: record.seo.keywords,
        }
      : null,
  }
}

async function fetchWeddingBySlug(slug: string) {
  return prisma.wedding.findUnique({
    where: { slug },
    include: weddingInclude,
  })
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata(props: Props) {
  const { slug } = await props.params
  const record = await fetchWeddingBySlug(slug)

  if (!record) return {}

  const title = record.seo?.title || record.title
  const description =
    record.seo?.description ||
    `Wedding invitation of ${record.couple?.brideName ?? ''} and ${record.couple?.groomName ?? ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: record.seo?.ogImage ? [record.seo.ogImage] : [],
    },
  }
}

// ---------------------------------------------------------------------------
// Invitation Page
// ---------------------------------------------------------------------------
export default async function InvitationPage(props: Props) {
  const { slug } = await props.params

  // Fetch the wedding record — NO fallback. Unknown slugs → 404.
  const weddingRecord = await fetchWeddingBySlug(slug)

  if (!weddingRecord) {
    notFound()
  }

  // Type-safe adapter — no `as unknown as` cast
  const wedding = toWeddingData(weddingRecord)

  // Resolve template using BOTH templateId and templateVersion
  const TemplateComponent = getDynamicTemplate(
    wedding.templateId,
    wedding.templateVersion
  )

  // Missing template version = hard error, not a silent fallback
  if (!TemplateComponent) {
    console.error(
      `[InvitationPage] Template not found: ${wedding.templateId}@${wedding.templateVersion} for slug="${slug}"`
    )
    notFound()
  }

  return <TemplateComponent wedding={wedding} />
}
