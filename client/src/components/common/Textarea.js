import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <textarea
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

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Textarea;
