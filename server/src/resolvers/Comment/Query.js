const Comment = {
  // public
  async comments(_, args, { prisma }, __) {
    const opArgs = {
      where: {
        postId: args.postId,
        text: args.query
          ? {
              contains: args.query,
              mode: 'insensitive',
            }
          : undefined,
      },
    }

    const comments = await prisma.comment.findMany(opArgs)

    return comments
  },
}

export { Comment as default }
