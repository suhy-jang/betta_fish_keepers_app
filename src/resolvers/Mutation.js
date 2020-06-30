import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import { generateToken } from '../utils/jwtToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)

    const emailTaken = await prisma.exists.User({
      email: args.data.email,
    })

    if (emailTaken) {
      throw new Error('Email already taken.')
    }

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    })

    return {
      user,
      token: generateToken(user.id),
    }
  },
  async login(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }
    const user = await prisma.query.user({
      where: { email: args.data.email },
    })

    if (!user) {
      throw new Error('Unable to authenticate')
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password)
    if (!isMatch) {
      throw new Error('Unable to authenticate')
    }

    return {
      user,
      token: generateToken(user.id),
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.mutation.deleteUser(
      {
        where: { id: userId },
      },
      info,
    )
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }

    return prisma.mutation.updateUser(
      {
        where: { id: userId },
        data: args.data,
      },
      info,
    )
  },
  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (!userId) {
      throw new Error('User not found')
    }

    return prisma.mutation.createPost(
      {
        data: {
          ...args.data,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info,
    )
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!postExists) {
      throw new Error('Unable to delete post')
    }

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info,
    )
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!postExists) {
      throw new Error('Unable to update post')
    }

    const allowedComments = await prisma.exists.Post({
      id: args.id,
      published: true,
      allowComments: true,
    })

    if (
      allowedComments &&
      (args.data.published === false || args.data.allowComments === false)
    ) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      })
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    )
  },
  async createPinned(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const pinGazers = await prisma.query.pinneds(
      {
        where: {
          post: {
            id: args.id,
          },
        },
      },
      info,
    )

    const pinExists = pinGazers.some(e => e.user.id === userId)

    if (pinGazers.length >= 6 || pinExists) {
      throw new Error('Unable to pin post')
    }

    return prisma.mutation.createPinned(
      {
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.id,
            },
          },
        },
      },
      info,
    )
  },
  async deletePinned(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const [pinExists] = await prisma.query.pinneds({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: args.id,
        },
      },
    })

    if (!pinExists) {
      throw new Error('Unable to unpin post')
    }

    return prisma.mutation.deletePinned(
      {
        where: {
          id: pinExists.id,
        },
      },
      info,
    )
  },
  async createFeatured(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const [featureExists] = await prisma.query.featureds({
      where: {
        user: {
          id: userId,
        },
      },
    })

    const [postExists] = await prisma.query.posts({
      where: {
        id: args.id,
        author: {
          id: userId,
        },
      },
    })

    if (featureExists || !postExists) {
      throw new Error('Unable to feature post')
    }

    return prisma.mutation.createFeatured(
      {
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.id,
            },
          },
        },
      },
      info,
    )
  },
  async deleteFeatured(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const [featureExists] = await prisma.query.featureds({
      where: {
        user: {
          id: userId,
        },
      },
    })

    const [postExists] = await prisma.query.posts({
      where: {
        id: args.id,
        author: {
          id: userId,
        },
      },
    })

    if (!featureExists || !postExists) {
      throw new Error('Unable to unfeature post')
    }

    return prisma.mutation.deleteFeatured(
      {
        where: {
          id: featureExists.id,
        },
      },
      info,
    )
  },
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true,
      allowComments: true,
    })

    if (!postExists) {
      throw new Error('Unable to find post')
    }

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info,
    )
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!commentExists) {
      throw new Error('Unable to update comment')
    }

    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    )
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const [commentExists] = await prisma.query.comments({
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

    if (!commentExists) {
      throw new Error('Unable to delete comment')
    }

    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info,
    )
  },
}

export { Mutation as default }
