const Comment = {
  post: {
    async resolve(parent, args, { prisma }, info) {
      const post = await prisma.post.findUnique({
        where: { id: parent.postId },
      })
      return post
    },
  },
  author: {
    async resolve(parent, args, { prisma }, info) {
      const author = await prisma.user.findUnique({
        where: { id: parent.authorId },
      })
      return author
    },
  },
}

export { Comment as default }
