const crypto = require('crypto')

function getGravatarUrl(email) {
  const trimmedEmail = email.trim().toLowerCase()
  const hash = crypto.createHash('md5').update(trimmedEmail).digest('hex')
  return `https://www.gravatar.com/avatar/${hash}`
}

export { getGravatarUrl }
