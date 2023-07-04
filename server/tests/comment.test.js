import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import prisma from '../src/prisma'
import seedDatabase, {
  userOne,
  userTwo,
  userThree,
  commentOne,
  commentTwo,
} from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getComments, deleteComment } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should expose comments', async () => {
  const response = await client.query({ query: getComments })
  expect(response).toHaveProperty('data.comments')
  expect(response.data.comments.length).toBe(2)
})

test('Should delete own comment', async () => {
  const client = getClient(userThree.jwt)
  const variables = {
    id: commentOne.comment.id,
  }
  await client.mutate({ mutation: deleteComment, variables })
  const exists = await prisma.exists.Comment({ id: commentOne.comment.id })
  expect(exists).toBe(false)
})

test('Should delete own posts comment', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: commentTwo.comment.id,
  }
  await client.mutate({ mutation: deleteComment, variables })
  const exists = await prisma.exists.Comment({ id: commentTwo.comment.id })
  expect(exists).toBe(false)
})

test('Should not delete other users comment', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: commentOne.comment.id,
  }
  await expect(
    client.mutate({ mutation: deleteComment, variables }),
  ).rejects.toThrow()
})
