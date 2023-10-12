import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post'

const PrivateButtons = ({ postId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onDeletePost = () => {
    const action = deletePost(postId, () => {
      navigate('/')
    })
    dispatch(action)
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => {
          navigate(`/posts/${postId}/edit`)
        }}
      >
        <i className="fas fa-wrench" /> Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={onDeletePost}>
        <i className="fas fa-times" /> Delete
      </button>
    </>
  )
}

PrivateButtons.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default PrivateButtons
