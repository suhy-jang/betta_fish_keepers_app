const Subscription = {
  comment: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: args.postId,
              },
            },
          },
        },
        info,
      )
    },
  },
}

export { Subscription as default }
