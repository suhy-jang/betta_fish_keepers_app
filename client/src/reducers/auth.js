import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from '../utils/types'

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  error: {},
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      const token = localStorage.getItem('token')
      return {
        ...state,
        token,
        isAuthenticated: !!token,
        loading: false,
        user: payload,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      }
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      }
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case AUTH_ERROR:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
    case DELETE_USER:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    default:
      return state
  }
}
