import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavBar = props => {
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
          <a href="posts.html">Posts</a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

NavBar.propTypes = {}

export default NavBar
