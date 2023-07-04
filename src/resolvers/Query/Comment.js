import getUserId from '../../utils/getUserId'

const Comment = {
  async comments(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        postId: args.postId,
        text: args.query
          ? {
              contains: args.query,
            }
          : undefined,
      },
    }

    const comments = await prisma.comment.findMany(opArgs)

    return comments
  },
}

export { Comment as default }
