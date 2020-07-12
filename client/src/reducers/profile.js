import { PROFILE_LOADING, GET_PROFILE, PROFILE_ERROR } from '../utils/types'

const initialState = {
  profile: {
    id: null,
    name: null,
    avatar: null,
    featuredPost: null,
    pinnedPosts: null,
    posts: null,
  },
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
