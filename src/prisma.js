// import { Prisma } from 'prisma-binding'
import { PrismaClient } from '@prisma/client'
// import { fragmentReplacements } from './resolvers'

const prisma = new PrismaClient({ errorFormat: 'minimal' })
// const prisma = new Prisma({
//   typeDefs: 'src/generated/prisma.graphql',
//   endpoint: process.env.PRISMA_ENDPOINT,
//   secret: process.env.PRISMA_SECRET,
//   fragmentReplacements,
// })

export { prisma as default }
