import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR } from '../utils/types'
import { gqlGetProfile } from './gqlOperations'

// Load Profile
export const getProfile = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { id }
  dispatch({ type: GET_PROFILE, payload: null })

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlGetProfile, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: PROFILE_ERROR })
    }

    dispatch({ type: GET_PROFILE, payload: data.user })
  } catch (err) {
    dispatch({ type: PROFILE_ERROR })
  }
}
