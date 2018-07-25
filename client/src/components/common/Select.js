import React from "react";
import PropTypes from "prop-types";

const Select = ({ name, label, value, onChange, options, error }) => {
  let selectOptions = options.map(option => (
    <option value={option.value} key={option.label}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "invalid" : null}
      >
        {selectOptions}
      </select>

      <div className={`invalid-feedback ${error ? "visible" : "invisible"}`}>
        {error ? error : "Test"}
      </div>
    </div>
  );
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default Select;
