import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */

const Button = ({ onClick, className, children }) => (
  <button
    className={`${className}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.oneOf(['md', 'lg']),
};

Button.defaultProps = {
  className: '',
  children: 'click me',
  onClick: () => {},
  size: 'md',
};

export default Button;
