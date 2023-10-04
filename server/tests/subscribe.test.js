import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import { PrismaClient } from '@prisma/client'
import seedDatabase, {
  postOne,
  postTwo,
  commentOne,
} from './utils/seedDatabase'
import getClient from './utils/getClient'
import { subscribeToPosts, subscribeToComments } from './utils/operations'

const prisma = new PrismaClient()
const client = getClient()

beforeAll(seedDatabase)

test('Should subscribe to changes for published posts', async (done) => {
  client.subscribe({ query: subscribeToPosts }).subscribe({
    next(response) {
      expect(response.data.post.mutation).toBe('DELETED')
      done()
    },
  })
  await prisma.post.delete({ where: { id: postOne.post.id } })
})

test('Should subscribe to comments for a post', async (done) => {
  const variables = {
    postId: postTwo.post.id,
  }
  client.subscribe({ query: subscribeToComments, variables }).subscribe({
    next(response) {
      expect(response.data.comment.mutation).toBe('DELETED')
      done()
    },
  })
  await prisma.comment.delete({
    where: { id: commentOne.comment.id },
  })
})
