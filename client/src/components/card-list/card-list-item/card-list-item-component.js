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
};

CardListItem.defaultProps = {
  className: '',
};

export default CardListItem;
