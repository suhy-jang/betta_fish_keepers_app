import axiosInstance from '../utils/axiosInstance'
import { PROFILE_LOADING, GET_PROFILE, PROFILE_ERROR } from '../utils/types'
import { gqlGetProfile } from './gqlOperations'
import { setAlert } from './alert'

// Load Profile
export const getProfile = (id) => async (dispatch) => {
  dispatch({ type: PROFILE_LOADING })

  const variables = { id }

  try {
    const res = await axiosInstance.post('/graphql', {
      query: gqlGetProfile,
      variables,
    })

    const {
      data: { data, errors },
    } = res

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')))
      return dispatch({ type: PROFILE_ERROR, payload: errors })
    }

    dispatch({ type: GET_PROFILE, payload: data.user })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    })
  }
}
