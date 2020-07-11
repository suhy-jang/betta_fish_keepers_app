import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/post'

const DeletePost = ({ user, deletePost, postId, authorId, history }) => {
  return (
    user &&
    authorId === user.id && (
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
  )
}

DeletePost.propTypes = {
  user: PropTypes.object.isRequired,
  authorId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { deletePost })(withRouter(DeletePost))
