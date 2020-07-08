import React from 'react'
import PropTypes from 'prop-types'

const Landing = props => {
  return (
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">
            Betta Fish Keepers <span class="hide-sm">Community</span>
          </h1>
          <p class="lead">
            Share your tips and get help from other Betta keepers!
          </p>
          <div class="buttons">
            <a href="register.html" class="btn btn-dark">
              Sign Up
            </a>
            <a href="login.html" class="btn btn-dark">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {}

export default Landing
