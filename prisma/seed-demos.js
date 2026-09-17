// prisma/seed-demos.js
// Seeds fictional demo invitations for each live template.
// Run: node prisma/seed-demos.js
// Safe to re-run — uses upsert (will not duplicate).

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAdminUserId() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  if (admin) return admin.id
  const created = await prisma.user.create({
    data: {
      email: 'admin@invitingyou.in',
      password: 'change-me',
      name: 'Studio Admin',
      role: 'ADMIN',
    },
  })
  return created.id
}

const demos = [
  {
    slug: 'demo-velvet',
    title: 'Zara & Aryan — Demo (Velvet)',
    templateId: 'velvet',
    templateVersion: 1,
    couple: {
      brideName: 'Zara',
      groomName: 'Aryan',
      gregorianDate: new Date('2025-03-15T00:00:00Z'),
      gregorianDisplay: 'Saturday, 15th March 2025',
      hijriDate: '14 Ramadan 1446',
      islamicVerse: 'And He placed between you affection and mercy. — Quran 30:21',
      invitationMessage: 'With grateful hearts and deep joy, we invite you to share in the blessed union of our children.',
      monogram: 'ZA',
    },
    family: {
      brideParents: 'Mr. & Mrs. Rashid Khan',
      groomFather: 'Mr. Vikram Mehta',
      groomPaternalGrandfather: 'Late Mr. Rajesh Mehta',
      invitationFromName: 'The Khan & Mehta Families',
      invitationFromAddress: 'Hyderabad, Telangana',
    },
    events: [
      { name: 'Nikah Ceremony', type: 'NIKAH', date: new Date('2025-03-15T10:00:00Z'), timeDisplay: '10:00 AM', venueName: 'Grand Mosque Hall', venueAddress: 'Jubilee Hills, Hyderabad', mapsUrl: 'https://maps.google.com', order: 0 },
      { name: 'Wedding Reception', type: 'RECEPTION', date: new Date('2025-03-15T19:00:00Z'), timeDisplay: '7:00 PM onwards', venueName: 'The Taj Falaknuma Palace', venueAddress: 'Engine Bowli, Hyderabad', mapsUrl: 'https://maps.google.com', order: 1 },
    ],
  },
  {
    slug: 'demo-noor',
    title: 'Amira & Hassan — Demo (Noor)',
    templateId: 'noor',
    templateVersion: 1,
    couple: {
      brideName: 'Amira',
      groomName: 'Hassan',
      gregorianDate: new Date('2025-04-20T00:00:00Z'),
      gregorianDisplay: 'Sunday, 20th April 2025',
      hijriDate: '21 Shawwal 1446',
      islamicVerse: 'And of His signs is that He created for you mates. — Quran 30:21',
      invitationMessage: 'In the name of Allah, Most Gracious. We joyfully invite you to celebrate with us.',
      monogram: 'AH',
    },
    family: {
      brideParents: 'Mr. & Mrs. Farooq Ahmed',
      groomFather: 'Mr. Yusuf Al-Hassan',
      invitationFromName: 'The Ahmed & Al-Hassan Families',
      invitationFromAddress: 'Bangalore, Karnataka',
    },
    events: [
      { name: 'Nikah', type: 'NIKAH', date: new Date('2025-04-20T11:00:00Z'), timeDisplay: '11:00 AM', venueName: 'Masjid Al-Noor', venueAddress: 'Shivajinagar, Bangalore', mapsUrl: 'https://maps.google.com', order: 0 },
      { name: 'Walima Celebration', type: 'WALIMA', date: new Date('2025-04-21T19:30:00Z'), timeDisplay: '7:30 PM', venueName: 'ITC Windsor', venueAddress: 'Sankey Road, Bangalore', mapsUrl: 'https://maps.google.com', order: 1 },
    ],
  },
  {
    slug: 'demo-sultan',
    title: 'Fatima & Khalid — Demo (Sultan)',
    templateId: 'sultan',
    templateVersion: 1,
    couple: {
      brideName: 'Fatima',
      groomName: 'Khalid',
      gregorianDate: new Date('2025-02-14T00:00:00Z'),
      gregorianDisplay: 'Friday, 14th February 2025',
      hijriDate: "15 Sha'ban 1446",
      islamicVerse: 'He created for you mates from yourselves. — Quran 30:21',
      invitationMessage: 'With the blessings of Allah SWT, we proudly announce the union of our beloved children.',
      monogram: 'FK',
    },
    family: {
      brideParents: 'Dr. & Mrs. Abdullah Al-Farsi',
      groomFather: 'Mr. Khalid Al-Mansouri Sr.',
      groomPaternalGrandfather: 'Late Sheikh Al-Mansouri',
      invitationFromName: 'The Al-Farsi & Al-Mansouri Families',
      invitationFromAddress: 'Mumbai, Maharashtra',
    },
    events: [
      { name: 'Royal Nikah', type: 'NIKAH', date: new Date('2025-02-14T10:00:00Z'), timeDisplay: '10:00 AM', venueName: 'The Oberoi, Mumbai', venueAddress: 'Nariman Point, Mumbai', mapsUrl: 'https://maps.google.com', order: 0 },
      { name: 'Grand Reception', type: 'RECEPTION', date: new Date('2025-02-14T20:00:00Z'), timeDisplay: '8:00 PM', venueName: 'The Grand Ballroom', venueAddress: 'The Oberoi, Mumbai', mapsUrl: 'https://maps.google.com', order: 1 },
    ],
  },
  {
    slug: 'demo-petal',
    title: 'Layla & Idris — Demo (Petal)',
    templateId: 'walima',
    templateVersion: 1,
    couple: {
      brideName: 'Layla',
      groomName: 'Idris',
      gregorianDate: new Date('2025-05-10T00:00:00Z'),
      gregorianDisplay: 'Saturday, 10th May 2025',
      hijriDate: '12 Dhul Qadah 1446',
      islamicVerse: 'And We created you in pairs. — Quran 78:8',
      invitationMessage: 'Together with our families, we invite you to celebrate our Walima with love and gratitude.',
      monogram: 'LI',
    },
    family: {
      brideParents: 'Mr. & Mrs. Tariq Siddiqui',
      groomFather: 'Mr. Ibrahim Malik',
      invitationFromName: 'The Siddiqui & Malik Families',
      invitationFromAddress: 'Pune, Maharashtra',
    },
    events: [
      { name: 'Walima Reception', type: 'WALIMA', date: new Date('2025-05-10T18:00:00Z'), timeDisplay: '6:00 PM', venueName: 'The Ritz-Carlton, Pune', venueAddress: 'Bund Garden Road, Pune', mapsUrl: 'https://maps.google.com', order: 0 },
    ],
  },
  {
    slug: 'demo-birthday',
    title: "Aisha's 25th Birthday — Demo",
    templateId: 'birthday-interactive-01',
    templateVersion: 1,
    birthday: {
      birthdayPersonName: 'Aisha',
      age: 25,
      birthdayDate: new Date('2025-06-15T00:00:00Z'),
      senderName: 'Your Family & Friends',
      headline: 'Happy 25th, Aisha! 🎉',
      introMessage: 'Twenty-five years of sunshine, laughter, and making every room brighter. Today we celebrate YOU!',
      questionText: 'Pop a balloon to reveal your birthday surprises!',
      balloons: 4,
      balloonRevealWords: ['Love', 'Joy', 'Dreams', 'Magic'],
      bouquetMessages: ['For your infectious smile', 'For your kind heart', 'For making every moment special', 'For being our sunshine'],
      bouquetReasons: ['You make everyone around you feel loved', 'Your laugh is the best sound in the world', 'You never give up on what you believe in', 'You bring out the best in everyone'],
      birthdayMessage: "May this year bring you everything your beautiful heart desires. Here's to 25 more years of adventures, laughter, and love. We are so proud of the incredible person you are!",
      signature: 'With all our love ❤️',
      finalMessage: 'See you at the party! 🎊',
      theme: 'dark',
    },
  },
]

async function main() {
  const userId = await getAdminUserId()
  console.log(`Using admin: ${userId}`)

  for (const demo of demos) {
    console.log(`\nSeeding ${demo.slug}...`)
    const wedding = await prisma.wedding.upsert({
      where: { slug: demo.slug },
      update: { status: 'PUBLISHED', publishedAt: new Date() },
      create: { slug: demo.slug, title: demo.title, templateId: demo.templateId, templateVersion: demo.templateVersion, status: 'PUBLISHED', publishedAt: new Date(), userId },
    })
    if (demo.couple) {
      await prisma.weddingCouple.upsert({ where: { weddingId: wedding.id }, update: demo.couple, create: { weddingId: wedding.id, ...demo.couple } })
    }
    if (demo.family) {
      await prisma.weddingFamily.upsert({ where: { weddingId: wedding.id }, update: demo.family, create: { weddingId: wedding.id, ...demo.family } })
    }
    if (demo.events?.length) {
      await prisma.weddingEvent.deleteMany({ where: { weddingId: wedding.id } })
      await prisma.weddingEvent.createMany({ data: demo.events.map(e => ({ ...e, weddingId: wedding.id })) })
    }
    if (demo.birthday) {
      await prisma.birthdayConfig.upsert({ where: { weddingId: wedding.id }, update: demo.birthday, create: { weddingId: wedding.id, ...demo.birthday } })
    }
    await prisma.rSVPConfig.upsert({ where: { weddingId: wedding.id }, update: {}, create: { weddingId: wedding.id, enabled: false, whatsapp: '917411091256' } })
    const name = demo.couple ? `${demo.couple.brideName} & ${demo.couple.groomName}` : demo.birthday?.birthdayPersonName ?? 'Demo'
    await prisma.weddingSEO.upsert({ where: { weddingId: wedding.id }, update: {}, create: { weddingId: wedding.id, title: `${name} — Inviting You`, description: 'Demo invitation by Inviting You. Premium digital invitations.' } })
    console.log(`  ✅ ${demo.slug} done.`)
  }
  console.log('\n🎉 All demos seeded!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
