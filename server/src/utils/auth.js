import jwt from 'jsonwebtoken'

const generateToken = userId => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7 days' })
}

const verifyToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export { generateToken, verifyToken }
