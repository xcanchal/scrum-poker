import React from 'react';
import PropTypes from 'prop-types';

const validChild = 'SelectOption';

const Select = ({
  id,
  className,
  onChange,
  value,
  children: Options,
}) => (
  <select id={id} className={className} onChange={onChange} value={value}>
    {Options}
  </select>
);

Select.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  children: (props, propName) => {
    const { [propName]: prop } = props;
    const children = React.Children.toArray(prop);
    if (children.some((child) => child.type.name !== validChild)) {
      return new Error(`"Select" children must be of type ${validChild}`);
    }
    return null;
  }
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
