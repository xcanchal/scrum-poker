import React from 'react';
import PropTypes from 'prop-types';

const CardListItem = ({ className, children, onClick }) => (
  <div
    className={`${className} card-list-item`}
    onClick={onClick}
  >
    {children}
  </div>
);

CardListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

CardListItem.defaultProps = {
  className: '',
  error: false,
  disabled: false,
};

export default CardListItem;
