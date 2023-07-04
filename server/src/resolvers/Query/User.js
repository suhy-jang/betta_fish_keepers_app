import getUserId from '../../utils/getUserId'

const User = {
  users: async (parent, args, { prisma }, info) => {
    const opArgs = {
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: {
        createdAt: 'desc',
      },
    }

    if (args.query) {
      opArgs.where = { name: { contains: args.query } }
    }

    const users = await prisma.user.findMany(opArgs)
    return users
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    return user
  },
  async user(parent, args, { prisma }, info) {
    const user = await prisma.user.findUnique({
      where: { id: args.id },
    })
    return user
  },
}

export { User as default }
