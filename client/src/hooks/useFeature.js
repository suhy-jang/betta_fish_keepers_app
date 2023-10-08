import { useDispatch } from 'react-redux'
import { createFeatured, deleteFeatured } from '../actions/post'

export const useFeature = () => {
  const dispatch = useDispatch()

  const featurePost = (postId) => {
    dispatch(createFeatured(postId))
  }

  const unfeaturePost = (postId) => {
    dispatch(deleteFeatured(postId))
  }

  return {
    featurePost,
    unfeaturePost,
  }
}
