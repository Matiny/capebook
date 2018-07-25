import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={error ? "invalid" : null}
    />

    <div className={`invalid-feedback ${error ? "visible" : "invisible"}`}>
      {error ? error : "Test"}
    </div>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

Input.defaultProps = {
  type: "text"
}

export default Input;
