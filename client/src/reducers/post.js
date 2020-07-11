import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  CREATE_COMMENT,
  POST_ERROR,
} from '../utils/types'

const initialState = {
  posts: [],
  post: {
    pinGazers: [],
    author: {
      name: null,
      avatar: null,
    },
    createdAt: null,
    comments: [],
  },
  loading: false,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      }
    case CREATE_POST:
      if (!payload.published) {
        return state
      }
      return {
        ...state,
        posts: [payload, ...state.posts],
      }
    case CREATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: [...state.post.comments, payload] },
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
