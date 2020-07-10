import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateProfile = ({ user }) => {
  const onClick = e => {
    console.log('delete account', user.id)
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

PrivateProfile.propTypes = {
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(PrivateProfile)
