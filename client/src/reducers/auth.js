import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
} from '../utils/types'

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case AUTH_ERROR:
    case REGISTER_FAILURE:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
