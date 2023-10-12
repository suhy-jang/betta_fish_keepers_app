import { AuthenticationError } from '../../utils/error'

const User = {
  users: async (_, args, { prisma }, __) => {
    const opArgs = {
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: {
        createdAt: 'desc',
      },
    }

    if (args.query) {
      opArgs.where = { name: { contains: args.query, mode: 'insensitive' } }
    }

    const users = await prisma.user.findMany(opArgs)
    return users
  },
  async me(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    return user
  },
  async user(_, args, { prisma }, __) {
    const user = await prisma.user.findUnique({
      where: { id: args.id },
    })
    return user
  },
}

export { User as default }
