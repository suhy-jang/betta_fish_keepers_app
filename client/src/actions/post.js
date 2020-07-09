import axios from 'axios'
import { setAlert } from './alert'
import { gqlGetPosts, gqlGetPost } from './gqlOperations'
import { GET_POSTS, POST_ERROR, GET_POST } from '../utils/types'

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.post('/graphql', { query: gqlGetPosts })

    const {
      data: { data, errors },
    } = res

    if (!data) {
      dispatch(setAlert('Unable to load posts', 'danger'))
      return dispatch({ type: POST_ERROR, payload: errors[0].message })
    }

    dispatch({
      type: GET_POSTS,
      payload: data.posts,
    })
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err })
  }
}

// Get post
export const getPost = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { id }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlGetPost, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch({
      type: GET_POST,
      payload: data.post,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}
