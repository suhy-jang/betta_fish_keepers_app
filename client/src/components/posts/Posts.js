import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from './Post'
import CreatePost from './CreatePost'
import { getPosts } from '../../actions/post'

const Posts = ({ auth: { user }, post: { posts }, getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return (
    <Fragment>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <CreatePost />
      <div className="posts">
        {user &&
          posts &&
          posts.map((post) => <Post key={post.id} post={post} user={user} />)}
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts)
