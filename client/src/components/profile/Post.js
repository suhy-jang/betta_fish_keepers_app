import React from 'react'
import PropTypes from 'prop-types'

const Post = ({ post }) => (
  <div className="post bg-white my-1 p-1">
    <div>
      <h4>
        <a href="#">{post.title}</a>
      </h4>
      <p>{post.body}</p>
    </div>
    <div>
      <div className="btn btn-light pin">
        <i className="fas fa-thumbtack" /> {post.pinGazers.length}
      </div>
      <div>
        <a href="post.html" className="btn btn-primary">
          Discussion ({post.comments.length})
        </a>
      </div>
    </div>
  </div>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
