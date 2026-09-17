const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding demo templates...')

  // Ensure a dummy admin user exists for these demos
  let adminUser = await prisma.user.findFirst()
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: 'demo@invitingyou.com',
        password: 'hash_not_needed_for_seed',
        name: 'Demo Admin',
      }
    })
  }

  // 1. Velvet
  await prisma.wedding.upsert({
    where: { slug: 'demo-velvet' },
    update: {},
    create: {
      slug: 'demo-velvet',
      title: 'Aisha & Omar',
      templateId: 'velvet',
      status: 'PUBLISHED',
      userId: adminUser.id,
      couple: {
        create: {
          brideName: 'Aisha',
          groomName: 'Omar',
          gregorianDate: new Date('2024-12-25T00:00:00Z'),
          gregorianDisplay: '25th December 2024',
          hijriDate: '15th Jumada Al-Akhirah 1446',
          invitationMessage: 'Together with our families, we joyfully invite you to celebrate our union.',
        }
      }
    }
  })

  // 2. Sultan
  await prisma.wedding.upsert({
    where: { slug: 'demo-sultan' },
    update: {},
    create: {
      slug: 'demo-sultan',
      title: 'Zara & Zain',
      templateId: 'sultan',
      status: 'PUBLISHED',
      userId: adminUser.id,
      couple: {
        create: {
          brideName: 'Zara',
          groomName: 'Zain',
          gregorianDate: new Date('2025-01-10T00:00:00Z'),
          gregorianDisplay: '10th January 2025',
          hijriDate: '1st Rajab 1446',
          invitationMessage: 'We request the honor of your presence as we begin our new journey together.',
        }
      }
    }
  })

  // 3. Petal (Walima)
  await prisma.wedding.upsert({
    where: { slug: 'demo-petal' },
    update: {},
    create: {
      slug: 'demo-petal',
      title: 'Fatima & Ali',
      templateId: 'walima',
      status: 'PUBLISHED',
      userId: adminUser.id,
      couple: {
        create: {
          brideName: 'Fatima',
          groomName: 'Ali',
          gregorianDate: new Date('2025-02-14T00:00:00Z'),
          gregorianDisplay: '14th February 2025',
          invitationMessage: 'Join us for a beautiful Walima evening under the stars.',
        }
      }
    }
  })

  // 4. Noor
  await prisma.wedding.upsert({
    where: { slug: 'demo-noor' },
    update: {},
    create: {
      slug: 'demo-noor',
      title: 'Sana & Bilal',
      templateId: 'noor',
      status: 'PUBLISHED',
      userId: adminUser.id,
      couple: {
        create: {
          brideName: 'Sana',
          groomName: 'Bilal',
          gregorianDate: new Date('2025-03-20T00:00:00Z'),
          gregorianDisplay: '20th March 2025',
          invitationMessage: 'We joyfully invite you to share in our happiness.',
        }
      }
    }
  })

  // 5. Birthday
  await prisma.wedding.upsert({
    where: { slug: 'demo-birthday' },
    update: {},
    create: {
      slug: 'demo-birthday',
      title: "Zaid's 5th Birthday",
      templateId: 'birthday-interactive-01',
      status: 'PUBLISHED',
      userId: adminUser.id,
      birthday: {
        create: {
          birthdayPersonName: 'Zaid',
          age: 5,
          birthdayDate: new Date('2025-05-01T00:00:00Z'),
          senderName: 'Mom & Dad',
          headline: "Look who's turning 5!",
          introMessage: "Join us for a magical evening of games and cake.",
        }
      }
    }
  })

  console.log('Demo templates seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
