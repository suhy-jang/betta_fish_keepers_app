import { GET_PROFILE, PROFILE_ERROR } from '../utils/types'

const initialState = {
  profile: null,
  loading: false,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
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
