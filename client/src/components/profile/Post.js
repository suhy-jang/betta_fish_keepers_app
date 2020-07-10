import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Post = ({ post }) => (
  <div className="post bg-white my-1 p-1">
    <div className="p-1">
      <h4 className="post-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h4>
      <p>{post.body}</p>
    </div>
    <div className="p-1">
      <div className="btn btn-white pin">
        <i className="fas fa-thumbtack" /> {post.pinGazers.length}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-primary cursor-pointer">
        Discussion ({post.comments.length})
      </Link>
    </div>
  </div>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
