const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Ensure we have an admin user
  let adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin_bday_clients@example.com',
        role: 'ADMIN',
      }
    })
  }

  // Client 1: Ayman from Saud
  const aymanData = {
    slug: 'ayman-birthday',
    title: "Ayman's Birthday Surprise",
    templateId: 'birthday-interactive-01',
    templateVersion: 1,
    status: 'PUBLISHED',
    userId: adminUser.id,
    birthday: {
      create: {
        birthdayPersonName: 'Ayman',
        senderName: 'Saud',
        headline: 'Happy Birthday,',
        questionText: 'Are you ready for a surprise?',
        balloons: 4,
        bouquetMessages: [
          '💖 Our Shared Laughter\nThe silly inside jokes and the endless laughs that make every moment with Ayman pure gold.',
          '🌟 My Constant Inspiration\nAyman\'s strength, ambition, and unwavering spirit inspire me to be better every single day.',
          '🌸 Your Warm Heart\nThe infinite kindness and gentle nature that Ayman brings into my life every single day.',
          '✨ Every Moment With You\nEvery memory we\'ve shared, Ayman, is a treasure I will hold onto forever.',
          '🤝 My Ride or Die\nThrough every adventure and every storm, Ayman has always been right by my side.',
          '😊 You Crack Me Up\nAyman\'s humor and joy make every ordinary day feel like the best day ever.',
          '🌙 My Safe Place\nWith Ayman I can be completely myself — no masks, just pure comfort and love.',
          '🎂 Happy Birthday, Ayman!\nWishing you a day as magical and beautiful as the incredible person you are.',
        ],
        birthdayMessage: `Dear Ayman,\n\nHappy Birthday to someone truly special!🎂\n\nYou are a Sweet Soul, Super Loyal, My Rock, and I'm so grateful to have you in my life.\n\nLife is so much more fun with you around! Your energy and laughter light up every room.\n\nOn your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.\n\nHere's to celebrating you today and always!🎉`,
        signature: 'With love and best wishes,',
        finalMessage: 'Lots of love for you ❤️',
        heroImage: '/templates/birthday/hero_bears.png'
      }
    },
    music: {
      create: {
        url: '/assets/audio/sub_clair-happy-birthday-592177.mp3'
      }
    },
    gallery: {
      create: [
        { url: '/templates/birthday/user_img_1.png', order: 1, isCover: true, caption: 'A special memory 💕' },
        { url: '/templates/birthday/user_img_2.png', order: 2, isCover: false, caption: 'Always in my heart ❤️' },
        { url: '/templates/birthday/user_img_3.png', order: 3, isCover: false, caption: 'The best of times 🌸' }
      ]
    }
  }

  // Client 2: Shafeen from Aasim
  const shafeenData = {
    slug: 'shafeen-birthday',
    title: "Shafeen's Birthday Surprise",
    templateId: 'birthday-interactive-01',
    templateVersion: 1,
    status: 'PUBLISHED',
    userId: adminUser.id,
    birthday: {
      create: {
        birthdayPersonName: 'Shafeen',
        senderName: 'Aasim',
        headline: 'Happy Birthday,',
        questionText: 'Are you ready for a surprise?',
        balloons: 4,
        bouquetMessages: [
          '😂 That Infectious Laugh\nShafeen\'s laugh is the most contagious thing in the world and it makes everything better.',
          '🥺 You Just Understand\nWithout a single word, Shafeen always knows exactly what I need. That\'s rare and priceless.',
          '🌟 A Beautiful Soul\nShafeen\'s pure heart, honesty, and warmth make the world a genuinely better place.',
          '✨ Every Moment Feels Special\nFrom the mundane to the milestones, Shafeen turns every moment into a memory.',
          '💖 Fierce & Loyal\nShafeen\'s loyalty is unmatched — always in my corner, always keeping it real.',
          '🎯 Absolutely Unforgettable\nThere is simply no one else like Shafeen in the entire world and I mean that.',
          '🌙 My Calm in the Chaos\nWhenever everything feels too much, Shafeen is the peace I always come back to.',
          '🎂 Happy Birthday, Shafeen!\nToday we celebrate someone who makes every single day worth waking up for.',
        ],
        birthdayMessage: `Dear Shafeen,\n\nHappy Birthday to someone truly amazing!🎂\n\nYou are an Amazing Friend, Super Smart, My Anchor, and I'm so grateful to have you in my life.\n\nLife is so much more fun with you around! Your energy and laughter light up every room.\n\nOn your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.\n\nHere's to celebrating you today and always!🎉`,
        signature: 'With love and best wishes,',
        finalMessage: 'Lots of love for you ❤️',
        heroImage: '/templates/birthday/hero_bears.png'
      }
    },
    music: {
      create: {
        url: '/assets/audio/sub_clair-happy-birthday-592177.mp3'
      }
    },
    gallery: {
      create: [
        { url: '/images/shafeenimages/img1.jpeg', order: 1, isCover: true, caption: 'Amazing love 💕' },
        { url: '/images/shafeenimages/img2.jpeg', order: 2, isCover: false, caption: 'So many memories ❤️' },
        { url: '/images/shafeenimages/img3.jpeg', order: 3, isCover: false, caption: 'Best times together 🌸' },
        { url: '/images/shafeenimages/img4.jpeg', order: 4, isCover: false, caption: 'Unforgettable moments ✨' }
      ]
    }
  }


  // ── Upsert helper: delete existing then recreate ──────────────────────────
  async function freshUpsert(slug, payload) {
    const existing = await prisma.wedding.findUnique({ where: { slug } })
    if (existing) {
      await prisma.wedding.delete({ where: { slug } })
      console.log(`Deleted existing: ${slug}`)
    }
    const record = await prisma.wedding.create({ data: payload })
    console.log(`Created: ${record.slug}`)
    return record
  }

  await freshUpsert('ayman-birthday', aymanData)
  await freshUpsert('shafeen-birthday', shafeenData)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
