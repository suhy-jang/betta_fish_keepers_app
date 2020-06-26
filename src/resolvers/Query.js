import getUserId from '../utils/getUserId'

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    }

    if (args.query) {
      opArgs.where = {
        name_contains: args.query,
      }
    }
    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {}
    return prisma.query.posts(opArgs, info)
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.query.user(
      {
        where: { id: userId },
      },
      info,
    )
  },
  post(parent, args, ctx, info) {
    return {
      title: 'a new post',
      body: '',
      published: true,
    }
  },
}

export { Query as default }
