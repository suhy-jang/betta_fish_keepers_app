import getUserId from '../../utils/getUserId'

const Pinned = {
  async createPinned(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

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
  async deletePinned(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
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
