import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createFeatured, deleteFeatured } from '../../actions/post'

const Feature = ({
  auth: { user },
  post: { post },
  createFeatured,
  deleteFeatured,
}) => {
  const featured = post.featuredBy ? true : false

  if (!user || user.id !== post.author.id) {
    return (
      <button className="btn btn-light pin" disabled>
        <i className="fas fa-asterisk" /> Feature
      </button>
    )
  }

  return (
    <button
      className={`btn btn-${featured ? 'dark' : 'light'} pin`}
      onClick={() =>
        featured ? deleteFeatured(post.id) : createFeatured(post.id)
      }
    >
      <i className="fas fa-asterisk" /> Feature
    </button>
  )
}

Feature.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  createFeatured: PropTypes.func.isRequired,
  deleteFeatured: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { createFeatured, deleteFeatured })(
  Feature,
)
