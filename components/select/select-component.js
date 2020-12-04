import React from 'react';
import PropTypes from 'prop-types';
import SelectOption from './select-option/select-option-component';

const Select = ({
  id,
  className,
  onChange,
  value,
  children: Options,
  size,
}) => (
  <select
    id={id}
    className={className}
    onChange={onChange}
    value={value}
    size={size}
  >
    {Options}
  </select>
);

Select.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  children: (props, propName) => {
    const { [propName]: prop } = props;
    const children = React.Children.toArray(prop);
    if (children.some((child) => child.type !== SelectOption)) {
      return new Error('"Select" children must be of type "SelectOption"');
    }
    return null;
  },
};

Select.defaultProps = {
  id: '',
  className: '',
  onChange: () => {},
  value: '',
  children: [],
  size: 'md',
};

export default Select;
