import React from 'react'
import PropTypes from 'prop-types'

const Avatar = props =>
  props.avatar ? (
    <img src={props.avatar} alt="" className={props.className} />
  ) : (
    <i className={`fas fa-user ${props.className}`} />
  )

Avatar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
}

export default Avatar
