import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../avatar/Avatar'

const Profile = ({ profile }) => {
  return (
    <div className="user bg-light">
      <Avatar avatar={profile.avatar} className="round-img" />
      <div>
        <h2>{profile.name}</h2>
        <a href={`/profile/${profile.id}`} className="btn btn-primary">
          View profile
        </a>
      </div>

      <ul>
        <li className="text-primary">
          <i className="fas fa-pen"></i> posts: {profile.posts.length}
        </li>
      </ul>
    </div>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Profile
