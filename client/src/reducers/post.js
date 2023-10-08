import {
  GET_POSTS,
  GET_POST,
  GET_MY_POSTS,
  POST_LOADING,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CREATE_PINNED,
  DELETE_PINNED,
  CREATE_FEATURED,
  DELETE_FEATURED,
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
  myPosts: [],
  loading: false,
  error: {},
}

export default function postReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        post: initialState.post,
        loading: true,
      }
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
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: payload,
        loading: false,
      }
    case CREATE_POST:
      return {
        ...state,
        posts: payload.published ? [payload, ...state.posts] : state.posts,
        post: payload,
        loading: false,
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: payload.published
          ? [payload, ...state.posts.filter((p) => p.id !== payload)]
          : state.posts,
        post: payload,
        loading: false,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload.id),
      }
    case CREATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: [...state.post.comments, payload] },
      }
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment.id !== payload.id,
          ),
        },
      }
    case CREATE_PINNED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.post.id) {
            return {
              ...post,
              pinGazers: [...post.pinGazers, payload.user],
            }
          } else {
            return post
          }
        }),
        post: {
          ...state.post,
          pinGazers: [...state.post.pinGazers, payload.user],
        },
      }
    case DELETE_PINNED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.post.id) {
            return {
              ...post,
              pinGazers: post.pinGazers.filter(
                (user) => user.id !== payload.user.id,
              ),
            }
          } else {
            return post
          }
        }),
        post: {
          ...state.post,
          pinGazers: state.post.pinGazers.filter(
            (user) => user.id !== payload.user.id,
          ),
        },
      }
    case CREATE_FEATURED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.post.id) {
            return {
              ...post,
              featuredBy: payload.user,
            }
          } else {
            return post
          }
        }),
        post: {
          ...state.post,
          featuredBy: payload.user,
        },
      }
    case DELETE_FEATURED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.post.id) {
            return {
              ...post,
              featuredBy: null,
            }
          } else {
            return post
          }
        }),
        post: {
          ...state.post,
          featuredBy: null,
        },
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
