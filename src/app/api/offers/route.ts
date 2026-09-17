import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/offers
 * Returns all active, non-expired offers per template.
 * Used by the homepage to show discount badges on template cards.
 */
export async function GET() {
  try {
    const now = new Date()
    const offers = await prisma.templateOffer.findMany({
      where: {
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } },
        ],
      },
      select: {
        templateId: true,
        label: true,
        discountPct: true,
        expiresAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Return as a map: templateId → offer (first active offer wins)
    const offerMap: Record<string, { label: string; discountPct: number; expiresAt: string | null }> = {}
    for (const offer of offers) {
      if (!offerMap[offer.templateId]) {
        offerMap[offer.templateId] = {
          label: offer.label,
          discountPct: offer.discountPct,
          expiresAt: offer.expiresAt ? offer.expiresAt.toISOString() : null,
        }
      }
    }

    return NextResponse.json({ offers: offerMap })
  } catch (err) {
    console.error('[/api/offers] Error:', err)
    return NextResponse.json({ offers: {} }, { status: 500 })
  }
}
