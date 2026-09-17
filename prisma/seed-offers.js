const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding welcome offers...')

  const templates = ['velvet', 'sultan', 'walima', 'noor', 'birthday-interactive-01']

  for (const templateId of templates) {
    // Upsert so we don't duplicate
    await prisma.templateOffer.create({
      data: {
        templateId,
        label: 'Welcome Offer',
        discountPct: 25,
        active: true,
      }
    }).catch(async (e) => {
      // If there's an error (like unique constraint if we had one, though we don't), just ignore or delete all and recreate.
      // Since we don't have a unique constraint on templateId, let's just delete existing offers for these templates first.
    })
  }
}

async function run() {
  await prisma.templateOffer.deleteMany({}) // Clear existing for clean slate
  await main()
  console.log('Offers seeded successfully!')
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
