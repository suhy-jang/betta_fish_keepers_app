import User from './User'
import Post from './Post'
import Comment from './Comment'

const Query = {
  ...User,
  ...Post,
  ...Comment,
}

export { Query as default }
