import React from 'react'
import PropTypes from 'prop-types'

const PrivateLink = props => {
  const onClick = e => {
    console.log('delete account')
  }
  return (
    <div className="profile-update">
      <a href="/updateUserInfo" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Info
      </a>
      <button className="btn btn-danger" onClick={e => onClick(e)}>
        <i className="fas fa-user-minus" /> Delete My Account
      </button>
    </div>
  )
}

PrivateLink.propTypes = {}

export default PrivateLink
