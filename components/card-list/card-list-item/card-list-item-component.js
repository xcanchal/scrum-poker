import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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
  onClick: PropTypes.func,
};

CardListItem.defaultProps = {
  className: '',
  onClick: () => {},
};

export default CardListItem;
