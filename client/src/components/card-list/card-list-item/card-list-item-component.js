import React from 'react';
import PropTypes from 'prop-types';

const CardListItem = ({ className, children }) => (
  <div className={`${className} card-list-item`} onClick={() => {}}>
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
