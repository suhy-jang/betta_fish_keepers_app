import getUserId from '../../utils/getUserId'

const Post = {
  posts: async (parent, args, { prisma }, info) => {
    const opArgs = {
      take: args.first,
      skip: args.skip,
      cursor: args.after ? { id: args.after } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        published: true,
        OR: args.query
          ? [
              { title: { contains: args.query } },
              { body: { contains: args.query } },
            ]
          : undefined,
      },
    }

    const posts = await prisma.post.findMany(opArgs)
    return posts
  },
  async myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const opArgs = {
      take: args.first,
      skip: args.skip,
      cursor: args.after ? { id: args.after } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        author: {
          id: userId,
        },
        OR: args.query
          ? [
              { title: { contains: args.query } },
              { body: { contains: args.query } },
            ]
          : undefined,
      },
    }

    const posts = await prisma.post.findMany(opArgs)

    return posts
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)

    const post = await prisma.post.findFirst({
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
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return post
  },
}

export { Post as default }
