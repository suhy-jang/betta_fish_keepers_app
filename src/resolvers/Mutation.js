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
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
      },
    })
  },
  deletePost(parent, args, { prisma, request }, info) {
    return prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    })
  },
  updatePost(parent, args, { prisma, request }, info) {
    return prisma.mutation.updatePost({
      where: {
        id: args.id,
      },
      data: args.data,
    })
  },
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment({
      data: args.data,
    })
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment({
      where: {
        id: args.id,
      },
      data: args.data,
    })
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    })
  },
}

export { Mutation as default }
