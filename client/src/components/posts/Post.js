import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Avatar from '../avatar/Avatar'

const Post = ({ post }) => {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="btn bg-purple-50 hover:bg-purple-300 cursor-pointer my-1"
    >
      <div className="post bg-white bg-opacity-50">
        <div>
          <Link to={`/profile/${post.author.id}`}>
            <Avatar avatar={post.author.avatar} className="round-img my-1" />
            <h4>{post.author.name}</h4>
          </Link>
        </div>
        <div className="p-1">
          <div className="post-title">{post.title}</div>
          <p className="my-1">{post.body}</p>
          <button className="btn bg-purple-100 rounded-lg" disabled>
            <i className="fas fa-thumbtack" /> {post.pinGazers.length}
          </button>
          <button className="btn bg-purple-100 rounded-lg " disabled>
            <i className="fas fa-comment" /> {post.comments.length}
          </button>
          <span className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
          </span>
        </div>
      </div>
    </Link>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
