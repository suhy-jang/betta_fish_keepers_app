import axios from 'axios'
import { setAlert } from './alert'
import {
  PROFILE_LOADING,
  GET_PROFILE,
  UNPUB_LOADING,
  GET_UNPUB,
  PROFILE_ERROR,
} from '../utils/types'
import { gqlGetProfile, gqlMyUnpubPosts } from './gqlOperations'

// Load Profile
export const getProfile = id => async dispatch => {
  dispatch({ type: PROFILE_LOADING })

  const variables = { id }

  try {
    const res = await axios.post('/graphql', {
      query: gqlGetProfile,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: PROFILE_ERROR })
    }

    dispatch({ type: GET_PROFILE, payload: data.user })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    })
  }
}

// Load current user additional profile info
export const getUnpub = () => async dispatch => {
  dispatch({ type: UNPUB_LOADING })

  try {
    const res = await axios.post('/graphql', {
      query: gqlMyUnpubPosts,
    })

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: PROFILE_ERROR })
    }

    dispatch({ type: GET_UNPUB, payload: data.myUnpubPosts })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    })
  }
}
