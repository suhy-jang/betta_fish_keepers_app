import axios from 'axios'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../utils/types'
import setAuthToken from '../utils/setAuthToken'
import { gqlCreateUser, gqlGetMe, gqlLogin } from './gqlOperations'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const res = await axios.post('/graphql', { query: gqlGetMe })

  const {
    data: { data },
  } = res

  if (!data) {
    return dispatch({ type: AUTH_ERROR })
  }

  dispatch({
    type: USER_LOADED,
    payload: data.me,
  })
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = {
    data: {
      name,
      email,
      password,
    },
  }

  const res = await axios.post(
    '/graphql',
    { query: gqlCreateUser, variables },
    config,
  )

  const {
    data: { data, errors },
  } = res

  if (!data) {
    errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
    return dispatch({ type: REGISTER_FAILURE })
  }

  dispatch({
    type: REGISTER_SUCCESS,
    payload: data.createUser,
  })

  dispatch(loadUser())
}

// Login User
export const login = (email, password) => async dispatch => {
  if (!email || !password) {
    const msg = !email ? 'email' : 'password'
    return dispatch(setAlert(`Enter your ${msg}!`, 'danger'))
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = {
    data: {
      email,
      password,
    },
  }

  const res = await axios.post(
    '/graphql',
    { query: gqlLogin, variables },
    config,
  )

  const {
    data: { data, errors },
  } = res

  if (!data) {
    errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
    return dispatch({ type: LOGIN_FAILURE })
  }

  dispatch({
    type: LOGIN_SUCCESS,
    payload: data.login,
  })

  dispatch(loadUser())
}
