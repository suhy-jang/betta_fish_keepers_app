import userResolver from './userResolver'
import postResolver from './postResolver'
import commentResolver from './commentResolver'
import pinnedResolver from './pinnedResolver'
import featuredResolver from './featuredResolver'

const resolvers = {
  Subscription: {
    ...postResolver.Subscription,
    ...commentResolver.Subscription,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...pinnedResolver.Mutation,
    ...featuredResolver.Mutation,
  },
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
    ...commentResolver.Query,
  },
  User: userResolver.User,
  Post: postResolver.Post,
  Comment: commentResolver.Comment,
}

export { resolvers }
