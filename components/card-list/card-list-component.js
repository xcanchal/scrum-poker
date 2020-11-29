import React from 'react';
import PropTypes from 'prop-types';

const CardList = ({ children, className }) => (
  <div className={`${className} card-list-component`}>
    {children}
  </div>
);

CardList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
};

CardList.defaultProps = {
  children: [],
  className: '',
};

export default CardList;
