import 'core-js/stable'
import 'cross-fetch/polyfill'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Jen Barber',
    email: 'jen@example.org',
    password: bcrypt.hashSync('foobar123'),
  },
  user: undefined,
  jwt: undefined,
}

const userTwo = {
  input: {
    name: 'Roy Trenneman',
    email: 'roy@example.org',
    password: bcrypt.hashSync('foobar123'),
  },
  user: undefined,
  jwt: undefined,
}

const userThree = {
  input: {
    name: 'Maurice Moss',
    email: 'moss@example.org',
    password: bcrypt.hashSync('foobar123'),
  },
  user: undefined,
  jwt: undefined,
}

const postOne = {
  input: {
    title: 'How cold is too cold for a betta fish?',
    body: 'Winter is coming. I worry so much.',
    published: true,
    allowComments: true,
  },
  post: undefined,
}

const postTwo = {
  input: {
    title: 'Here are tips how you make your betta happy',
    body: '1. xxx    2. xxx   3. xxx',
    published: true,
    allowComments: false,
  },
  post: undefined,
}

const postThree = {
  input: {
    title: "my bettas fin rot won't go away",
    body: 'Do you have any idea why is it so?',
    published: false,
    allowComments: false,
  },
  post: undefined,
}

const commentOne = {
  input: {
    text: 'You have to check the water condition.',
  },
  comment: undefined,
}

const commentTwo = {
  input: {
    text: "Above 23°C, that's fine.",
  },
  comment: undefined,
}

const seedDatabase = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL *= 10

  // Delete test data
  await prisma.mutation.deleteManyComments()
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  })

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  })

  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

  // Create user three
  userThree.user = await prisma.mutation.createUser({
    data: userThree.input,
  })

  userThree.jwt = jwt.sign(
    { userId: userThree.user.id },
    process.env.JWT_SECRET,
  )

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  })

  // Create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
    },
  })

  // Create post three
  postThree.post = await prisma.mutation.createPost({
    data: {
      ...postThree.input,
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
    },
  })

  // Create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userThree.user.id,
        },
      },
      post: {
        connect: {
          id: postTwo.post.id,
        },
      },
    },
  })
  // Create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
      post: {
        connect: {
          id: postOne.post.id,
        },
      },
    },
  })
}

export {
  seedDatabase as default,
  userOne,
  userTwo,
  userThree,
  postOne,
  postTwo,
  commentOne,
  commentTwo,
}
