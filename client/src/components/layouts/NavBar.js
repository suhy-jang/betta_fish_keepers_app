import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
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
        <a onClick={logout} href="/">
          <i class="fas fa-sign-out-alert" />{' '}
          <span class="hide-sm">Logout</span>
        </a>
      </li>
    </>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/posts">
          <i className="fas fa-water" /> Betta Fish Keepers{' '}
          <span className="hide-sm">Community</span>
        </Link>
      </h1>
      <ul>
        <li>
          <form name="search-form">
            <div className="search-form">
              <span className="form-control-wrap">
                <input
                  type="text"
                  name="search"
                  id="search"
                  size="40"
                  className="form-control"
                  placeholder="search"
                />
              </span>
              <button type="submit" className="form-control submit">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </form>
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

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(NavBar)
