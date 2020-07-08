import React from 'react'
import PropTypes from 'prop-types'

const NavBar = props => {
  return (
    <nav class="navbar bg-dark">
      <h1>
        <a href="posts.html">
          <i class="fas fa-water"></i> Betta Fish Keepers{' '}
          <span class="hide-sm">Community</span>
        </a>
      </h1>
      <ul>
        <li>
          <form name="search-form">
            <div class="search-form">
              <span class="form-control-wrap">
                <input
                  type="text"
                  name="search"
                  id="search"
                  size="40"
                  class="form-control"
                  placeholder="search"
                />
              </span>
              <button type="submit" class="form-control submit">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </form>
        </li>
        <li>
          <a href="posts.html">Posts</a>
        </li>
        <li>
          <a href="register.html">Register</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  )
}

NavBar.propTypes = {}

export default NavBar
