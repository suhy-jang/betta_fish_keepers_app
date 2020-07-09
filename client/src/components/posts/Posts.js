import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { getPosts } from '../../actions/post'

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  const renderPost = ({
    id,
    title,
    body,
    allowComments,
    author,
    comments,
    pinGazers,
    featured,
    createdAt,
    updatedAt,
  }) => (
    <>
      <div>
        <Link to="/profile">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h4>{author.name}</h4>
        </Link>
      </div>
      <div>
        <div>{title}</div>
        <p className="my-1">{body}</p>
        <button className="btn btn-light pin">
          <i className="fas fa-thumbtack"></i> {pinGazers.length}
        </button>
        <a href="post.html" className="btn btn-primary">
          Discussion({comments.length})
        </a>
        <span>
          Updated at <Moment format="YYYY/MM/DD">{updatedAt}</Moment>
        </span>
      </div>
    </>
  )

  return loading ? (
    <div>loading...</div>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>

      <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea cols="30" rows="5" placeholder="Create a post"></textarea>
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>
        <div className="posts">
          {posts.map(post => (
            <div key={post.id} className="post bg-white my-1">
              {renderPost(post)}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts)
