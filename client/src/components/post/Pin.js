import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPinned, deletePinned } from '../../actions/post'

const Pin = ({
  auth: { user },
  post: { post },
  createPinned,
  deletePinned,
}) => {
  const pinned =
    user && post && post.pinGazers.map((p) => p.id).includes(user.id)

  return (
    <button
      className={`btn bg-purple-100 rounded-lg hover:bg-purple-300`}
      onClick={() => (pinned ? deletePinned(post.id) : createPinned(post.id))}
      disabled={!user || !post.published}
    >
      <i className="fas fa-thumbtack" /> {post.pinGazers.length}
    </button>
  )
}

Pin.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  createPinned: PropTypes.func.isRequired,
  deletePinned: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { createPinned, deletePinned })(Pin)
