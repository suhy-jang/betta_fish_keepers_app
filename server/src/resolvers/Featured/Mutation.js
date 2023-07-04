import { AuthenticationError } from '../../utils/error'

const Featured = {
  async createFeatured(_, args, { prisma, request, getUserId }, _) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const featured = await prisma.featured.findFirst({
      where: {
        user: { id: userId },
      },
    })

    const post = await prisma.post.findFirst({
      where: {
        id: args.postId,
        author: {
          id: userId,
        },
      },
    })

    if (featured) {
      throw new Error('Featured post should only be one')
    }

    if (!post) {
      throw new Error("Post isn't exist")
    }

    const newFeatured = await prisma.featured.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: args.postId,
          },
        },
      },
    })
    return newFeatured
  },
  async deleteFeatured(
    _,
    args,
    { prisma, request, getUserId, AuthenticationError },
    _,
  ) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }
    const featuredPost = await prisma.featured.findFirst({
      where: {
        id: args.id,
        user: { id: userId },
      },
    })

    if (!featuredPost) {
      throw new Error('Unable to delete featured post')
    }

    const deleteFeatured = await prisma.featured.delete({
      where: {
        id: args.id,
      },
    })
    return deleteFeatured
  },
}

export { Featured as default }
