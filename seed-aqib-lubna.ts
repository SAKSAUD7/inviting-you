import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Get or create a user
  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin',
        role: 'SUPER_ADMIN'
      }
    })
  }

  // 2. Create the Wedding record
  const slug = 'aqib-weds-lubna'
  
  // Clean up if it already exists
  const existing = await prisma.wedding.findUnique({ where: { slug } })
  if (existing) {
    await prisma.wedding.delete({ where: { slug } })
  }

  const wedding = await prisma.wedding.create({
    data: {
      slug,
      title: 'Aqib Weds Lubna',
      templateId: 'velvet',
      templateVersion: 1,
      status: 'PUBLISHED',
      userId: user.id,
      
      couple: {
        create: {
          groomName: 'Mohammed Aqhib',
          groomQualification: 'Electrical Contractor, M.A. Electricals',
          brideName: 'Lubna',
          brideQualification: 'B.Com',
          gregorianDate: new Date('2026-10-16T00:00:00Z'),
          gregorianDisplay: '16 October 2026',
          islamicVerse: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          monogram: 'A&L',
        }
      },
      
      family: {
        create: {
          groomPaternalGrandfather: 'Late Alhaj B.M. Mahboob Shariff Saheb',
          groomMaternalGrandfather: 'Late Aftab Ali Khan Saheb',
          groomFather: 'Mrs. & Mr. Khaiser Pasha (Retd. Qatar Armed Force)',
          bridePaternalGrandfather: 'Late Janab Abdul Azeez Saheb',
          brideMaternalGrandfather: 'Late Janab J.M. Habeeb Saheb',
          brideParents: 'Mrs. & Mr. Mohammed Saleem',
          invitationFromName: 'Mr. Khaiser Pasha & Mrs. Nishad Begum',
          invitationFromAddress: '16/1, 9th Cross, Ground Floor, Motinagar, Adi Kabeer Ashram Road, Mattadahalli, R.T. Nagar Post, Bangalore - 32',
          invitationFromPhone: '9066682375',
        }
      },

      events: {
        create: [
          {
            name: 'Mehfil-e-Nikah',
            type: 'NIKAH',
            date: new Date('2026-10-16T17:30:00Z'), // Friday
            timeDisplay: 'After Namaz-e-Asar, 5:30 PM onwards',
            venueName: 'Modi Masjid',
            venueAddress: 'Queens Road, Bangalore - 560 051',
            mapsUrl: 'https://share.google/DKvZe4E9lNbQ2G11B',
            order: 1,
            enabled: true,
          },
          {
            name: 'Dawat-e-Valima',
            type: 'VALIMA',
            date: new Date('2026-10-17T20:00:00Z'), // Saturday
            timeDisplay: '8:00 PM onwards (Dinner)',
            venueName: 'CMA. Grand Convention & Wedding Hall',
            venueAddress: '#19, Bazar Street, Nagwara Main Road, Opp. Lababeen Masjid, Beside Prestige Glass Factory, K.G. Halli, Bangalore - 45',
            mapsUrl: 'https://share.google/wo3PeIAGNAJnSmfNZ',
            order: 2,
            enabled: true,
          }
        ]
      },

      compliments: {
        create: [
          { name: 'Relatives & Friends', order: 1 }
        ]
      },

      music: {
        create: {
          url: '/assets/audio/aman-tazeen-nasheed.mp3',
          title: 'Nasheed',
          autoplay: true
        }
      },

      seo: {
        create: {
          title: 'Aqhib & Lubna - Wedding Invitation',
          description: 'We request the honour of your presence at the Nikah & Valima of Mohammed Aqhib and Lubna.',
          ogImage: '/assets/images/velvet-hero-poster.webp'
        }
      }
    }
  })

  console.log(`Created wedding: ${wedding.slug}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
