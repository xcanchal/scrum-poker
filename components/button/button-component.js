import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type,
  onClick,
  id,
  className,
  children,
}) => (
  <button
    {...(id ? { id } : {})}
    className={`${className}`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  value: '',
  onClick: () => {},
  className: '',
  size: 'md',
  children: 'click me',
};

export default Button;
