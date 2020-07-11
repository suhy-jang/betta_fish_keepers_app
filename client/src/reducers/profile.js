import {
  PROFILE_LOADING,
  GET_PROFILE,
  UNPUB_LOADING,
  GET_UNPUB,
  PROFILE_ERROR,
} from '../utils/types'

const initialState = {
  profile: {
    id: null,
    name: null,
    avatar: null,
    featuredPost: null,
    pinnedPosts: null,
    posts: null,
  },
  unpub: [],
  loading: false,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        profile: initialState.profile,
      }
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      }
    case UNPUB_LOADING:
      return {
        ...state,
        loading: true,
        unpub: [],
      }
    case GET_UNPUB:
      return {
        ...state,
        loading: false,
        unpub: payload,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
