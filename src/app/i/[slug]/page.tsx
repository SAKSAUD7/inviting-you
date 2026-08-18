import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getDynamicTemplate } from '@/templates/registry'
import { TemplateId, WeddingData } from '@/types/wedding'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const wedding = await prisma.wedding.findUnique({
    where: { slug: params.slug },
    include: { seo: true, couple: true },
  })

  if (!wedding) return {}

  const title = wedding.seo?.title || wedding.title
  const description = wedding.seo?.description || `Wedding invitation of ${wedding.couple?.brideName} and ${wedding.couple?.groomName}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: wedding.seo?.ogImage ? [wedding.seo.ogImage] : [],
    },
  }
}

export default async function InvitationPage(props: Props) {
  const params = await props.params;
  const weddingRecord = await prisma.wedding.findUnique({
    where: { slug: params.slug },
    include: {
      couple: true,
      family: true,
      events: { orderBy: { order: 'asc' } },
      gallery: { orderBy: { order: 'asc' } },
      music: true,
      rsvpConfig: true,
      compliments: { orderBy: { order: 'asc' } },
      seo: true,
    },
  })

  if (!weddingRecord) {
    notFound()
  }

  // Cast DB record to our frontend WeddingData type
  const wedding = weddingRecord as unknown as WeddingData

  // Resolve the correct template component
  const TemplateComponent = getDynamicTemplate(wedding.templateId as TemplateId)

  if (!TemplateComponent) {
    return <div>Template not found</div>
  }

  return <TemplateComponent wedding={wedding} />
}
