import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import { deleteUser } from '../../actions/auth'

const Dashboard = ({ auth: { loading, user }, post: { posts }, history }) => {
  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user.name}
      </p>
      <div className="dash-buttons">
        <a href={`/profile/${user.id}`} className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> View Profile
        </a>
        <a href="/updateUserInfo" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Edit User Info
        </a>
      </div>

      <div className="profile-posts">
        <h2 className="text-dark my-1">
          <i className="fas fa-pen" /> My Posts
        </h2>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </div>
      <div className="my-2">
        <button
          className="btn btn-danger"
          onClick={e => {
            if (window.confirm('Are you sure?')) {
              deleteUser(history, '/')
            }
          }}
        >
          <i className="fas fa-user-minus" />
          Delete My Account
        </button>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps)(withRouter(Dashboard))
