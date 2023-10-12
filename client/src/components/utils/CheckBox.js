import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = ({ name, checked, onChange, label, disabled, ...props }) => {
  return (
    <label className="checkbox-container">
      {label}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span className="checkmark"></span>
    </label>
  )
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default CheckBox
