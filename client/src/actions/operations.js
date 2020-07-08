import gql from 'graphql-tag'

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`

const getPosts = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`

export { createUser, getPosts }
