import getUserId from '../utils/getUserId'

const Query = {
  users: async (parent, args, { prisma }, info) => {
    // const opArgs = {
    //   first: args.first,
    //   skip: args.skip,
    //   after: args.after,
    //   orderBy: args.orderBy,
    // }

    // if (args.query) {
    //   opArgs.where = { name_contains: args.query }
    // }
    const users = await prisma.user.findMany({})

    return users
    // prisma.query.user(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true,
      },
    }

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query },
      ]
    }

    return prisma.query.posts(opArgs, info)
  },
  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId,
        },
      },
    }

    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ]
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
  user(parent, args, { prisma }, info) {
    return prisma.query.user(
      {
        where: {
          id: args.id,
        },
      },
      info,
    )
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)

    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            {
              author: { id: userId },
            },
          ],
        },
      },
      info,
    )

    if (posts.length === 0) {
      throw new Error('Post not found')
    }

    return posts[0]
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
