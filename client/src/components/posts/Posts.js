import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from './Post'
import { getPosts } from '../../actions/post'

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

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
            <Post key={post.id} post={post} />
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
