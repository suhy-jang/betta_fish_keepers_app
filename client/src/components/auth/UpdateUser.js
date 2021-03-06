import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../actions/auth'
import { setAlert } from '../../actions/alert'

const UpdateUser = ({
  setAlert,
  auth: { isAuthenticated, loading, user },
  updateUser,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  useEffect(() => {
    if (!loading && user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        password2: '',
      })
    }
    // eslint-disable-next-line
  }, [isAuthenticated, loading, user])

  const { name, email, password, password2 } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (!name || !email || !password || !password2) {
      setAlert('Do not leave blank fields', 'danger')
    } else if (password !== password2) {
      setAlert(`Password do not match`, 'danger')
    } else if (password.length < 8) {
      setAlert(`Password must be 8 characters or longer.`, 'danger')
    } else {
      updateUser({ name, email, password }, history, '/')
    }
  }

  return (
    <>
      <h1 className="large text-primary">Edit User Info</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </>
  )
}

UpdateUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { setAlert, updateUser })(
  withRouter(UpdateUser),
)
