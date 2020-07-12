import React from 'react'
import PropTypes from 'prop-types'

const Post = ({ post }) => (
  <div class="post bg-white my-1 p-1">
    <div>
      <h4>
        <a href="#">{post.title}</a>
      </h4>
      <p>{post.body}</p>
    </div>
    <div>
      <div class="btn btn-light pin">
        <i class="fas fa-thumbtack" /> {post.pinGazers.length}
      </div>
      <a href={`/posts/${post.id}`} class="btn btn-primary">
        Discussion
      </a>
    </div>
  </div>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
