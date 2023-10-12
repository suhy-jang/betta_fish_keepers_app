import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import TextInput from '../utils/TextInput'

const UpdateUser = ({
  setAlert,
  auth: { isAuthenticated, loading, user },
  updateUser,
}) => {
  const navigate = useNavigate()
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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !password2) {
      setAlert('Do not leave blank fields', 'danger')
    } else if (password !== password2) {
      setAlert(`Password do not match`, 'danger')
    } else if (password.length < 8) {
      setAlert(`Password must be 8 characters or longer.`, 'danger')
    } else {
      updateUser({ name, email, password }, () => {
        navigate('/')
      })
    }
  }

  return (
    <>
      <h1 className="text-purple-800 large">Edit User Info</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <TextInput name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <TextInput
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <TextInput
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="bg-purple-300 btn hover:bg-purple-700"
        />
      </form>
    </>
  )
}

UpdateUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { setAlert, updateUser })(UpdateUser)
