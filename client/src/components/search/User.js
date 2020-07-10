import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../avatar/Avatar'

const User = ({ user }) => {
  return (
    <div className="user bg-light">
      <Avatar avatar={user.avatar} className="round-img" />
      <div>
        <h2>{user.name}</h2>
        <a href={`/profile/${user.id}`} className="btn btn-primary">
          View profile
        </a>
      </div>

      <ul>
        <li className="text-primary">
          <i className="fas fa-pen"></i> posts: {user.posts.length}
        </li>
      </ul>
    </div>
  )
}

User.propTypes = {}

export default User
