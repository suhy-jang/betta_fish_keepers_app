import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Avatar from '../avatar/Avatar'

const Post = ({ post }) => {
  return (
    <div className="post bg-white my-1">
      <div>
        <Link to="/profile">
          <Avatar avatar={post.author.avatar} className="round-img my-1" />
          <h4>{post.author.name}</h4>
        </Link>
      </div>
      <div className="p-1">
        <div className="post-title">{post.title}</div>
        <p className="my-1">{post.body}</p>
        <button className="btn btn-light pin">
          <i className="fas fa-thumbtack" /> {post.pinGazers.length}
        </button>
        <Link to={`/posts/${post.id}`} className="btn btn-primary">
          Discussion ({post.comments.length})
        </Link>
        <span className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
        </span>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
