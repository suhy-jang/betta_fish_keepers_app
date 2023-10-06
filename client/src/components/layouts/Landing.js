import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = ({ isAuthenticated }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            Betta Fish Keepers <span className="hide-sm">Community</span>
          </h1>
          <p className="lead">
            Share your tips and get help from other Betta keepers!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-dark">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-dark">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
