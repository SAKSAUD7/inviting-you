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
  const slug = 'aqhib-weds-lubna-noor'
  
  // Clean up if it already exists
  const existing = await prisma.wedding.findUnique({ where: { slug } })
  if (existing) {
    await prisma.wedding.delete({ where: { slug } })
  }

  const wedding = await prisma.wedding.create({
    data: {
      slug,
      title: 'Aqhib & Lubna (Nikah Only)',
      templateId: 'noor',
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
          islamicVerse: 'ENGLISH_ONLY',
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
            name: 'Dinner of Nikah',
            type: 'CUSTOM',
            date: new Date('2026-10-16T19:30:00Z'), // Friday evening
            timeDisplay: '7:30 PM onwards',
            venueName: 'Dilshad Paradise',
            venueAddress: '326, 3rd Main Rd, 1st Block, Ganganagar, Rahmath Nagar, RT Nagar, Bengaluru, Karnataka 560032',
            mapsUrl: 'https://share.google/FZZx7DlvJeWZGcldu',
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
          title: 'Aqhib & Lubna - Nikah Invitation',
          description: 'We request the honour of your presence at the Nikah & Dinner of Mohammed Aqhib and Lubna.',
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
