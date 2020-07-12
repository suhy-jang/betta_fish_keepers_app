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
export const search = query => async dispatch => {
  dispatch({ type: SEARCH_QUERY, payload: query })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { query }

  try {
    let res = await axios.post(
      '/graphql',
      { query: gqlSearchProfiles, variables },
      config,
    )

    let data = errorHandling(dispatch, res)
    if (data) dispatch({ type: SEARCH_PROFILE, payload: data.users })

    res = await axios.post(
      '/graphql',
      { query: gqlSearchPosts, variables },
      config,
    )

    data = await errorHandling(dispatch, res)
    if (data) dispatch({ type: SEARCH_POST, payload: data.posts })
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.statusText, status: err.status },
    })
  }
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
