import { AuthenticationError } from '../../utils/error'

const Subscription = {
  post: {
    subscribe(_, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info,
      )
    },
  },
  myPost: {
    subscribe(_, args, { prisma, request, getUserId }, info) {
      const userId = getUserId(request)
      if (!userId) {
        throw new AuthenticationError('Authentication required')
      }

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
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
