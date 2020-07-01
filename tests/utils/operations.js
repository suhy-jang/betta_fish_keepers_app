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

const myPosts = gql`
  query {
    myPosts {
      id
      title
      body
      published
      allowComments
      pinGazers {
        user {
          id
          name
        }
      }
      featuredBy {
        id
      }
    }
  }
`

const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      body
      published
      allowComments
    }
  }
`

const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
      allowComments
    }
  }
`

const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const getComments = gql`
  query {
    comments {
      id
      text
    }
  }
`

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`

const subscribeToPosts = gql`
  subscription {
    post {
      mutation
      node {
        id
        title
        body
        published
        allowComments
      }
    }
  }
`

const subscribeToComments = gql`
  subscription($postId: ID!) {
    comment(postId: $postId) {
      mutation
      node {
        id
        text
      }
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
  myPosts,
  updatePost,
  createPost,
  deletePost,
  getComments,
  deleteComment,
  subscribeToPosts,
  subscribeToComments,
}
