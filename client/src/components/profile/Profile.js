import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '../avatar/Avatar'
import Post from './Post'
import PrivateLink from './PrivateLink'
import { getProfile } from '../../actions/user'

const Profile = ({ user: { loading, user }, getProfile, match }) => {
  useEffect(() => {
    getProfile(match.params.id)
  }, [getProfile, match.params.id])

  return !loading && user ? (
    <>
      <a href="/" className="btn">
        Go Back
      </a>
      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <Avatar avatar={user.avatar} className="round-img my-1" />
          <h1 className="large">{user.name}</h1>
          <p className="lead"></p>
        </div>
        <div className="profile-featuredpost">
          <h2 className="text-primary my-1">
            <i className="fas fa-pen" /> Featured
          </h2>
          {user.featuredPost && <Post post={user.featuredPost.post} />}
        </div>
        <div className="profile-pinnedposts">
          <h2 className="text-primary my-1">
            <i className="fas fa-pen" /> Pinned
          </h2>
          {user.pinnedPosts &&
            user.pinnedPosts.map(post => (
              <Post key={post.id} post={post.post} />
            ))}
        </div>
        <div className="profile-posts">
          <h2 className="text-primary my-1">
            <i className="fas fa-pen" /> Posts
          </h2>
          {user.posts &&
            user.posts.map(post => <Post key={post.id} post={post} />)}
        </div>
        <PrivateLink user={user} />
      </div>
    </>
  ) : (
    <div>loading...</div>
  )
}

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, { getProfile })(Profile)
