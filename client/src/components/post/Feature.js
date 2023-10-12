import React from 'react'
import PropTypes from 'prop-types'

const Feature = ({ user, post, featurePost, unfeaturePost, className }) => {
  const featured = post.featuredBy ? true : false
  const guest = !user || user.id !== post.author.id

  const onClickFeatured = (e) => {
    e.stopPropagation()
    !featured ? featurePost(post.id) : unfeaturePost(post.id)
  }

  return (
    <button
      className={`btn featured ${className} ${
        featured
          ? 'bg-purple-300 hover:bg-gray-300'
          : 'bg-gray-300 hover:bg-purple-300'
      }`}
      onClick={onClickFeatured}
      disabled={guest || !post.published}
    >
      <i className="fas fa-asterisk" /> Feature
    </button>
  )
}

Feature.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  featurePost: PropTypes.func.isRequired,
  unfeaturePost: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default Feature
