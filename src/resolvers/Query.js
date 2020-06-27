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
        OR: [{ name_contains: args.query }, { email_contains: args.query }],
      }
    }
    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {}
    if (args.query) {
      opArgs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }],
      }
    }
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
      published: false,
      allowComments: true,
    }
  },
  comments(parent, args, { prisma }, info) {
    const opArgs = {}
    if (args.query) {
      opArgs.where = {
        text_contains: args.query,
      }
    }
    return prisma.query.comments(opArgs, info)
  },
}

export { Query as default }
