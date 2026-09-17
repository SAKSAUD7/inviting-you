const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Client 6: Yousuf & Tazeen Valima Only (Velvet Template)...')

  // Get or create the admin user
  let adminUser = await prisma.user.findFirst({ where: { email: 'admin@naqshdigital.in' } })
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: { email: 'admin@naqshdigital.in', name: 'Admin', role: 'SUPER_ADMIN', password: 'placeholder' },
    })
  }

  // Delete if exists (re-runnable) — handle both old and new slugs
  for (const slugToDelete of ['Aman-weds-Tazeen-Valima', 'Aman-weds-Tazeen-Reception']) {
    const existing = await prisma.wedding.findUnique({ where: { slug: slugToDelete } })
    if (existing) await prisma.wedding.delete({ where: { id: existing.id } })
  }

  // ──────────────────────────────────────────────────────────────────────
  // INVITATION DATA
  //
  // GROOM: Alhaj Mohammed Yousuf Aman Arif, B.Tech, ISB Alum
  //   Parents:  Mohammed Ajmal Ariff & Fazeelath Afza
  //   Paternal: Late Mrs. Shahtaj Begum & Late Mr. K.F. Ariff
  //   Maternal: Mrs. Zeenath Khanum & Late Mr. Syed Md. Hamid
  //
  // BRIDE: Syed Tazeen, B.Com
  //   Parents:  Syed Basha Mohiuddin & Syed Parveen
  //   Paternal: Late Mrs. Syed Khursheed Begum & Late Mr. Syed Ahamed
  //   Maternal: Mrs. M. Begum & Late Mr. N Maqbool Basha
  //
  // Events:
  //   1. Nikah      – Tue 17 Nov 2026, 4:00 PM
  //   2. Reception  – Tue 17 Nov 2026, 7:00 PM onwards (followed by dinner)
  //
  // Venue: Royal Tripura Vasini, Gate No. 3, Palace Grounds, Bengaluru 560080
  // ──────────────────────────────────────────────────────────────────────

  const wedding = await prisma.wedding.create({
    data: {
      slug: 'Aman-weds-Tazeen-Reception',
      title: 'Mohammed Yousuf Aman Arif & Syed Tazeen',
      templateId: 'velvet',
      status: 'PUBLISHED',
      userId: adminUser.id,
      publishedAt: new Date(),

      seo: {
        create: {
          title: 'Aman weds Tazeen | Reception',
          description: 'You are warmly invited to the Reception of Mohammed Yousuf Aman Arif & Syed Tazeen on Tuesday, 17th November 2026 at Royal Tripura Vasini, Palace Grounds, Bengaluru.',
        },
      },

      couple: {
        create: {
          // Groom listed first per the physical card convention
          groomName: 'Mohammed Yousuf Aman Arif',
          groomQualification: 'B.Tech, ISB Alum',
          brideName: 'Syed Tazeen',
          brideQualification: 'B.Com',
          // Monogram: A (Aman) & T (Tazeen) — used for the opening mark
          monogram: 'A & T',
          gregorianDate: new Date('2026-11-17'),
          // Used as the date-hint in VelvetOpening and footer
          gregorianDisplay: 'Tuesday, 17th November 2026',
          hijriDate: null,
          islamicVerse: null,
          // Shown in VelvetWelcome as the main body paragraph
          invitationMessage:
            'Mr. Mohammed Ajmal Ariff & Mrs. Fazeelath Afza and Mr. Syed Basha Mohiuddin & Mrs. Syed Parveen solicit your gracious presence with family and friends on the auspicious occasion of the wedding of their children.',
        },
      },

      family: {
        create: {
          // ── BRIDE (Syed Tazeen) ──
          // Shown as "Daughter of [brideParents]" in VelvetOpening hero
          brideParents: 'Mr. Syed Basha Mohiuddin & Mrs. Syed Parveen',
          // Shown as "Paternal Grand D/o. [...]"
          bridePaternalGrandfather: 'Late Mrs. Syed Khursheed Begum & Late Mr. Syed Ahamed',
          // Shown as "Maternal Grand D/o. [...]"
          brideMaternalGrandfather: 'Mrs. M. Begum & Late Mr. N Maqbool Basha',

          // ── GROOM (Mohammed Yousuf Aman Arif) ──
          // Shown as "Son of [groomFather]" in VelvetOpening hero
          groomFather: 'Mr. Mohammed Ajmal Ariff & Mrs. Fazeelath Afza',
          // Shown as "Paternal Grand S/o. [...]"
          groomPaternalGrandfather: 'Late Mrs. Shahtaj Begum & Late Mr. K.F. Ariff ',
          // Shown as "Maternal Grand S/o. [...]"
          groomMaternalGrandfather: 'Mrs. Zeenath Khanum & Late Mr. Syed Md. Hamid',

          // ── CLOSING FOOTER ──
          invitationFromName: 'Mr. Mohammed Ajmal Ariff & Mrs. Fazeelath Afza · Mr. Syed Basha Mohiuddin & Mrs. Syed Parveen',
          invitationFromOrg: '',
          invitationFromAddress: '',
          invitationFromPhone: '',
        },
      },

      events: {
        create: [

          {
            name: 'Reception',
            type: 'VALIMA',
            date: new Date('2026-11-17T13:30:00.000Z'), // 7:00 PM IST
            timeDisplay: '7:00 PM onwards',
            description: 'Followed by Dinner',
            venueName: 'Royal Tripura Vasini',
            venueAddress: 'Gate No. 3, Palace Grounds\nBengaluru – 560080',
            mapsUrl: 'https://maps.app.goo.gl/q6dSqYQ2uwZG3WSYA',
            order: 2,
            enabled: true,
          },
        ],
      },

      music: {
        create: {
          title: 'Wedding Nasheed',
          url: '/assets/audio/aman-tazeen-nasheed.mp3',
          autoplay: true,
        },
      },

      rsvpConfig: {
        create: {
          enabled: false,
          message: 'We would be honoured by your presence.',
        },
      },

      // "With Best Compliments From: relatives & friends"
      compliments: {
        create: [
          { name: 'Relatives & Friends', order: 1 },
        ],
      },
    },
  })

  console.log(`✅ Client 6 created successfully!`)
  console.log(`   URL: /i/${wedding.slug}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
