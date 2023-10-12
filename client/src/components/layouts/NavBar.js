import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import SearchBar from './SearchBar'

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const navigate = useNavigate()

  const signout = () => {
    logout(() => {
      navigate('/')
    })
  }

  return (
    <nav className="bg-purple-200 navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-water" /> Betta Fish Keepers{' '}
          <span className="d-none d-md-inline-block">Community</span>
        </Link>
      </h1>
      <ul>
        <li>
          <SearchBar />
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        {!loading && isAuthenticated && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li onClick={signout}>
              <Link to="/">
                <span className="d-none d-md-inline-block">Logout</span>
              </Link>
            </li>
          </>
        )}
        {!loading && !isAuthenticated && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(NavBar)
