const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function main() {
  const records = await p.wedding.findMany({
    where: { slug: { contains: 'Aman' } },
    select: { slug: true, title: true, status: true }
  })
  console.log(JSON.stringify(records, null, 2))
}

main().finally(() => p.$disconnect())
