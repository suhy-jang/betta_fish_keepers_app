import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPinned, deletePinned } from '../../actions/post'

const Pin = ({ auth, post, createPinned, deletePinned }) => {
  const pinned =
    !auth.loading &&
    !post.loading &&
    auth.isAuthenticated &&
    post.post.pinGazers.map(p => p.user.id).includes(auth.user.id)

  if (auth.loading || post.loading || !auth.isAuthenticated) {
    return (
      <button className="btn btn-light pin" disabled>
        <i className="fas fa-thumbtack" /> {post.post.pinGazers.length}
      </button>
    )
  }

  return (
    <button
      className={`btn btn-${pinned ? 'dark' : 'light'} pin`}
      onClick={() =>
        pinned ? deletePinned(post.post.id) : createPinned(post.post.id)
      }
    >
      <i className="fas fa-thumbtack" /> {post.post.pinGazers.length}
    </button>
  )
}

Pin.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  createPinned: PropTypes.func.isRequired,
  deletePinned: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { createPinned, deletePinned })(Pin)
