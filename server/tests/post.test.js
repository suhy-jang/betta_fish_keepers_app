import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import { PrismaClient } from '@prisma/client'
import seedDatabase, { userOne, userTwo, postOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
  getPosts,
  createPinnedPost,
  createFeaturedPost,
  myPosts,
  myUnpubPosts,
  updatePost,
  createPost,
  deletePost,
} from './utils/operations'

const prisma = new PrismaClient()
const client = getClient()

beforeEach(seedDatabase)

test('Should expose published posts', async () => {
  const response = await client.query({ query: getPosts })

  expect(response.data.posts.length).toBe(2)
  expect(response.data.posts[0].published).toBe(true)
  expect(response.data.posts[1].published).toBe(true)
})

test('Should expose own unpublished posts', async () => {
  const client = getClient(userTwo.jwt)
  const response = await client.query({ query: myUnpubPosts })

  expect(response.data.myUnpubPosts.length).toBe(1)
  expect(response.data.myUnpubPosts[0].published).toBe(false)
})

test('Should fetch users posts', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: myPosts })
  expect(data.myPosts.length).toBe(1)
})

test('Should update own post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
    data: { published: true },
  }
  const { data } = await client.mutate({
    mutation: updatePost,
    variables,
  })

  const exists = await prisma.exists.Post({
    id: postOne.post.id,
    published: true,
  })
  expect(data).toHaveProperty('updatePost')
  expect(data.updatePost.published).toBe(true)
  expect(exists).toBe(true)
})

test('Should create a new post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    data: {
      title: 'Why my betta fish is blowing bubbles',
      body: '',
      published: true,
      allowComments: true,
    },
  }
  const { data } = await client.mutate({ mutation: createPost, variables })
  expect(data).toHaveProperty('createPost')
  expect(data.createPost).toMatchObject(variables.data)
})

test('Should delete a post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
  }
  const { data } = await client.mutate({ mutation: deletePost, variables })
  expect(data).toHaveProperty('deletePost')
  const exists = await prisma.exists.Post({ id: postOne.post.id })
  expect(exists).toBe(false)
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
