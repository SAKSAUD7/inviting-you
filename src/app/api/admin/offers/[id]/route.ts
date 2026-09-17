import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

// PATCH /api/admin/offers/[id] — toggle active, update fields
export async function PATCH(req: Request, props: Props) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await props.params
  const body = await req.json()

  const offer = await prisma.templateOffer.update({
    where: { id },
    data: {
      ...(body.active !== undefined && { active: body.active }),
      ...(body.label !== undefined && { label: body.label }),
      ...(body.discountPct !== undefined && { discountPct: Number(body.discountPct) }),
      ...(body.expiresAt !== undefined && { expiresAt: body.expiresAt ? new Date(body.expiresAt) : null }),
    },
  })

  return NextResponse.json({ offer })
}

// DELETE /api/admin/offers/[id]
export async function DELETE(_req: Request, props: Props) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await props.params
  await prisma.templateOffer.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
