const Featured = {
  user: {
    async resolve(parent, _, { prisma }, __) {
      const user = await prisma.user.findUnique({
        where: { id: parent.userId },
      })
      return user
    },
  },
  post: {
    async resolve(parent, _, { prisma }, __) {
      const post = await prisma.post.findUnique({
        where: { id: parent.postId },
      })
      return post
    },
  },
}

export { Featured as default }
