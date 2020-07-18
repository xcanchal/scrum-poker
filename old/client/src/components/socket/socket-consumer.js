import React from 'react';
import PropTypes from 'prop-types';

import SocketContext from './socket-context';

const SocketConsumer = ({ children }) => (
  <SocketContext.Consumer>
    {state => children(state)}
  </SocketContext.Consumer>
);

SocketConsumer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]).isRequired,
};

SocketConsumer.defaultProps = {};

export default SocketConsumer;