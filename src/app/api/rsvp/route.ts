import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { weddingId, guestName, attending, guestCount, message } = body

    if (!weddingId || !guestName || attending === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify wedding exists and RSVP is enabled
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      include: { rsvpConfig: true },
    })

    if (!wedding) {
      return NextResponse.json({ error: 'Wedding not found' }, { status: 404 })
    }
    if (!wedding.rsvpConfig?.enabled) {
      return NextResponse.json({ error: 'RSVP is not enabled' }, { status: 403 })
    }

    const response = await prisma.rSVPResponse.create({
      data: {
        weddingId,
        guestName: guestName.trim(),
        attending: Boolean(attending),
        guestCount: Math.min(Math.max(Number(guestCount) || 1, 1), 10),
        message: message?.trim() ?? null,
      },
    })

    // Track analytics
    await prisma.weddingAnalytic.create({
      data: {
        weddingId,
        event: 'rsvp',
        device: request.headers.get('user-agent') ?? undefined,
        referrer: request.headers.get('referer') ?? undefined,
      },
    })

    return NextResponse.json({ success: true, id: response.id })
  } catch (error) {
    console.error('RSVP error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const weddingId = searchParams.get('weddingId')

  if (!weddingId) {
    return NextResponse.json({ error: 'weddingId required' }, { status: 400 })
  }

  const responses = await prisma.rSVPResponse.findMany({
    where: { weddingId },
    orderBy: { createdAt: 'desc' },
  })

  const attending = responses.filter((r) => r.attending)
  const declined = responses.filter((r) => !r.attending)

  return NextResponse.json({
    total: responses.length,
    attending: attending.length,
    declined: declined.length,
    totalGuests: attending.reduce((sum, r) => sum + r.guestCount, 0),
    responses,
  })
}
