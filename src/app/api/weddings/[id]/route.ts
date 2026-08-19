import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const wedding = await prisma.wedding.findUnique({
      where: { id },
      include: {
        couple: true,
        family: true,
        events: { orderBy: { order: 'asc' } },
        gallery: { orderBy: { order: 'asc' } },
        music: true,
        rsvpConfig: true,
        rsvpResponses: { orderBy: { createdAt: 'desc' }, take: 50 },
        compliments: { orderBy: { order: 'asc' } },
        seo: true,
        _count: { select: { rsvpResponses: true } },
      },
    })
    if (!wedding) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(wedding)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { title, slug, templateId, status, couple, family, events, music, rsvpConfig, seo } = body

    // Update wedding basics
    const wedding = await prisma.wedding.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug: slug.toLowerCase().replace(/\s+/g, '-') }),
        ...(templateId && { templateId }),
        ...(status && { status }),
        ...(status === 'PUBLISHED' && { publishedAt: new Date() }),
      },
    })

    // Update couple
    if (couple) {
      const coupleData = {
        brideName: couple.brideName || '',
        brideQualification: couple.brideQualification || '',
        groomName: couple.groomName || '',
        groomQualification: couple.groomQualification || '',
        gregorianDate: couple.gregorianDate ? new Date(couple.gregorianDate) : new Date(),
        gregorianDisplay: couple.gregorianDisplay || '',
        hijriDate: couple.hijriDate || '',
        islamicVerse: couple.islamicVerse || '',
        invitationMessage: couple.invitationMessage || '',
      }
      await prisma.weddingCouple.upsert({
        where: { weddingId: id },
        update: coupleData,
        create: { weddingId: id, ...coupleData },
      })
    }

    // Update family
    if (family) {
      const familyData = {
        brideParents: family.brideParents || '',
        bridePaternalGrandfather: family.bridePaternalGrandfather || '',
        brideMaternalGrandfather: family.brideMaternalGrandfather || '',
        groomFather: family.groomFather || '',
        groomPaternalGrandfather: family.groomPaternalGrandfather || '',
        groomMaternalGrandfather: family.groomMaternalGrandfather || '',
        invitationFromName: family.invitationFromName || '',
        invitationFromOrg: family.invitationFromOrg || '',
        invitationFromAddress: family.invitationFromAddress || '',
        invitationFromPhone: family.invitationFromPhone || '',
      }
      await prisma.weddingFamily.upsert({
        where: { weddingId: id },
        update: familyData,
        create: { weddingId: id, ...familyData },
      })
    }

    // Replace events
    if (events) {
      await prisma.weddingEvent.deleteMany({ where: { weddingId: id } })
      if (events.length > 0) {
        await prisma.weddingEvent.createMany({
          data: events.map((e: any, i: number) => ({
            weddingId: id,
            name: e.name,
            type: e.type || 'CUSTOM',
            date: e.date ? new Date(e.date) : null,
            timeDisplay: e.timeDisplay || '',
            description: e.description || '',
            venueName: e.venueName || '',
            venueAddress: e.venueAddress || '',
            mapsUrl: e.mapsUrl || '',
            order: e.order || i + 1,
            enabled: e.enabled ?? true,
          })),
        })
      }
    }

    // Update music
    if (music !== undefined) {
      await prisma.weddingMusic.upsert({
        where: { weddingId: id },
        update: { title: music.title || '', url: music.url || '', autoplay: music.autoplay ?? true },
        create: { weddingId: id, title: music.title || '', url: music.url || '', autoplay: music.autoplay ?? true },
      })
    }

    // Update RSVP config
    if (rsvpConfig !== undefined) {
      await prisma.rSVPConfig.upsert({
        where: { weddingId: id },
        update: { enabled: rsvpConfig.enabled, message: rsvpConfig.message },
        create: { weddingId: id, enabled: rsvpConfig.enabled, message: rsvpConfig.message },
      })
    }

    // Update SEO
    if (seo) {
      await prisma.weddingSEO.upsert({
        where: { weddingId: id },
        update: seo,
        create: { weddingId: id, ...seo },
      })
    }

    return NextResponse.json({ success: true, id: wedding.id })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })
    }
    console.error('Update error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.wedding.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
