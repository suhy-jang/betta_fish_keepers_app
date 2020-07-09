import axios from 'axios'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
} from '../utils/types'
import setAuthToken from '../utils/setAuthToken'
import { createUser, getMe } from './gqlOperations'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.post('/graphql', { query: getMe })

    if (!res.data.data) {
      dispatch({
        type: AUTH_ERROR,
      })
    }

    dispatch({
      type: USER_LOADED,
      payload: res.data.data.me,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
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

  try {
    const res = await axios.post(
      '/graphql',
      { query: createUser, variables },
      config,
    )

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data.createUser,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: REGISTER_FAILURE })
  }
}
