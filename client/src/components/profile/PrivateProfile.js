import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/auth'
import { getUnpub } from '../../actions/profile'
import Post from './Post'

const PrivateProfile = ({
  profileId,
  auth: { loading, user },
  profile: { unpub },
  deleteUser,
  getUnpub,
  history,
}) => {
  useEffect(() => {
    getUnpub()
  }, [getUnpub, loading])

  return (
    !loading &&
    user &&
    user.id === profileId && (
      <>
        <div className="profile-tempposts">
          <h2 className="text-primary my-1">
            <i className="fas fa-pen" />
            Unpublished posts ({unpub.length})
          </h2>
          {unpub.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
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
      </>
    )
  )
}

PrivateProfile.propTypes = {
  profileId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getUnpub: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { deleteUser, getUnpub })(
  withRouter(PrivateProfile),
)
