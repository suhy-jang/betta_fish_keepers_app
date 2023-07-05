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
      <button className="btn btn-white pin" disabled>
        <i className="fas fa-thumbtack" /> {post.pinGazers.length}
      </button>
      <Link
        to={`/posts/${post.id}`}
        className="btn bg-purple-300 hover:bg-purple-700 cursor-pointer"
      >
        Discussion ({post.comments.length})
      </Link>
    </div>
  </div>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
