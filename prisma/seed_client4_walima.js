const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * seed_client4_walima.js
 * Seeds Client 4 — Mohammed Mufassir & Iqra Bismi — Dawat-e-Valima
 * Template: walima (pastel Walima template)
 * Slug: mufassir-iqra-walima
 */
async function main() {
  // Find or create admin user
  let user = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@naqshdigital.in',
        password: 'NaqshAdmin2026!',
        name: 'Admin',
        role: 'SUPER_ADMIN',
      }
    });
  }

  // Idempotency — delete if exists
  const existing = await prisma.wedding.findUnique({ where: { slug: 'mufassir-iqra-walima' } });
  if (existing) {
    await prisma.wedding.delete({ where: { slug: 'mufassir-iqra-walima' } });
  }

  const wedding = await prisma.wedding.create({
    data: {
      slug: 'mufassir-iqra-walima',
      title: 'Mohammed Mufassir & Iqra Bismi — Dawat-e-Valima',
      templateId: 'walima',
      templateVersion: 1,
      status: 'PUBLISHED',
      userId: user.id,

      couple: {
        create: {
          brideName: 'Iqra Bismi',
          brideQualification: 'B.Com.',
          groomName: 'Mohammed Mufassir',
          groomQualification: 'B.Sc.',
          monogram: 'I & M',
          gregorianDate: new Date('2026-10-04T19:30:00.000+05:30'),
          gregorianDisplay: 'Sunday, 4th October 2026',
          islamicVerse: 'In the name of ALLAH the most beneficent & merciful',
          invitationMessage: 'With hearts full of gratitude, we warmly invite you to join us as we celebrate this blessed Walima occasion with the love, prayers, and duas of our families.',
        }
      },

      music: {
        create: {
          url: '/assets/audio/walima-mufassir-iqra.mp3',
          autoplay: true,
        }
      },

      family: {
        create: {
          // Groom's family (hosts)
          groomFather: 'Mrs. & Mr. Nawaz Ahmed',
          groomPaternalGrandfather: 'Late Janab Abdul Wahab Saheb',
          groomMaternalGrandfather: 'Late Janab Syed Yusuf Saheb',

          // Bride's family
          brideParents: 'Mrs. & Mr. Mohammed Asif Saheb',
          bridePaternalGrandfather: 'Janab Haji Abdul Rasheed Saheb',
          brideMaternalGrandfather: 'Late Janab Mohammed Ismail Shariff Saheb',

          // Invitation is from the groom's parents
          invitationFromName: 'Mrs. & Mr. Nawaz Ahmed',
          invitationFromOrg: '',
          invitationFromAddress: '',
          invitationFromPhone: '',
        }
      },

      events: {
        create: [
          {
            name: 'Dawat-e-Valima',
            type: 'VALIMA',
            date: new Date('2026-10-04T19:30:00.000+05:30'),
            timeDisplay: '7:30 PM onwards',
            description: 'Dinner reception celebrating the blessed union',
            venueName: 'Crown Pavilions-1',
            venueAddress: 'Race Ground, Gate No. 5, Near Mekhri Circle, Bellary Road, Bangalore',
            mapsUrl: 'https://maps.google.com/?q=Crown+Pavilions+Bangalore',
            order: 1,
            enabled: true,
          }
        ]
      },

      compliments: {
        create: []
      },

      rsvpConfig: {
        create: {
          enabled: false,
        }
      },

      seo: {
        create: {
          title: 'Dawat-e-Valima | Mohammed Mufassir & Iqra Bismi',
          description: 'You are cordially invited to the Dawat-e-Valima of Mohammed Mufassir & Iqra Bismi on Sunday, 4th October 2026 at Crown Pavilions-1, Bangalore.',
          keywords: 'Walima, Valima, Mohammed Mufassir, Iqra Bismi, Nawaz Ahmed, Crown Pavilions Bangalore',
        }
      }
    }
  });

  console.log('✅ Successfully seeded Client 4 Walima wedding:', wedding.slug);
  console.log('   Template: walima');
  console.log('   Couple: Mohammed Mufassir & Iqra Bismi');
  console.log('   Event: Dawat-e-Valima — Sunday 4th October 2026');
  console.log('   Venue: Crown Pavilions-1, Bangalore');
  console.log('   URL preview: http://localhost:3000/w/mufassir-iqra-walima');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
