import { AuthenticationError } from '../../utils/error'

const Pinned = {
  async createPinned(_, args, { prisma, request, getUserId }, _) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    const pinned = await prisma.pinned.findFirst({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: args.postId,
        },
      },
    })
    if (pinned) {
      throw new Error('Already pinned')
    }
    const pinnedPosts = await prisma.pinned.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    })

    if (pinnedPosts.length >= 6) {
      throw new Error('Pinned post should not be over 6 (maximum)')
    }

    const createdPinned = await prisma.pinned.create({
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

    return createdPinned
  },
  async deletePinned(_, args, { prisma, request, getUserId }, _) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }
    const pinned = await prisma.pinned.findFirst({
      where: {
        id: args.id,
        user: {
          id: userId,
        },
      },
    })
    if (!pinned) {
      throw new Error('Not found')
    }

    const deletePinned = await prisma.pinned.delete({
      where: {
        id: args.id,
      },
    })
    return deletePinned
  },
}

export { Pinned as default }
