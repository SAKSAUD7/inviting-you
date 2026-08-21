const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Client 3: Asfiya & Zuhaib...')

  // Get or create the admin user to attach the wedding to
  let adminUser = await prisma.user.findFirst({ where: { email: 'admin@naqshdigital.in' } })
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: { email: 'admin@naqshdigital.in', name: 'Admin', role: 'SUPER_ADMIN', password: 'placeholder' },
    })
  }

  // Delete if exists (re-runnable)
  const existing = await prisma.wedding.findUnique({ where: { slug: 'asfiya-zuhaib' } })
  if (existing) {
    await prisma.wedding.delete({ where: { id: existing.id } })
  }

  // Create Client 3
  const wedding = await prisma.wedding.create({
    data: {
      slug: 'client3-asfiya-zuhaib',
      title: 'Syeda Asfiya Ishaq & Mohammed Zuhaib',
      templateId: 'noor',
      status: 'PUBLISHED',
      userId: adminUser.id,
      publishedAt: new Date(),

      seo: {
        create: {
          title: 'Asfiya & Zuhaib Wedding Invitation',
          description: 'You are warmly invited to the wedding of Syeda Asfiya Ishaq and Mohammed Zuhaib.',
        },
      },

      couple: {
        create: {
          brideName: 'Syeda Asfiya Ishaq',
          brideQualification: 'B.Tech',
          groomName: 'Mohammed Zuhaib',
          groomQualification: 'B.Tech',
          gregorianDate: new Date('2026-10-22'),
          gregorianDisplay: 'THURSDAY\n22\nOCTOBER\n2026',
          hijriDate: '10th Jamadi-ul-Awwal 1448H',
          islamicVerse: 'In the Name of Allah\nthe Most Gracious the Most Merciful',
          invitationMessage: 'Request the honour of your gracious presence at the Nikah Ceremony of their beloved daughter',
        },
      },

      family: {
        create: {
          brideParents: 'Mrs. & Mr. Syed Ishaq',
          bridePaternalGrandfather: 'Late Syed Mahaboob Saheb',
          brideMaternalGrandfather: 'Janab Shaik Humayun Saheb',
          groomFather: 'Mrs. & Mr. Ayaz Pasha',
          groomPaternalGrandfather: 'Late B.S Mohammed Zameer Saheb',
          groomMaternalGrandfather: 'Late K. Abdul Samad Saheb',
          invitationFromName: 'Mrs. & Mr. Syed Ishaq',
          invitationFromOrg: '',
          invitationFromAddress: '',
          invitationFromPhone: '',
        },
      },

      events: {
        create: [
          {
            name: 'Mehfil-e-Nikah',
            type: 'NIKAH',
            date: new Date('2026-10-22'),
            timeDisplay: 'After Namaz-e-Asar',
            description: '',
            venueName: 'Masjid-Al-Nur',
            venueAddress: 'Dickenson Road\nBangalore – 560042',
            mapsUrl: '',
            order: 1,
            enabled: true,
          },
          {
            name: 'Dinner',
            type: 'RECEPTION',
            date: new Date('2026-10-22'),
            timeDisplay: '8:00 p.m. onwards',
            description: '',
            venueName: 'Star Palace',
            venueAddress: 'Opp. Elements Mall\nThanisandra Main Road\nBangalore 560077',
            mapsUrl: '',
            order: 2,
            enabled: true,
          },
        ],
      },

      music: {
        create: {
          title: 'Soothing Nasheed',
          url: '/assets/audio/velvet-bgm.mp3', // Reusing the track provided for now
          autoplay: true,
        },
      },

      rsvpConfig: {
        create: {
          enabled: true,
          message: 'We would be honoured by your presence. Please let us know if you can attend.',
        },
      },
    },
  })

  console.log(`Created Client 3 successfully! URL: /i/${wedding.slug}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
