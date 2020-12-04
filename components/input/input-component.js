import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  maxLength,
  size,
}) => (
  <input
    className={`${className}`}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    maxLength={maxLength}
    size={size}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  size: PropTypes.oneOf(['md', 'lg']),
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
