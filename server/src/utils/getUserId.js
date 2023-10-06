import { verifyToken } from './auth'

const getUserId = (request) => {
  const header = request ? request.headers.headersInit.authorization : undefined

  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = verifyToken(token)
    return decoded.userId
  }

  return null
}

export { getUserId as default }
