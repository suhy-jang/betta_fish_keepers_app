import {
  SEARCH_QUERY,
  SEARCH_PROFILE,
  SEARCH_POST,
  SEARCH_ERROR,
} from '../utils/types'

const initialState = {
  query: '',
  profiles: [],
  posts: [],
  loading: false,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SEARCH_QUERY:
      return {
        ...state,
        loading: true,
        query: payload,
      }
    case SEARCH_PROFILE:
      return {
        ...state,
        loading: false,
        profiles: payload,
      }
    case SEARCH_POST:
      return {
        ...state,
        loading: false,
        posts: payload,
      }
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
