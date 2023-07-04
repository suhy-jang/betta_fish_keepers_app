import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// import bcrypt from 'bcryptjs';
import { users } from '../src/data/users'

async function main() {
  await prisma.user.deleteMany()

  // const generatePassword = async (pw) => await bcrypt.hash(pw, 10);

  for (const user of users) {
    // const password = await generatePassword(user.password);
    await prisma.user.create({
      data: {
        ...user,
        // password,
        // role: user.role,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
