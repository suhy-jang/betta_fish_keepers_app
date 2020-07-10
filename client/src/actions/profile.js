import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILES, GET_PROFILE, PROFILE_ERROR } from '../utils/types'
import { gqlGetProfile, gqlSearchProfiles } from './gqlOperations'

// Load Profile
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

    dispatch({
      type: GET_PROFILE,
      payload: data.user,
    })
  } catch (err) {
    dispatch({ type: PROFILE_ERROR })
  }
}

export const searchProfiles = (
  query,
  history,
  redirectTo,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { query }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlSearchProfiles, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: PROFILE_ERROR })
    }
    dispatch({ type: GET_PROFILES, payload: data.users })
    history.push(redirectTo)
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status },
    })
  }
}
