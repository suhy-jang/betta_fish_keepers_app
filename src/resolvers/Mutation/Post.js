import getUserId from '../../utils/getUserId'

const Post = {
  async createPost(parent, args, { request, prisma }, info) {
    const userId = getUserId(request)

    if (!userId) {
      throw new Error('User not found')
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
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

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
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

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

export { Post as default }
