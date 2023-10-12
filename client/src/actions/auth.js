import axiosInstance from '../utils/axiosInstance'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from '../utils/types'
import {
  gqlCreateUser,
  gqlUpdateUser,
  gqlDeleteUser,
  gqlGetMe,
  gqlLogin,
} from './gqlOperations'

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/graphql', { query: gqlGetMe })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      return dispatch({ type: AUTH_ERROR, payload: errors })
    }

    dispatch({
      type: USER_LOADED,
      payload: data.me,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    })
  }
}

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const variables = {
      data: {
        name,
        email,
        password,
      },
    }

    try {
      const res = await axiosInstance.post('/graphql', {
        query: gqlCreateUser,
        variables,
      })

      const {
        data: { data, errors },
      } = res

      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
        return dispatch({ type: REGISTER_FAILURE })
      }

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.createUser,
      })

      dispatch(setAlert('Successfully sign up', 'success'))
      dispatch(loadUser())
    } catch (err) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: {
          msg: err.message || 'Request failed',
          status: err.response?.status || 500,
        },
      })
    }
  }

// Update User
export const updateUser = (formData, callback) => async (dispatch) => {
  const variables = {
    data: formData,
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlUpdateUser,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: USER_ERROR, payload: errors })
    }

    dispatch({
      type: UPDATE_USER,
      payload: data.updateUser,
    })

    dispatch(setAlert('Successfully updated user info', 'success'))
    callback?.()
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err })
  }
}

// Delete User
export const deleteUser = (callback) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/graphql', { query: gqlDeleteUser })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: USER_ERROR, payload: errors })
    }

    dispatch({
      type: DELETE_USER,
      payload: data.deleteUser,
    })

    callback()
  } catch (err) {
    dispatch(setAlert('Unable to delete user', 'danger'))
    dispatch({ type: USER_ERROR, payload: err })
  }
}

// Login User
export const login = (email, password) => async (dispatch) => {
  const variables = {
    data: {
      email,
      password,
    },
  }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlLogin,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: LOGIN_FAILURE })
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.login,
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg: err.statusText, status: err.status },
    })
  }
}

// Logout
export const logout = (callback) => (dispatch) => {
  dispatch({ type: LOGOUT })
  callback()
}
