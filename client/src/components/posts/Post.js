import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Avatar from '../avatar/Avatar'

const Post = ({ post }) => {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="my-1 cursor-pointer btn bg-purple-50 hover:bg-purple-300"
    >
      <div className="flex flex-row bg-white bg-opacity-50">
        <div>
          <div className="m-3 w-45px">
            <Link to={`/profile/${post.author.id}`}>
              <Avatar avatar={post.author.avatar} className="my-1 round-img" />
            </Link>
          </div>
        </div>
        <div className="flex-grow p-1">
          <h4 className="font-bold">{post.author.name}</h4>

          <div className="post-title">{post.title}</div>
          <p className="my-1">{post.body}</p>
          <button className="bg-purple-100 rounded-lg btn" disabled>
            <i className="fas fa-thumbtack" /> {post.pinGazers.length}
          </button>
          <button className="bg-purple-100 rounded-lg btn " disabled>
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
