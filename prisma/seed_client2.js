/**
 * Seed script — Second Client: Valima of Mohammed Zuhaib & Syeda Asfiya Ishaq
 * Run: node prisma/seed_client2.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Find or create admin user
  let user = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@naqshdigital.in',
        password: 'NaqshAdmin2026!',
        name: 'Admin',
        role: 'SUPER_ADMIN',
      }
    })
  }

  const slug = 'zuhaib-asfiya'

  // Remove any existing entry with the same slug
  const existing = await prisma.wedding.findUnique({ where: { slug } })
  if (existing) {
    console.log('Removing existing entry…')
    await prisma.wedding.delete({ where: { slug } })
  }

  const wedding = await prisma.wedding.create({
    data: {
      slug,
      title: 'Dawat-e-Valima — Mohammed Zuhaib & Syeda Asfiya Ishaq',
      templateId: 'velvet',
      status: 'PUBLISHED',
      userId: user.id,

      // ── Couple ──────────────────────────────────
      couple: {
        create: {
          brideName:           'Syeda Asfiya Ishaq',
          brideQualification:  'B.Tech',
          groomName:           'Mohammed Zuhaib',
          groomQualification:  'B.Tech',
          gregorianDate:       new Date('2026-10-25T20:00:00+05:30'),
          gregorianDisplay:    'Sunday, 25 October 2026',
          hijriDate:           '13th Jamadi-ul-Awwal 1448H',
          islamicVerse:        'In the Name of Allah, the Most Gracious, the Most Merciful',
          invitationMessage:   'Mrs. & Mr. Mohammed Ayaz Pasha cordially invite you on the occasion of the Valima Reception of their beloved son Mohammed Zuhaib with Syeda Asfiya Ishaq.',
        },
      },

      // ── Family ──────────────────────────────────
      family: {
        create: {
          // Groom side
          groomFather:                'Mrs. & Mr. Mohammed Ayaz Pasha',
          groomPaternalGrandfather:   'Late B.S Mohammed Zameer Saheb',
          groomMaternalGrandfather:   'Late K. Abdul Samad Saheb',

          // Bride side
          brideParents:               'Mrs. & Mr. Syed Ishaq',
          bridePaternalGrandfather:   'Late Syed Mahaboob Saheb',
          brideMaternalGrandfather:   'Janab Shaik Humayun Saheb',

          // Sender block (correct schema field names)
          invitationFromName:    'Mrs. & Mr. Mohammed Ayaz Pasha',
          invitationFromAddress: "#70, St. John's Church Road, Bangalore – 560005",
          invitationFromPhone:   '',
        },
      },

      // ── Events ──────────────────────────────────
      events: {
        create: [
          {
            name:        'Dawat-e-Valima',
            type:        'VALIMA',
            order:       1,
            enabled:     true,
            date:        new Date('2026-10-25T20:00:00+05:30'),
            timeDisplay: '8:00 PM onwards',
            description: 'Insha Allah — Dinner will be served from 8:00 PM onwards.',
            venueName:   'Al-Azeez Banquet Hall',
            venueAddress:'#70, St. John\'s Church Road, Bangalore – 560005',
            mapsUrl:     'https://maps.google.com/?q=Al-Azeez+Banquet+Hall+Bangalore',
          },
        ],
      },

      // ── RSVP ────────────────────────────────────
      rsvpConfig: {
        create: {
          enabled:  true,
          deadline: new Date('2026-10-20T23:59:59+05:30'),
        },
      },

      // ── SEO ─────────────────────────────────────
      seo: {
        create: {
          title:       'Dawat-e-Valima — Mohammed Zuhaib & Syeda Asfiya Ishaq | 25 October 2026',
          description: 'You are cordially invited to the Valima Reception of Mohammed Zuhaib & Syeda Asfiya Ishaq. Dinner at Al-Azeez Banquet Hall, Bangalore on Sunday, 25 October 2026 at 8:00 PM.',
          keywords:    'Valima, Mohammed Zuhaib, Syeda Asfiya Ishaq, wedding reception, Bangalore, Al-Azeez Banquet Hall',
        },
      },
    },
  })

  console.log('\n✅  Second client seeded successfully!')
  console.log(`   ID:   ${wedding.id}`)
  console.log(`   Slug: ${wedding.slug}`)
  console.log(`   URL:  http://localhost:3000/i/${wedding.slug}\n`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
