import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import prisma from '../src/prisma'
import seedDatabase, {
  userOne,
  userTwo,
  postCreate,
  postOne,
  postTwo,
  postThree,
} from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
  createUser,
  getUsers,
  login,
  getProfile,
  getPosts,
  createPinnedPost,
  createFeaturedPost,
} from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should expose published posts', async () => {
  const response = await client.query({ query: getPosts })

  expect(response.data.posts.length).toBe(2)
  expect(response.data.posts[0].published).toBe(true)
  expect(response.data.posts[1].published).toBe(true)
})

test('Should not create multiple pinned post for same post', async () => {
  const client = getClient(userTwo.jwt)
  const variables = {
    id: postOne.post.id,
  }

  expect(
    await client.mutate({
      mutation: createPinnedPost,
      variables,
    }),
  ).toHaveProperty('data.createPinned.id')

  await expect(
    client.mutate({
      mutation: createPinnedPost,
      variables,
    }),
  ).rejects.toThrow()
})

test('Should create multiple pinned post for different posts', async () => {
  let client = getClient(userTwo.jwt)
  const variables = {
    id: postOne.post.id,
  }

  expect(
    await client.mutate({
      mutation: createPinnedPost,
      variables,
    }),
  ).toHaveProperty('data.createPinned.id')

  client = getClient(userOne.jwt)

  expect(
    await client.mutate({
      mutation: createPinnedPost,
      variables,
    }),
  ).toHaveProperty('data.createPinned.id')
})

test('Should create a featured post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
  }

  expect(
    await client.mutate({
      mutation: createFeaturedPost,
      variables,
    }),
  ).toHaveProperty('data.createFeatured.id')
})
