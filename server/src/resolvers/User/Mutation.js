import bcrypt from 'bcryptjs'
import { generateToken } from '../../utils/auth'
import hashPassword from '../../utils/hashPassword'
import { PASSWORD_LENGTH } from '../../constants/constants.js'
const gravatar = require('gravatar')
import { AuthenticationError } from '../../utils/error'

const User = {
  async createUser(_, args, { prisma }, __) {
    if (args.data.password.length < PASSWORD_LENGTH) {
      throw new Error('Password must be 8 characters or longer.')
    }
    args.data.password = await hashPassword(args.data.password)

    const emailTaken = await prisma.user.findUnique({
      where: {
        email: args.data.email,
      },
    })

    if (emailTaken) {
      throw new Error('Email already taken.')
    }

    const avatar = gravatar.url(args.data.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })

    const user = await prisma.user.create({
      data: {
        ...args.data,
        avatar,
      },
    })

    return {
      user,
      token: generateToken(user.id),
    }
  },
  async login(_, args, { prisma }, __) {
    if (args.data.password.length < PASSWORD_LENGTH) {
      throw new Error('Password must be 8 characters or longer.')
    }

    const user = await prisma.user.findUnique({
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
  async deleteUser(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    })
    return deletedUser
  },
  async updateUser(_, args, { prisma, request, getUserId }, __) {
    const userId = getUserId(request)
    if (!userId) {
      throw new AuthenticationError('Authentication required')
    }

    if (typeof args.data.password === 'string') {
      if (args.data.password.length < PASSWORD_LENGTH) {
        throw new Error('Password must be 8 characters or longer.')
      }
      args.data.password = await hashPassword(args.data.password)
    }

    if (args.data.email) {
      args.data.avatar = gravatar.url(args.data.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: args.data,
    })
    return updateUser
  },
}

export { User as default }
