import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({ value, children }) => (
  <option value={value}>{children}</option>
);

SelectOption.propTypes = {
  value: PropTypes.string,
  children: PropTypes.string,
};

SelectOption.defaultProps = {
  value: '',
  children: 'Select an option',
};

export default SelectOption;