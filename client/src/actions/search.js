import axios from 'axios'
import { setAlert } from './alert'
import {
  SEARCH_QUERY,
  SEARCH_PROFILE,
  SEARCH_POST,
  SEARCH_ERROR,
} from '../utils/types'
import { gqlSearchProfiles, gqlSearchPosts } from './gqlOperations'

// Load Search Results
export const search = (query, history, redirectTo) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { query }

  dispatch({ type: SEARCH_QUERY, payload: query })

  try {
    let data = await userSearch(dispatch, variables, config)
    if (data) dispatch({ type: SEARCH_PROFILE, payload: data.users })
    data = await postSearch(dispatch, variables, config)
    if (data) dispatch({ type: SEARCH_POST, payload: data.posts })
    history.push(redirectTo)
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.statusText, status: err.status },
    })
  }
}

const userSearch = async (dispatch, variables, config) => {
  const res = await axios.post(
    '/graphql',
    { query: gqlSearchProfiles, variables },
    config,
  )

  return errorHandling(dispatch, res)
}

const postSearch = async (dispatch, variables, config) => {
  const res = await axios.post(
    '/graphql',
    { query: gqlSearchPosts, variables },
    config,
  )

  return errorHandling(dispatch, res)
}

const errorHandling = (dispatch, res) => {
  const {
    data: { data, errors },
  } = res

  if (!data) {
    errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
    return dispatch({ type: SEARCH_ERROR })
  }
  return data
}
