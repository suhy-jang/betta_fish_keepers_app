import { AuthenticationError } from '../../utils/error'

const Mutation = {
  async createPost(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const createPost = await prisma.post.create({
      data: {
        ...args.data,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return createPost
  },
  async deletePost(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const postExists = await prisma.post.findFirst({
      where: {
        id: args.id,
        author: {
          id: userId,
        },
      },
    })

    if (!postExists) {
      throw new Error('Unable to delete post')
    }

    await prisma.featured.deleteMany({
      where: {
        post: {
          id: args.id,
        },
      },
    })
    await prisma.pinned.deleteMany({
      where: {
        post: {
          id: args.id,
        },
      },
    })
    await prisma.comment.deleteMany({
      where: {
        post: {
          id: args.id,
        },
      },
    })

    const deletedPost = await prisma.post.delete({
      where: {
        id: args.id,
      },
    })

    return deletedPost
  },
  async updatePost(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const postExists = await prisma.post.findFirst({
      where: {
        id: args.id,
        author: {
          id: userId,
        },
      },
    })

    if (!postExists) {
      throw new Error('Unable to update post')
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: args.id,
      },
      data: args.data,
    })

    return updatedPost
  },
}

export { Mutation as default }
