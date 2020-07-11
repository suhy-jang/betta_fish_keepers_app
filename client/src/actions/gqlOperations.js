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
    posts(orderBy: createdAt_DESC) {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const FRAGMENT_COMMENT_FIELDS = gql`
  fragment commentData on Comment {
    id
    text
    post {
      id
    }
    author {
      id
      name
      avatar
    }
    createdAt
    updatedAt
  }
`

const gqlGetSinglePost = gql`
  query($id: ID!) {
    post(id: $id) {
      ...postData
      allowComments
      comments {
        ...commentData
      }
    }
  }
  ${FRAGMENT_POST_FIELDS}
  ${FRAGMENT_COMMENT_FIELDS}
`

const gqlGetProfile = gql`
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

const gqlSearchProfiles = gql`
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

const gqlSearchPosts = gql`
  query($query: String!) {
    posts(query: $query, orderBy: createdAt_DESC) {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlCreatePost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      ...postData
      published
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlCreateComment = gql`
  mutation($data: CreateCommentInput!) {
    createComment(data: $data) {
      ...commentData
    }
  }
  ${FRAGMENT_COMMENT_FIELDS}
`

const gqlDeleteComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      ...commentData
    }
  }
  ${FRAGMENT_COMMENT_FIELDS}
`

const gqlDeletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

export {
  gqlCreateUser,
  gqlUpdateUser,
  gqlGetMe,
  gqlLogin,
  gqlGetPosts,
  gqlGetSinglePost,
  gqlGetProfile,
  gqlSearchProfiles,
  gqlSearchPosts,
  gqlCreatePost,
  gqlDeletePost,
  gqlCreateComment,
  gqlDeleteComment,
}
