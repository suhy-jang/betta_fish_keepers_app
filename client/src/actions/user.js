import axios from 'axios'
import { setAlert } from './alert'
import {
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  USER_SUCCESS,
  USER_ERROR,
} from '../utils/types'
import { gqlGetUser, gqlSearchUsers } from './gqlOperations'

// Load Certain User
export const getProfile = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { id }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlGetUser, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: PROFILE_FAILURE })
    }

    dispatch({
      type: PROFILE_SUCCESS,
      payload: data.user,
    })
  } catch (err) {
    dispatch({ type: PROFILE_FAILURE })
  }
}

export const searchUsers = (query, history, redirectTo) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { query }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlSearchUsers, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: USER_ERROR })
    }
    dispatch({ type: USER_SUCCESS, payload: data.users })
    history.push(redirectTo)
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.statusText, status: err.status },
    })
  }
}
