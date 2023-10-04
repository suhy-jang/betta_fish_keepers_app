import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import faker from 'faker'

const prisma = new PrismaClient()

const generatePassword = async (pw) => await bcrypt.hash(pw, 10)

// Function to construct a random image URL from Lorem Picsum with custom options
function getRandomImageUrl(options = {}) {
  const baseUrl = 'https://picsum.photos'
  const width = 200
  const height = 200
  const blur = '?blur=2'
  const grayscale = '?grayscale'
  const seed = options.seed ? `seed=${options.seed}` : ''

  return `${baseUrl}/${width}/${height}${blur}${grayscale}${seed}`
}

const seedUsers = async () => {
  const users = []
  for (let i = 0; i < 5; i++) {
    const email = faker.internet.email()
    const password = await generatePassword(faker.internet.password())

    const avatar = getRandomImageUrl({ seed: email })

    users.push({
      name: faker.name.findName(),
      email,
      password,
      avatar,
    })
  }
  await prisma.user.createMany({ data: users })
}

const seedPosts = async () => {
  const users = await prisma.user.findMany()

  const posts = []
  for (let i = 0; i < 5; i++) {
    const randomUser = Math.floor(Math.random() * users.length)
    posts.push({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      authorId: users[randomUser].id,
      published: true,
    })
  }
  await prisma.post.createMany({ data: posts })
}

const seedFeaturedPosts = async () => {
  const users = await prisma.user.findMany()

  const featured = []
  for (let i = 0; i < users.length; i++) {
    const userPosts = await prisma.post.findMany({
      where: { authorId: users[i].id },
    })
    if (userPosts.length > 0) {
      const randomPost = Math.floor(Math.random() * userPosts.length)
      featured.push({
        userId: users[i].id,
        postId: userPosts[randomPost].id,
      })
    }
  }
  await prisma.featured.createMany({ data: featured })
}

const seedPinnedPosts = async () => {
  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()

  const pinned = []
  for (let i = 0; i < users.length; i++) {
    const shuffledPosts = posts.sort(() => Math.random() - 0.5)
    const selectedPosts = shuffledPosts.slice(0, 5)
    for (let j = 0; j < selectedPosts.length; j++) {
      pinned.push({
        userId: users[i].id,
        postId: selectedPosts[j].id,
      })
    }
  }
  await prisma.pinned.createMany({ data: pinned })
}

const seedComments = async () => {
  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()

  const comments = []
  for (let i = 0; i < 5; i++) {
    const randomUser = Math.floor(Math.random() * users.length)
    const randomPost = Math.floor(Math.random() * posts.length)

    comments.push({
      text: faker.lorem.sentence(),
      authorId: users[randomUser].id,
      postId: posts[randomPost].id,
    })
  }
  await prisma.comment.createMany({ data: comments })
}

const deleteMany = async () => {
  await prisma.featured.deleteMany()
  await prisma.pinned.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
}

const seedData = async () => {
  try {
    await deleteMany()
    await Promise.all([
      seedUsers(),
      seedPosts(),
      seedFeaturedPosts(),
      seedPinnedPosts(),
      seedComments(),
    ])
  } catch (error) {
    console.error(error)
  }
  await prisma.$disconnect()
}

seedData()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    process.exit(1)
  })
