import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from '../avatar/Avatar'
import Post from './Post'
import { getProfile } from '../../actions/profile'

const Profile = ({ profile: { loading, profile }, getProfile, match }) => {
  useEffect(() => {
    getProfile(match.params.id)
  }, [getProfile, match.params.id])

  return (
    <>
      <div className="profile-grid my-1">
        <div className="profile-top bg-purple-300 p-2">
          <Avatar avatar={profile.avatar} className="round-img my-1" />
          <h1 className="large">{profile.name}</h1>
          <p className="lead"></p>
        </div>
        <div className="profile-featuredpost">
          <h2 className="text-purple-800 my-1">
            <i className="fas fa-pen" /> Featured
          </h2>
          {profile.featuredPost && <Post post={profile.featuredPost.post} />}
        </div>
        <div className="profile-pinnedposts">
          <h2 className="text-purple-800 my-1">
            <i className="fas fa-pen" /> Pinned (
            {profile.pinnedPosts && profile.pinnedPosts.length})
          </h2>
          {profile.pinnedPosts &&
            profile.pinnedPosts.map((post) => (
              <Post key={post.post.id} post={post.post} />
            ))}
        </div>
        <div className="profile-posts">
          <h2 className="text-purple-800 my-1">
            <i className="fas fa-pen" /> Posts (
            {profile.posts && profile.posts.length})
          </h2>
          {profile.posts &&
            profile.posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </>
  )
}

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfile })(Profile)
