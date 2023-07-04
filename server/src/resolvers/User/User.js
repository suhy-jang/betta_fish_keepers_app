import getUserId from '../../utils/getUserId'

const User = {
  email: {
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false)
      if (userId && userId === parent.id) {
        return parent.email
      } else {
        return null
      }
    },
  },
  posts: {
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false)
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
    async resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false)
      const pinned = await prisma.pinned.findMany({
        where: {
          user: { id: parent.id },
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
    async resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false)
      const featured = await prisma.featured.findFirst({
        where: {
          user: { id: parent.id },
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
