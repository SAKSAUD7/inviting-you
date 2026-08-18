import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with Iqra & Mufassir wedding data...')

  // Clean up existing data
  await prisma.wedding.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@naqshdigital.in',
      password: 'hashed_password_here', // In production, we will use bcrypt in the auth flow
      name: 'Naqsh Admin',
      role: 'SUPER_ADMIN',
    },
  })

  // Create Wedding
  const wedding = await prisma.wedding.create({
    data: {
      slug: 'iqra-mufassir',
      title: 'Iqra & Mohammed Mufassir',
      templateId: 'velvet',
      status: 'PUBLISHED',
      userId: admin.id,
      publishedAt: new Date(),
    },
  })

  // Create Couple
  await prisma.weddingCouple.create({
    data: {
      weddingId: wedding.id,
      brideName: 'Iqra Bismi',
      brideQualification: 'B.Com',
      groomName: 'Mohammed Mufassir',
      groomQualification: 'B.Sc',
      gregorianDate: new Date('2026-10-02T17:00:00Z'),
      gregorianDisplay: 'Friday, 2 October 2026',
      hijriDate: '20th Jamadu Al Awal 1448 Hijri',
      islamicVerse: 'In The Name Of Allah\nThe Most Beneficent & The Most Merciful',
      invitationMessage: 'With hearts full of gratitude, we warmly invite you to join us as we celebrate this beautiful beginning with the love, prayers, and blessings of our families.',
    },
  })

  // Create Family
  await prisma.weddingFamily.create({
    data: {
      weddingId: wedding.id,
      brideParents: 'Mrs. & Mr. Mohammed Asif',
      bridePaternalGrandfather: 'Janab Haji Abdul Rasheed Saheb',
      brideMaternalGrandfather: 'Late Janab Mohammed Ismail Shariff Saheb',
      groomFather: 'Nawaz Ahmed',
      groomPaternalGrandfather: 'Late Janab Abdul Wahab Saheb',
      groomMaternalGrandfather: 'Late Janab Syed Yusuf Saheb',
      invitationFromName: 'Mrs. & Mr. Mohammed Asif',
      invitationFromOrg: 'New Unique Collection',
      invitationFromAddress: 'Diamond Plaza, Commercial Street, Shivajinagar, Bangalore',
      invitationFromPhone: '9739700723',
    },
  })

  // Create Events
  await prisma.weddingEvent.createMany({
    data: [
      {
        weddingId: wedding.id,
        name: 'INSHA ALLAH Mehfil-e-Nikah',
        type: 'NIKAH',
        date: new Date('2026-10-02T17:00:00Z'),
        timeDisplay: '5:00 PM',
        description: 'After Namaz-e-Asar',
        venueName: 'Khadriya Masjid',
        venueAddress: 'Millers Road, Benson Town, Bangalore',
        mapsUrl: 'https://goo.gl/maps/placeholder1',
        order: 1,
      },
      {
        weddingId: wedding.id,
        name: 'Dinner',
        type: 'RECEPTION',
        date: new Date('2026-10-02T20:00:00Z'),
        timeDisplay: '8:00 PM onwards',
        venueName: 'CMA Royal',
        venueAddress: '#72/1, Thanisandra Main Road, Near Uqba Masjid, Near Elements Mall, Bengaluru – 560077',
        mapsUrl: 'https://goo.gl/maps/placeholder2',
        order: 2,
      },
    ],
  })

  // Create RSVP Config
  await prisma.rSVPConfig.create({
    data: {
      weddingId: wedding.id,
      enabled: true,
      message: 'Will you celebrate with us?',
    },
  })

  // Create SEO Config
  await prisma.weddingSEO.create({
    data: {
      weddingId: wedding.id,
      title: 'Iqra & Mohammed Mufassir - Nikah Invitation',
      description: 'You are warmly invited to the Nikah ceremony of Iqra Bismi and Mohammed Mufassir on Friday, 2nd October 2026.',
    },
  })

  console.log('Successfully seeded database.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
