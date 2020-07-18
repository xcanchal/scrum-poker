import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import SocketContext from './socket-context';

const SocketProvider = ({ children, io, socket }) => {
  const [state, setState] = useState({ io, socket });

  const setSocket = (socket) => {
    setState({ ...state, socket });
  };

  return (
    <SocketContext.Provider value={{ setSocket, ...state }}>
      <Fragment>
        {children}
      </Fragment>
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  io: PropTypes.func,
};

SocketProvider.defaultProps = {
  io,
  socket: {},
};

export default SocketProvider;