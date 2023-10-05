import { PrismaClient } from '@prisma/client'
import getUserId from './getUserId'

const prisma = new PrismaClient()

async function createContext({ request }) {
  return {
    prisma,
    request,
    getUserId,
  }
}

export { createContext as default }
