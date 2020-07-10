import { PROFILE_SUCCESS, PROFILE_FAILURE } from '../utils/types'

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      }
    case PROFILE_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
