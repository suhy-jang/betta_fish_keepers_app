import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'test-0',
      email: 'test-0@example.com',
      password: 'foobar123',
    },
  }
  const response = await client.mutate({
    mutation: createUser,
    variables,
  })

  expect(response).toHaveProperty('data.createUser')

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id,
  })

  expect(exists).toBe(true)
})

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: 'jeff@example.org',
      password: 'red098!@#$',
    },
  }
  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should not signup user with invalid password', async () => {
  const variables = {
    data: {
      name: 'test-1',
      email: 'test-1@example.org',
      password: 'foobar',
    },
  }
  await expect(
    client.mutate({ mutation: createUser, variables }),
  ).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile })
  expect(data).toHaveProperty('me')
  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})

test('Should expose public author profiles', async () => {
  const { data } = await client.query({ query: getUsers })

  expect(data).toHaveProperty('users')
  expect(data.users.length).toBe(2)
  expect(data.users[0].email).toBe(null)
  expect(data.users[0].name).toBe('Jen Barber')
})
