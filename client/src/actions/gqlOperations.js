import gql from 'graphql-tag'

const gqlCreateUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
    }
  }
`

const gqlUpdateUser = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      avatar
    }
  }
`

const gqlGetMe = gql`
  query {
    me {
      id
      name
      email
      avatar
    }
  }
`

const gqlLogin = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`

const FRAGMENT_POST_FIELDS = gql`
  fragment postData on Post {
    id
    title
    body
    author {
      id
      name
      avatar
    }
    comments {
      id
    }
    pinGazers {
      user {
        id
        name
        avatar
      }
    }
    featuredBy {
      id
    }
    createdAt
    updatedAt
  }
`

const gqlGetPosts = gql`
  query {
    posts {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlGetSinglePost = gql`
  query($id: ID!) {
    post(id: $id) {
      ...postData
      allowComments
      comments {
        id
        text
        author {
          id
          name
          avatar
        }
        createdAt
        updatedAt
      }
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlGetUser = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      pinnedPosts {
        post {
          ...postData
        }
      }
      featuredPost {
        post {
          ...postData
        }
      }
      posts {
        ...postData
      }
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlSearchUsers = gql`
  query($query: String!) {
    users(query: $query) {
      id
      name
      avatar
      posts {
        id
      }
    }
  }
`

export {
  gqlCreateUser,
  gqlUpdateUser,
  gqlGetMe,
  gqlLogin,
  gqlGetPosts,
  gqlGetSinglePost,
  gqlGetUser,
  gqlSearchUsers,
}
