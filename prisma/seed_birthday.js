const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  let adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  
  if (!adminUser) {
    console.log("No admin user found. Creating one...")
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@invitingyou.in',
        name: 'Admin',
        role: 'ADMIN',
        password: 'password123'
      }
    })
  }

  const slug = 'saks-birthday-surprise'
  
  // Check if exists
  const existing = await prisma.wedding.findUnique({ where: { slug } })
  if (existing) {
    await prisma.wedding.delete({ where: { slug } })
  }

  const birthdayInv = await prisma.wedding.create({
    data: {
      title: "Sak's Birthday Surprise",
      slug: slug,
      templateId: 'birthday-interactive-01',
      status: 'PUBLISHED',
      userId: adminUser.id,
      birthday: {
        create: {
          birthdayPersonName: "Sak",
          age: 21,
          birthdayDate: new Date('2026-10-15T00:00:00Z'),
          senderName: "Your Friends",
          headline: "Happy Birthday,",
          questionText: "Are you ready to pop some balloons?",
          balloons: 4,
          bouquetMessages: [
            "You're amazing!",
            "Have a fantastic day!",
            "Wishing you all the best",
            "Happy Birthday Sak!"
          ],
          birthdayMessage: "Happy Birthday Sak! This is a dynamic message from the DB.",
          finalMessage: "Lots of love ❤️",
          heroImage: "/templates/birthday/cute-bears.png"
        }
      },
      gallery: {
        create: [
          { url: 'https://images.unsplash.com/photo-1530103862676-de8892b07b10?auto=format&fit=crop&w=400&q=80', caption: 'Party Time', order: 1 },
          { url: 'https://images.unsplash.com/photo-1464349153735-7fa506d8a7c2?auto=format&fit=crop&w=400&q=80', caption: 'Memories', order: 2 },
          { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80', caption: 'Fun', order: 3 },
          { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=400&q=80', caption: 'Cheers', order: 4 },
        ]
      },
      music: {
        create: {
          title: "Happy Birthday Song",
          url: "/assets/audio/velvet-bgm.mp3",
          autoplay: true
        }
      }
    }
  })

  console.log('Created Birthday Invitation:', birthdayInv)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
