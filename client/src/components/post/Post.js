import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { getPost } from '../../actions/post'

const Post = ({ post: { post, loading }, getPost, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])

  const renderComment = comment => (
    <>
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h4>{comment.author.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{comment.createdAt}</Moment>
        </p>
      </div>
    </>
  )

  return loading || !post ? (
    <div>loading...</div>
  ) : (
    <>
      <div className="post-top">
        <a href="/posts" className="btn">
          Back To Posts
        </a>
        <div className="buttons">
          <button className="btn btn-light pin">
            <i className="fas fa-asterisk" /> Feature
          </button>
          <button className="btn btn-light pin">
            <i className="fas fa-thumbtack" /> {post.pinGazers.length}
          </button>
        </div>
      </div>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
            <h4>{post.author.name}</h4>
          </a>
        </div>
        <p className="my-1">{post.body}</p>
        <div>
          Posted on <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        {post.comments.map(comment => (
          <div key={comment.id} className="post bg-white p-1 my-1">
            {renderComment(comment)}
          </div>
        ))}
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
