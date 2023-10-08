import { verifyToken } from './auth'

const getUserId = (request) => {
  const bearerToken = request
    ? request.headers.headersInit.authorization
    : undefined

  if (bearerToken) {
    const token = bearerToken.replace('Bearer ', '')
    const decoded = verifyToken(token)
    return decoded.userId
  }

  throw new Error('no token provided')
}

export { getUserId as default }
