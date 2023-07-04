import { GraphQLServer } from 'graphql-yoga'
import prisma from './prisma'
import { resolvers, fragmentReplacements } from './resolvers'
import getUserId from './utils/getUserId'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      prisma,
      request,
      getUserId,
    }
  },
  fragmentReplacements,
})

export { server as default }
