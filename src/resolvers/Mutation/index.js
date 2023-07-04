import User from './User'
import Post from './Post'
import Pinned from './Pinned'
import Featured from './Featured'
import Comment from './Comment'

const Mutation = {
  ...User,
  ...Post,
  ...Pinned,
  ...Featured,
  ...Comment,
}

export { Mutation as default }
