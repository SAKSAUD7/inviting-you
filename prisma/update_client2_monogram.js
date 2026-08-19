/**
 * Update Client 2 monogram and display names
 * Run: node prisma/update_client2_monogram.js
 */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const wedding = await prisma.wedding.findUnique({
    where: { slug: 'zuhaib-asfiya' },
    include: { couple: true }
  })

  if (!wedding || !wedding.couple) {
    console.error('Wedding not found!')
    process.exit(1)
  }

  await prisma.weddingCouple.update({
    where: { id: wedding.couple.id },
    data: {
      monogram: 'Z & A',
    }
  })

  console.log('✅ Client 2 monogram updated to Z & A')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
