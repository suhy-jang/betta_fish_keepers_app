import React from 'react'
import PropTypes from 'prop-types'

const Pin = ({ user, post, pinPost, unpinPost }) => {
  const pinned = user && post && post.pinGazers.some((p) => p.id === user.id)

  const onClickPin = (e) => {
    e.stopPropagation()
    pinned ? unpinPost(post.id) : pinPost(post.id)
  }

  return (
    <button
      className={`btn ${
        pinned
          ? 'bg-purple-300 hover:bg-gray-300'
          : 'bg-gray-300 hover:bg-purple-300'
      }`}
      onClick={onClickPin}
      disabled={!user || !post.published}
    >
      <i className="fas fa-thumbtack" aria-hidden="true" aria-label="pin" />{' '}
      {post.pinGazers.length}
    </button>
  )
}

Pin.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  pinPost: PropTypes.func.isRequired,
  unpinPost: PropTypes.func.isRequired,
}

export default Pin
