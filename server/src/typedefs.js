import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    users(query: String, first: Int, after: String, skip: Int): [User!]!
    posts(query: String, first: Int, skip: Int, after: String): [Post!]!
    myPosts(query: String, first: Int, skip: Int, after: String): [Post!]!
    comments(
      postId: ID!
      query: String
      first: Int
      skip: Int
      after: String
    ): [Comment!]!
    me: User
    user(id: ID!): User!
    post(id: ID!): Post!
  }

  type Mutation {
    createUser(data: CreateUserInput!): AuthPayload!
    login(data: LoginUserInput!): AuthPayload!
    deleteUser: User!
    updateUser(data: UpdateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    createPinned(postId: ID!): Pinned!
    createFeatured(postId: ID!): Featured!
    deletePinned(id: ID!): Pinned!
    deleteFeatured(id: ID!): Featured!
    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
  }

  type Subscription {
    post: PostSubscriptionPayload!
    comment(postId: ID!): CommentSubscriptionPayload!
    myPost: PostSubscriptionPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    avatar: String
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    avatar: String
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean
    allowComments: Boolean
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
    allowComments: Boolean
  }

  input CreateCommentInput {
    text: String!
    postId: ID!
  }

  input UpdateCommentInput {
    text: String
  }

  type User {
    id: ID!
    name: String!
    email: String
    password: String!
    avatar: String
    pinnedPosts: [Post!]!
    featuredPost: Post
    posts: [Post!]!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Pinned {
    id: ID!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type Featured {
    id: ID!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    allowComments: Boolean!
    featuredBy: User
    pinGazers: [User!]!
    author: User!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }

  type PostSubscriptionPayload {
    mutation: MutationType!
    node: Post
  }

  type CommentSubscriptionPayload {
    mutation: MutationType!
    node: Comment
  }
`

export default typeDefs
