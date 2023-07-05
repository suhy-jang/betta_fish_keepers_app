import { GraphQLServer } from 'graphql-yoga'
import prisma from './prisma'
import { resolvers } from './resolvers'
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
})

export { server as default }
