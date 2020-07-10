import {
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  USER_SUCCESS,
  USER_ERROR,
} from '../utils/types'

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      }
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        users: [],
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
