import getUserId from '../../utils/getUserId'

const Comment = {
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

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
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

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
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

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
