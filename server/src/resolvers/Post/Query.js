import { AuthenticationError } from '../../utils/error'

const Query = {
  // public
  posts: async (_, args, { prisma }, __) => {
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
              { title: { contains: args.query, mode: 'insensitive' } },
              { body: { contains: args.query, mode: 'insensitive' } },
            ]
          : undefined,
      },
    }

    const posts = await prisma.post.findMany(opArgs)
    return posts
  },
  async myPosts(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

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
              { title: { contains: args.query, mode: 'insensitive' } },
              { body: { contains: args.query, mode: 'insensitive' } },
            ]
          : undefined,
      },
    }

    const posts = await prisma.post.findMany(opArgs)

    return posts
  },
  async post(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    // No need to verify if a user is logged in to see published posts.

    const post = await prisma.post.findFirst({
      where: {
        id: args.id,
        OR: [
          {
            published: true,
          },
          {
            authorId: userId,
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

export { Query as default }
