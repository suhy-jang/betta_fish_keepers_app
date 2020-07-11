import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/auth'

const PrivateProfile = ({ user, deleteUser, history }) => {
  return (
    <div className="profile-update">
      <a href="/updateUserInfo" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Info
      </a>
      <button
        className="btn btn-danger"
        onClick={e => {
          if (window.confirm('Are you sure?')) {
            deleteUser(history, '/')
          }
        }}
      >
        <i className="fas fa-user-minus" /> Delete My Account
      </button>
    </div>
  )
}

PrivateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { deleteUser })(
  withRouter(PrivateProfile),
)
