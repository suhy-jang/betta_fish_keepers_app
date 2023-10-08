const gqlCreateUser = `
  mutation ($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        avatar
      }
    }
  }
`

const FRAGMENT_USER_FIELDS = `
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

const gqlUpdateUser = `
  mutation ($data: UpdateUserInput!) {
    updateUser(data: $data) {
      ...userData
    }
  }
  ${FRAGMENT_USER_FIELDS}
`

const gqlDeleteUser = `
  mutation {
    deleteUser {
      ...userData
    }
  }
  ${FRAGMENT_USER_FIELDS}
`

const gqlGetMe = `
  query {
    me {
      ...userData
    }
  }
  ${FRAGMENT_USER_FIELDS}
`

const gqlLogin = `
  mutation ($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        avatar
      }
    }
  }
`

const FRAGMENT_POST_FIELDS = `
  fragment postData on Post {
    id
    title
    body
    published
    allowComments
    featuredBy {
      id
    }
    createdAt
    updatedAt
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
      name
    }
  }
`

const gqlGetPosts = `
  query {
    posts {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const FRAGMENT_COMMENT_FIELDS = `
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

const gqlGetSinglePost = `
  query ($id: ID!) {
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

const gqlGetProfile = `
  query ($id: ID!) {
    user(id: $id) {
      ...userData
      pinnedPosts {
        ...postData
      }
      featuredPost {
        ...postData
      }
      posts {
        ...postData
      }
    }
  }
  ${FRAGMENT_USER_FIELDS}
  ${FRAGMENT_POST_FIELDS}
`

const gqlMyPosts = `
  query {
    myPosts {
      ...postData
      published
      allowComments
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlSearchProfiles = `
  query ($query: String!) {
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

const gqlSearchPosts = `
  query ($query: String!) {
    posts(query: $query) {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlCreatePost = `
  mutation ($data: CreatePostInput!) {
    createPost(data: $data) {
      ...postData
      published
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlUpdatePost = `
  mutation ($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      ...postData
      published
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlCreateComment = `
  mutation ($data: CreateCommentInput!) {
    createComment(data: $data) {
      ...commentData
    }
  }
  ${FRAGMENT_COMMENT_FIELDS}
`

const gqlDeleteComment = `
  mutation ($id: ID!) {
    deleteComment(id: $id) {
      ...commentData
    }
  }
  ${FRAGMENT_COMMENT_FIELDS}
`

const gqlDeletePost = `
  mutation ($id: ID!) {
    deletePost(id: $id) {
      ...postData
    }
  }
  ${FRAGMENT_POST_FIELDS}
`

const gqlCreatePinned = `
  mutation ($postId: ID!) {
    createPinned(postId: $postId) {
      id
      user {
        id
        avatar
      }
      post {
        id
      }
    }
  }
`

const gqlDeletePinned = `
  mutation ($postId: ID!) {
    deletePinned(postId: $postId) {
      id
      user {
        id
      }
      post {
        id
      }
    }
  }
`

const gqlCreateFeatured = `
  mutation ($postId: ID!) {
    createFeatured(postId: $postId) {
      id
      user {
        id
      }
      post {
        id
      }
    }
  }
`

const gqlDeleteFeatured = `
  mutation ($postId: ID!) {
    deleteFeatured(postId: $postId) {
      id
      user {
        id
      }
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
  gqlMyPosts,
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
