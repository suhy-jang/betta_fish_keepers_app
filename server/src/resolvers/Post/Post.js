const Post = {
  author: {
    async resolve(parent, args, { prisma }, info) {
      const author = await prisma.user.findUnique({
        where: { id: parent.authorId },
      })
      return author
    },
  },
  comments: {
    async resolve(parent, args, { prisma }, info) {
      const comments = await prisma.comment.findMany({
        where: { postId: parent.id },
      })
      return comments
    },
  },
  pinGazers: {
    async resolve(parent, args, { prisma }, _) {
      const pinned = await prisma.pinned.findMany({
        where: {
          postId: parent.id,
        },
        select: {
          user: {
            select: {
              id: true,
            },
          },
        },
      })
      const userIds = pinned.map((pinnedPost) => pinnedPost.user.id)
      const users = await prisma.user.findMany({
        where: {
          id: { in: userIds },
        },
      })
      return users
    },
  },
  featuredBy: {
    async resolve(parent, args, { prisma }, _) {
      const featured = await prisma.featured.findFirst({
        where: {
          postId: parent.id,
        },
        select: { user: { select: { id: true } } },
      })
      if (!featured) {
        return null
      }
      const authorId = featured.user.id
      const user = await prisma.user.findUnique({
        where: { id: authorId },
      })
      return user
    },
  },
}

export { Post as default }
