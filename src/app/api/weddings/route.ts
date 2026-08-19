import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const weddings = await prisma.wedding.findMany({
      include: {
        couple: { select: { brideName: true, groomName: true, gregorianDisplay: true } },
        _count: { select: { rsvpResponses: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(weddings)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, templateId, status, couple, family, events, music, rsvpConfig } = body

    if (!slug || !title || !templateId) {
      return NextResponse.json({ error: 'Missing required fields: title, slug, templateId' }, { status: 400 })
    }

    // Get or create the admin user
    let adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: { email: 'admin@invitingyou.in', name: 'Admin', role: 'ADMIN', password: 'placeholder' },
      })
    }

    const wedding = await prisma.wedding.create({
      data: {
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        title,
        templateId,
        status: status || 'DRAFT',
        userId: adminUser.id,
        seo: { create: { title, description: `Wedding invitation for ${title}` } },

        ...(couple && {
          couple: {
            create: {
              brideName: couple.brideName || '',
              brideQualification: couple.brideQualification || '',
              groomName: couple.groomName || '',
              groomQualification: couple.groomQualification || '',
              gregorianDate: couple.gregorianDate ? new Date(couple.gregorianDate) : new Date(),
              gregorianDisplay: couple.gregorianDisplay || '',
              hijriDate: couple.hijriDate || '',
              islamicVerse: couple.islamicVerse || '',
              invitationMessage: couple.invitationMessage || '',
            },
          },
        }),

        ...(family && {
          family: {
            create: {
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
            },
          },
        }),

        ...(events &&
          events.length > 0 && {
            events: {
              create: events.map((e: any, i: number) => ({
                name: e.name,
                type: e.type || 'CUSTOM',
                date: e.date ? new Date(e.date) : new Date(),
                timeDisplay: e.timeDisplay || '',
                description: e.description || '',
                venueName: e.venueName || '',
                venueAddress: e.venueAddress || '',
                mapsUrl: e.mapsUrl || '',
                order: e.order || i + 1,
                enabled: true,
              })),
            },
          }),

        ...(music && {
          music: {
            create: { title: music.title || '', enabled: music.enabled ?? true },
          },
        }),

        rsvpConfig: {
          create: {
            enabled: rsvpConfig?.enabled ?? true,
            message: rsvpConfig?.message || 'We would be honoured by your presence.',
          },
        },
      },
    })

    return NextResponse.json(wedding, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'A wedding with this URL slug already exists. Please choose a different slug.' },
        { status: 409 }
      )
    }
    console.error('Wedding creation error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
