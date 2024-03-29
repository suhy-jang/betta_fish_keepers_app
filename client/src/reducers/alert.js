import { SET_ALERT, REMOVE_ALERT } from '../utils/types'

const initialState = []

export default function alertReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ALERT:
      return [...state, payload]
    case REMOVE_ALERT:
      return state.filter(({ id }) => id !== payload)
    default:
      return state
  }
}
