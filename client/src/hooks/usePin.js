import { useDispatch } from 'react-redux'
import { createPinned, deletePinned } from '../actions/post'

export const usePin = () => {
  const dispatch = useDispatch()

  const pinPost = (postId) => {
    dispatch(createPinned(postId))
  }

  const unpinPost = (postId) => {
    dispatch(deletePinned(postId))
  }

  return {
    pinPost,
    unpinPost,
  }
}
