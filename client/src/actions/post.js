import axios from 'axios'
import { setAlert } from './alert'
import {
  gqlGetPosts,
  gqlGetSinglePost,
  gqlCreatePost,
  gqlDeletePost,
  gqlCreateComment,
  gqlDeleteComment,
} from './gqlOperations'
import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  CREATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  POST_ERROR,
} from '../utils/types'

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
  dispatch({ type: POST_LOADING, payload: '' })
  const variables = { id }

  try {
    const res = await axios.post('/graphql', {
      query: gqlGetSinglePost,
      variables,
    })

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
      payload: { msg: err.statusText, status: err.status },
    })
  }
}

// Create post
export const createPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { data: formData }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlCreatePost, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      console.error(errors)
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch({
      type: CREATE_POST,
      payload: data.createPost,
    })

    dispatch(setAlert('Post Created', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete post
export const deletePost = (id, history, redirectTo) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = { id }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlDeletePost, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    history.push(redirectTo)

    dispatch(setAlert('Post Deleted'))
    dispatch({
      type: DELETE_POST,
      payload: data.deletePost,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create comment
export const createComment = (text, post) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = {
    data: {
      text,
      post,
    },
  }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlCreateComment, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch(setAlert('Comment Created', 'success'))
    dispatch({
      type: CREATE_COMMENT,
      payload: data.createComment,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Delete comment
export const deleteComment = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const variables = {
    id,
  }

  try {
    const res = await axios.post(
      '/graphql',
      { query: gqlDeleteComment, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch(setAlert('Comment Deleted'))
    dispatch({
      type: DELETE_COMMENT,
      payload: data.deleteComment,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}
