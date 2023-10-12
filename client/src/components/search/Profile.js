import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from '../avatar/Avatar'

const Profile = ({ profile }) => {
  return (
    <div className="user bg-light">
      <Avatar avatar={profile.avatar} className="round-img" />
      <div>
        <h2>{profile.name}</h2>
        <Link
          to={`/profile/${profile.id}`}
          className="bg-purple-300 btn hover:bg-purple-700"
        >
          View profile
        </Link>
      </div>

      <ul>
        <li className="text-purple-800">
          <i className="fas fa-pen"></i> {profile.posts.length}
        </li>
      </ul>
    </div>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Profile
