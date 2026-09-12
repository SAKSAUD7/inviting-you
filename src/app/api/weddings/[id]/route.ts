import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// GET /api/weddings/[id] — Get a single wedding (Admin only)
// ---------------------------------------------------------------------------
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
        birthday: true,
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

// ---------------------------------------------------------------------------
// PUT /api/weddings/[id] — Update a wedding (Admin only)
// ---------------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  try {
    const body = await request.json()
    const { title, slug, templateId, status, couple, family, events, music, rsvpConfig, seo, birthday, gallery } = body

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
          data: events.map((e: Record<string, unknown>, i: number) => ({
            weddingId: id,
            name: e.name,
            type: e.type || 'CUSTOM',
            date: e.date ? new Date(e.date as string) : null,
            timeDisplay: e.timeDisplay || '',
            description: e.description || '',
            venueName: e.venueName || '',
            venueAddress: e.venueAddress || '',
            mapsUrl: e.mapsUrl || '',
            order: (e.order as number) || i + 1,
            enabled: (e.enabled as boolean) ?? true,
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

    if (birthday) {
      const birthdayData = {
        birthdayPersonName: birthday.birthdayPersonName || '',
        age: birthday.age ? parseInt(birthday.age) : null,
        birthdayDate: birthday.birthdayDate ? new Date(birthday.birthdayDate) : null,
        senderName: birthday.senderName || '',
        headline: birthday.headline || '',
        introMessage: birthday.introMessage || '',
        questionText: birthday.questionText || '',
        balloons: birthday.balloons ? parseInt(birthday.balloons) : 4,
        balloonSectionTitle: birthday.balloonSectionTitle || null,
        balloonSectionSubtitle: birthday.balloonSectionSubtitle || null,
        balloonRevealWords: Array.isArray(birthday.balloonRevealWords) ? birthday.balloonRevealWords : [],
        bouquetMessages: birthday.bouquetMessages || [],
        bouquetTitle: birthday.bouquetTitle || null,
        bouquetSubtitle: birthday.bouquetSubtitle || null,
        bouquetReasons: Array.isArray(birthday.bouquetReasons) ? birthday.bouquetReasons : [],
        birthdayMessage: birthday.birthdayMessage || '',
        signature: birthday.signature || '',
        finalMessage: birthday.finalMessage || '',
        heroImage: birthday.heroImage || '',
        loveMessage: birthday.loveMessage || null,
        giftMessage: birthday.giftMessage || null,
      }
      await prisma.birthdayConfig.upsert({
        where: { weddingId: id },
        update: birthdayData,
        create: { weddingId: id, ...birthdayData },
      })
    }

    // Replace gallery images
    if (gallery) {
      await prisma.galleryImage.deleteMany({ where: { weddingId: id } })
      if (gallery.length > 0) {
        await prisma.galleryImage.createMany({
          data: gallery.map((g: Record<string, unknown>, i: number) => ({
            weddingId: id,
            url: g.url as string,
            caption: (g.caption as string) || '',
            altText: (g.altText as string) || '',
            isCover: (g.isCover as boolean) ?? (i === 0),
            order: (g.order as number) || i + 1,
          })),
        })
      }
    }

    return NextResponse.json({ success: true, id: wedding.id })
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })
    }
    console.error('Update error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/weddings/[id] — Delete a wedding (Admin only)
// ---------------------------------------------------------------------------
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  try {
    await prisma.wedding.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
