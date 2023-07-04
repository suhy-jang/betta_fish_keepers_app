import { AuthenticationError } from '../../utils/error'

const Comment = {
  async createComment(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const post = await prisma.post.findFirst({
      where: {
        id: args.data.postId,
        published: true,
        allowComments: true,
      },
    })

    if (!post) {
      throw new Error('Unable to find post')
    }

    const createdComment = await prisma.comment.create({
      data: {
        text: args.data.text,
        author: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: args.data.postId,
          },
        },
      },
    })

    return createdComment
  },
  async updateComment(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: args.id,
        authorId: userId,
      },
    })

    if (!comment) {
      throw new Error('Unable to update comment')
    }

    return prisma.comment.update({
      where: {
        id: args.id,
      },
      data: args.data,
    })
  },
  async deleteComment(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: args.id,
        OR: [
          {
            author: {
              id: userId,
            },
          },
          {
            post: {
              author: {
                id: userId,
              },
            },
          },
        ],
      },
    })

    if (!comment) {
      throw new Error('Unable to delete comment')
    }

    return prisma.comment.delete({
      where: {
        id: args.id,
      },
    })
  },
}

export { Comment as default }
