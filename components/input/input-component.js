import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  id,
  className,
  maxLength,
}) => (
  <input
    {...(id ? { id } : {})}
    className={`${className}`}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    maxLength={maxLength}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  value: '',
  onChange: () => {},
  className: '',
  size: 'md',
  maxLength: 30,
};

export default Input;
