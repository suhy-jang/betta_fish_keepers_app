import axios from 'axios'
import { setAlert } from './alert'
import { PROFILE_SUCCESS, PROFILE_FAILURE } from '../utils/types'
import { gqlGetUser } from './gqlOperations'

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
