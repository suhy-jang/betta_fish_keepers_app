import { AuthenticationError } from '../../utils/error'

const Featured = {
  async createFeatured(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const featured = await prisma.featured.findFirst({
      where: {
        userId: userId,
      },
    })

    const post = await prisma.post.findFirst({
      where: {
        id: args.postId,
        authorId: userId,
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
    __,
  ) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }
    const featuredPost = await prisma.featured.findFirst({
      where: {
        postId: args.postId,
        userId: userId,
      },
      select: {
        id: true,
      },
    })

    if (!featuredPost) {
      throw new Error('Unable to delete featured post')
    }

    const deleteFeatured = await prisma.featured.delete({
      where: {
        id: featuredPost.id,
      },
    })
    return deleteFeatured
  },
}

export { Featured as default }
