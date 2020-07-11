import axios from 'axios'
import { setAlert } from './alert'
import {
  gqlGetPosts,
  gqlGetSinglePost,
  gqlCreatePost,
  gqlDeletePost,
  gqlCreateComment,
  gqlDeleteComment,
  gqlCreatePinned,
  gqlDeletePinned,
  gqlCreateFeatured,
  gqlDeleteFeatured,
} from './gqlOperations'
import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  CREATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CREATE_PINNED,
  DELETE_PINNED,
  CREATE_FEATURED,
  DELETE_FEATURED,
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

// Create pinned post
export const createPinned = id => async dispatch => {
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
      { query: gqlCreatePinned, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch(setAlert('Successfully Pinned Post', 'success'))
    dispatch({
      type: CREATE_PINNED,
      payload: data.createPinned,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Delete pinned post
export const deletePinned = id => async dispatch => {
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
      { query: gqlDeletePinned, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch(setAlert('Removed Pin'))
    dispatch({
      type: DELETE_PINNED,
      payload: data.deletePinned,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Create featured post
export const createFeatured = id => async dispatch => {
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
      { query: gqlCreateFeatured, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch(setAlert('Successfully Featured Post', 'success'))
    dispatch({
      type: CREATE_FEATURED,
      payload: data.createFeatured,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Delete featured post
export const deleteFeatured = id => async dispatch => {
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
      { query: gqlDeleteFeatured, variables },
      config,
    )

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach(err => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: '' })
    }

    dispatch(setAlert('Removed Feature'))
    dispatch({
      type: DELETE_FEATURED,
      payload: data.deleteFeatured,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}
