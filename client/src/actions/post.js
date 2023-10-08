import axiosInstance from '../utils/axiosInstance'
import { setAlert } from './alert'
import {
  gqlGetPosts,
  gqlMyPosts,
  gqlGetSinglePost,
  gqlCreatePost,
  gqlUpdatePost,
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
  GET_MY_POSTS,
  GET_POST,
  POST_LOADING,
  CREATE_POST,
  UPDATE_POST,
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
export const getPosts = () => async (dispatch) => {
  dispatch({ type: POST_LOADING, payload: '' })
  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlGetPosts,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      dispatch(setAlert('Unable to load posts', 'danger'))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    dispatch({
      type: GET_POSTS,
      payload: data.posts,
    })
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err })
  }
}

// Get my posts
export const getMyPosts = () => async (dispatch) => {
  dispatch({ type: POST_LOADING, payload: '' })
  try {
    const res = await axiosInstance.post('/graphql', { query: gqlMyPosts })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      dispatch(setAlert('Unable to load posts', 'danger'))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    dispatch({
      type: GET_MY_POSTS,
      payload: data.myPosts,
    })
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err })
  }
}

// Get post
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: POST_LOADING, payload: '' })

  const variables = { id }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlGetSinglePost,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      return dispatch({ type: POST_ERROR, payload: errors })
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

// Create post
export const createPost = (formData, callback) => async (dispatch) => {
  const variables = { data: formData }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlCreatePost,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    dispatch({
      type: CREATE_POST,
      payload: data.createPost,
    })

    dispatch(setAlert('Post Created', 'success'))

    callback(data.createPost.id)
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Update post
export const updatePost = (id, data, callback) => async (dispatch) => {
  const variables = { id, data }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlUpdatePost,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    dispatch({
      type: UPDATE_POST,
      payload: data.updatePost,
    })

    dispatch(setAlert('Post Updated', 'success'))

    callback(data.updatePost.id)
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Delete post
export const deletePost = (id, callback) => async (dispatch) => {
  const variables = { id }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlDeletePost,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    callback()

    dispatch(setAlert('Post Deleted'))
    dispatch({
      type: DELETE_POST,
      payload: data.deletePost,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    })
  }
}

// Create comment
export const createComment = (data) => async (dispatch) => {
  const variables = {
    data,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlCreateComment,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
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
export const deleteComment = (id) => async (dispatch) => {
  const variables = {
    id,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlDeleteComment,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
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
export const createPinned = (postId) => async (dispatch) => {
  // TODO: move headers into axiosInstance
  const variables = {
    postId,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlCreatePinned,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    // TODO: checking data -> errors
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
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
export const deletePinned = (postId) => async (dispatch) => {
  const variables = {
    postId,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlDeletePinned,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    dispatch(setAlert('This post is no longer marked as pinned.'))
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
export const createFeatured = (postId) => async (dispatch) => {
  const variables = {
    postId,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlCreateFeatured,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
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
export const deleteFeatured = (postId) => async (dispatch) => {
  const variables = {
    postId,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlDeleteFeatured,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: POST_ERROR, payload: errors })
    }

    dispatch(setAlert('This post is no longer marked as featured.'))
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
