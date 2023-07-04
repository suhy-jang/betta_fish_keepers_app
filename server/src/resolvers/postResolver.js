import Query from './Post/Query'
import Mutation from './Post/Mutation'
import Subscription from './Post/Subscription'
import Post from './Post/Post'

const postResolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
}

export { postResolvers as default }
