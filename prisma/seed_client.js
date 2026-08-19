const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Try to find the admin user or create one
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

  // Delete existing wedding if exists for idempotency
  const existing = await prisma.wedding.findUnique({ where: { slug: 'iqra-mufassir' } });
  if (existing) {
    await prisma.wedding.delete({ where: { slug: 'iqra-mufassir' } });
  }

  const wedding = await prisma.wedding.create({
    data: {
      slug: 'iqra-mufassir',
      title: 'Iqra & Mohammed Mufassir',
      templateId: 'velvet',
      status: 'PUBLISHED',
      userId: user.id,
      couple: {
        create: {
          brideName: 'Iqra Bismi',
          brideQualification: 'B.Com',
          groomName: 'Mohammed Mufassir',
          groomQualification: 'B.Sc',
          monogram: 'I & M',
          gregorianDate: new Date('2026-10-02T17:00:00.000+05:30'),
          gregorianDisplay: 'Friday, 2 October 2026',
          hijriDate: '20th Jamadu Al Awal 1448 Hijri',
          islamicVerse: 'In The Name Of Allah\nThe Most Beneficent & The Most Merciful\n\nINSHA ALLAH\nMehfil-e-Nikah',
          invitationMessage: 'With hearts full of gratitude, we warmly invite you to join us as we celebrate this beautiful beginning with the love, prayers, and blessings of our families.',
        }
      },
      family: {
        create: {
          brideParents: 'Mrs. & Mr. Mohammed Asif',
          bridePaternalGrandfather: 'Janab Haji Abdul Rasheed Saheb',
          brideMaternalGrandfather: 'Late Janab Mohammed Ismail Shariff Saheb',
          groomFather: 'Nawaz Ahmed',
          groomPaternalGrandfather: 'Late Janab Abdul Wahab Saheb',
          groomMaternalGrandfather: 'Late Janab Syed Yusuf Saheb',
          invitationFromName: 'Mrs. & Mr. Mohammed Asif',
          invitationFromOrg: 'New Unique Collection',
          invitationFromAddress: 'Diamond Plaza\nCommercial Street\nShivajinagar\nBangalore',
          invitationFromPhone: '9739700723',
        }
      },
      events: {
        create: [
          {
            name: 'Nikah',
            type: 'NIKAH',
            date: new Date('2026-10-02T17:00:00.000+05:30'),
            timeDisplay: '5:00 PM',
            description: 'After Namaz-e-Asar',
            venueName: 'Khadriya Masjid',
            venueAddress: 'Millers Road, Benson Town, Bangalore',
            mapsUrl: 'https://maps.google.com/?q=Khadriya+Masjid',
            order: 1,
            enabled: true,
          },
          {
            name: 'Dinner',
            type: 'RECEPTION',
            timeDisplay: '8:00 PM onwards',
            venueName: 'CMA Royal',
            venueAddress: '#72/1, Thanisandra Main Road\nNear Uqba Masjid\nNear Elements Mall\nBengaluru – 560077',
            mapsUrl: 'https://maps.google.com/?q=CMA+Royal+Bengaluru',
            order: 2,
            enabled: true,
          }
        ]
      },
      compliments: {
        create: [
          { name: 'Alhaj Mohammed Shafiq & Sons', order: 1 },
          { name: 'Shaik Mahmood & Sons', order: 2 },
          { name: 'Mohammed Jaber Saheb', order: 3 },
          { name: 'Mohammed Javeed Saheb', order: 4 },
          { name: 'Haji Dr. Roshan Zameer Saheb', order: 5 },
          { name: 'Mohammed Rafiulla', order: 6 },
          { name: 'Aasim Khan', order: 7 },
          { name: 'Mohammed Dastagir Shariff', order: 8 },
          { name: 'Brothers, Relatives & Friends', order: 9 },
        ]
      },
      rsvpConfig: {
        create: {
          enabled: true,
        }
      }
    }
  });

  console.log('Successfully seeded wedding:', wedding.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
