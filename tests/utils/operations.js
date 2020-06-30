import { gql } from 'apollo-boost'

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const getUsers = gql`
  query {
    users {
      name
      email
    }
  }
`

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
      }
    }
  }
`

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`

const createPinnedPost = gql`
  mutation($id: ID!) {
    createPinned(id: $id) {
      id
    }
  }
`

const createFeaturedPost = gql`
  mutation($id: ID!) {
    createFeatured(id: $id) {
      id
    }
  }
`

export {
  createUser,
  getUsers,
  login,
  getProfile,
  getPosts,
  createPinnedPost,
  createFeaturedPost,
}
