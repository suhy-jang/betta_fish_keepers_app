const User = {
  email: {
    resolve(parent, args, { request, getUserId }, _) {
      const userId = getUserId(request)
      if (!userId) {
        return null
      }

      return parent.email
    },
  },
  posts: {
    resolve(parent, args, { prisma, request, getUserId }, _) {
      const userId = getUserId(request)
      return prisma.post.findMany({
        where: {
          published: userId === parent.id ? undefined : true,
          author: {
            id: parent.id,
          },
        },
      })
    },
  },
  pinnedPosts: {
    async resolve(parent, args, { prisma, request, getUserId }, _) {
      const pinned = await prisma.pinned.findMany({
        where: {
          userId: parent.id,
        },
        select: { post: { select: { id: true } } },
      })
      if (!pinned) {
        return null
      }
      const postIds = pinned.map((pinnedPost) => pinnedPost.post.id)
      const posts = await prisma.post.findMany({
        where: { id: { in: postIds } },
      })
      return posts
    },
  },
  featuredPost: {
    async resolve(parent, args, { prisma, request, getUserId }, _) {
      const featured = await prisma.featured.findFirst({
        where: {
          userId: parent.id,
        },
        select: { post: { select: { id: true } } },
      })
      if (!featured) {
        return null
      }
      const postId = featured.post.id
      const post = await prisma.post.findUnique({
        where: { id: postId },
      })
      return post
    },
  },
}

export { User as default }
