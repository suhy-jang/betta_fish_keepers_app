import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../utils/types'
import { createUser } from './operations'

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

  const body = { query: createUser, variables }

  try {
    const res = await axios.post('/graphql', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data.createUser,
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: REGISTER_FAILURE })
  }
}
