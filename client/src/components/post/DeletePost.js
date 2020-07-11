import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/post'

const DeletePost = ({ postId, deletePost, history }) => {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={e => {
        deletePost(postId, history, '/')
      }}
    >
      <i className="fas fa-times" />
    </button>
  )
}

DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
}

export default connect(null, { deletePost })(withRouter(DeletePost))
