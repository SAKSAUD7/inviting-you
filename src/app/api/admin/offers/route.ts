import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/admin/offers — list all offers (admin only)
export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const offers = await prisma.templateOffer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ offers })
}

// POST /api/admin/offers — create a new offer
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { templateId, label, discountPct, expiresAt } = body

  if (!templateId || !label || discountPct == null) {
    return NextResponse.json({ error: 'templateId, label and discountPct are required' }, { status: 400 })
  }
  if (discountPct < 1 || discountPct > 100) {
    return NextResponse.json({ error: 'discountPct must be between 1 and 100' }, { status: 400 })
  }

  const offer = await prisma.templateOffer.create({
    data: {
      templateId,
      label,
      discountPct: Number(discountPct),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      active: true,
    },
  })

  return NextResponse.json({ offer }, { status: 201 })
}
