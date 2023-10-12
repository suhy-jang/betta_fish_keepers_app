import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
  isTextArea = false,
  className,
  type,
  ...props
}) => {
  return isTextArea ? (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      className={className}
      cols="30"
      rows="5"
    />
  ) : (
    <input
      type={type ?? 'text'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      className={className}
      cols="30"
      rows="1"
    />
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isTextArea: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
}

export default TextInput
