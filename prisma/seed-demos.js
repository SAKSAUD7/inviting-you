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
      visibility: 'PUBLIC_DEMO',
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
    update: {
      title: 'Ayaan & Zara',
      couple: {
        update: {
          brideName: 'Zara Ali',
          brideQualification: 'Architect',
          groomName: 'Ayaan Khan',
          groomQualification: 'Software Engineer',
          couplePhoto: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4432?q=80&w=800&auto=format&fit=crop',
          groomPhoto: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
          bridePhoto: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4432?q=80&w=800&auto=format&fit=crop',
          gregorianDate: new Date('2025-07-12T00:00:00Z'),
          gregorianDisplay: '12th July 2025',
          hijriDate: '16th Muharram 1447',
          invitationMessage: '"Together by His Grace" — We request the honor of your presence as two families unite in love.',
        }
      },
      family: {
        update: {
          groomFather: 'Mr. Imran Khan\n& Mrs. Farah Khan',
          brideParents: 'Mr. Salman Ali\n& Mrs. Saba Ali',
        }
      },
    },
    create: {
      slug: 'demo-sultan',
      title: 'Ayaan & Zara',
      templateId: 'sultan',
      visibility: 'PUBLIC_DEMO',
      status: 'PUBLISHED',
      userId: adminUser.id,
      couple: {
        create: {
          brideName: 'Zara Ali',
          brideQualification: 'Architect',
          groomName: 'Ayaan Khan',
          groomQualification: 'Software Engineer',
          couplePhoto: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4432?q=80&w=800&auto=format&fit=crop',
          groomPhoto: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
          bridePhoto: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4432?q=80&w=800&auto=format&fit=crop',
          gregorianDate: new Date('2025-07-12T00:00:00Z'),
          gregorianDisplay: '12th July 2025',
          hijriDate: '16th Muharram 1447',
          invitationMessage: '"Together by His Grace" — We request the honor of your presence as two families unite in love.',
        }
      },
      family: {
        create: {
          groomFather: 'Mr. Imran Khan\n& Mrs. Farah Khan',
          brideParents: 'Mr. Salman Ali\n& Mrs. Saba Ali',
        }
      },
      events: {
        create: [
          {
            name: 'The Nikah Ceremony',
            type: 'nikah',
            date: '2025-07-10T05:00:00Z',
            timeDisplay: '10:30 AM onwards',
            description: 'Join us for the solemnization of our marriage.',
            venueName: 'Grand Mosque Hall',
            venueAddress: 'Bangalore, Karnataka',
            mapsUrl: 'https://maps.google.com',
            order: 1,
            enabled: true
          },
          {
            name: 'The Walima Reception',
            type: 'walima',
            date: '2025-07-12T13:30:00Z',
            timeDisplay: '7:00 PM onwards',
            description: 'An evening of love, blessings and togetherness.',
            venueName: 'The Grand Palace',
            venueAddress: 'Bangalore, Karnataka',
            mapsUrl: 'https://maps.google.com',
            order: 2,
            enabled: true
          }
        ]
      },
      gallery: {
        create: [
          { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4432?q=80&w=800&auto=format&fit=crop', isCover: true, order: 1 },
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', isCover: false, order: 2 },
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', isCover: false, order: 3 },
          { url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop', isCover: false, order: 4 },
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop', isCover: false, order: 5 },
          { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop', isCover: false, order: 6 },
          { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', isCover: false, order: 7 },
        ]
      },
      rsvpConfig: {
        create: {
          enabled: true,
          whatsapp: '919876543210',
          deadline: '2025-07-05T00:00:00Z'
        }
      },
      music: {
        create: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          title: 'Royal Arrival',
          autoplay: false
        }
      },
      compliments: {
        create: [
          { name: 'Relatives & Friends', order: 1 },
          { name: 'The Ali Family', order: 2 },
          { name: 'The Khan Family', order: 3 }
        ]
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
      visibility: 'PUBLIC_DEMO',
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
      visibility: 'PUBLIC_DEMO',
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
      visibility: 'PUBLIC_DEMO',
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
