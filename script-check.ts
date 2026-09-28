import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const wedding = await prisma.wedding.findUnique({ where: { slug: 'aqib-weds-lubna' } })
  console.log('Template:', wedding?.templateId)
}
main().finally(() => prisma.$disconnect())
