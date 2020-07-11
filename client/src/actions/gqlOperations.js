import gql from 'graphql-tag'

const gqlCreateUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
    }
  }
`

const FRAGMENT_USER_FIELDS = gql`
  fragment userData on User {
    id
    name
    email
    avatar
    pinnedPosts {
      id
    }
    featuredPost {
      id
    }
  }
`

const gqlUpdateUser = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      ...userData
    }
  }
  ${FRAGMENT_USER_FIELDS}
`

const gqlDeleteUser = gql`
  mutation {
    deleteUser {
      ...userData
    }
  }
  ${FRAGMENT_USER_FIELDS}
`

const gqlGetMe = gql`
  query {
    me {
      ...userData
    }
  }
  ${FRAGMENT_USER_FIELDS}
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
      id
      user {
        id
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
      published
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
      ...userData
      pinnedPosts {
        id
        post {
          ...postData
        }
      }
      featuredPost {
        id
        post {
          ...postData
        }
      }
      posts {
        ...postData
      }
    }
  }
  ${FRAGMENT_USER_FIELDS}
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

const gqlUpdatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
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

const gqlCreatePinned = gql`
  mutation($id: ID!) {
    createPinned(id: $id) {
      id
      user {
        id
        avatar
      }
    }
  }
`

const gqlDeletePinned = gql`
  mutation($id: ID!) {
    deletePinned(id: $id) {
      id
    }
  }
`

const gqlCreateFeatured = gql`
  mutation($id: ID!) {
    createFeatured(id: $id) {
      id
      post {
        id
      }
    }
  }
`

const gqlDeleteFeatured = gql`
  mutation($id: ID!) {
    deleteFeatured(id: $id) {
      id
      post {
        id
      }
    }
  }
`

export {
  gqlCreateUser,
  gqlUpdateUser,
  gqlDeleteUser,
  gqlGetMe,
  gqlLogin,
  gqlGetPosts,
  gqlGetSinglePost,
  gqlGetProfile,
  gqlSearchProfiles,
  gqlSearchPosts,
  gqlCreatePost,
  gqlUpdatePost,
  gqlDeletePost,
  gqlCreateComment,
  gqlDeleteComment,
  gqlCreatePinned,
  gqlDeletePinned,
  gqlCreateFeatured,
  gqlDeleteFeatured,
}
