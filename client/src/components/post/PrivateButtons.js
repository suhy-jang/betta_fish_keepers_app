import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/post'

const PrivateButtons = ({ auth: { user }, deletePost, postId, authorId }) => {
  const navigate = useNavigate()

  return (
    user &&
    authorId === user.id && (
      <>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            navigate(`/posts/${postId}/edit`)
          }}
        >
          <i className="fas fa-wrench" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            deletePost(postId, () => {
              navigate('/')
            })
          }}
        >
          <i className="fas fa-times" />
        </button>
      </>
    )
  )
}

PrivateButtons.propTypes = {
  auth: PropTypes.object.isRequired,
  authorId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deletePost })(PrivateButtons)
