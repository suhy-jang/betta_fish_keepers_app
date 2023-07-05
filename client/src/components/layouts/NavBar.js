import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import SearchBar from './SearchBar'

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  )

  const authLinks = (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alert" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  )

  return (
    <nav className="navbar bg-purple-200">
      <h1>
        <Link to="/">
          <i className="fas fa-water" /> Betta Fish Keepers{' '}
          <span className="hide-sm">Community</span>
        </Link>
      </h1>
      <ul>
        <li>
          <SearchBar />
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        {!loading && isAuthenticated ? authLinks : guestLinks}
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
