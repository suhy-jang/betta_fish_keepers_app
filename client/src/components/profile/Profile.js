import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import Post from '../posts/Post'
import { getProfile } from '../../actions/profile'

const Profile = ({
  auth: { user },
  profile: { loading, profile },
  getProfile,
}) => {
  const { id } = useParams()

  useEffect(() => {
    getProfile(id)
  }, [id, getProfile])

  return loading ? (
    <>loading...</>
  ) : (
    <>
      <div className="my-1 profile-grid">
        <div className="p-2 bg-purple-300 profile-top">
          <Avatar avatar={profile.avatar} className="my-1 round-img" />
          <h1 className="large">{profile.name}</h1>
          <p className="lead"></p>
        </div>
        <div className="profile-featuredpost">
          <h2 className="my-1 text-purple-800">
            <i className="fas fa-pen" /> Featured
          </h2>
          {profile.featuredPost && (
            <Post post={profile.featuredPost} user={user} />
          )}
        </div>
        <div className="profile-pinnedposts">
          <h2 className="my-1 text-purple-800">
            <i className="fas fa-pen" /> Pinned (
            {profile.pinnedPosts && profile.pinnedPosts.length})
          </h2>
          {profile.pinnedPosts &&
            profile.pinnedPosts.map((post) => (
              <Post key={post.id} post={post} user={user} />
            ))}
        </div>
        <div className="profile-posts">
          <h2 className="my-1 text-purple-800">
            <i className="fas fa-pen" /> Posts (
            {profile.posts && profile.posts.length})
          </h2>
          {profile.posts &&
            profile.posts.map((post) => (
              <Post key={post.id} post={post} user={user} />
            ))}
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
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfile })(Profile)
