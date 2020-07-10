import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Post = ({ post }) =>
  post && (
    <div className="post bg-white my-1 p-1">
      <div>
        <h4>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h4>
        <p>{post.body}</p>
      </div>
      <div>
        <div className="btn btn-light pin">
          <i className="fas fa-thumbtack" /> {post.pinGazers.length}
        </div>
        <div>
          <Link to={`/posts/${post.id}`} className="btn btn-primary">
            Discussion ({post.comments.length})
          </Link>
        </div>
      </div>
    </div>
  )

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
