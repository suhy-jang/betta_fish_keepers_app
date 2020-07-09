import gql from 'graphql-tag'

const gqlCreateUser = gql`
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

const gqlGetMe = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

const gqlLogin = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`

const gqlGetPosts = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`

export { gqlCreateUser, gqlGetMe, gqlLogin, gqlGetPosts }
