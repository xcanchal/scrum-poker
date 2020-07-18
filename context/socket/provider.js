import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ioUrl } from '../../constants/api';
import SocketContext from './context';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      (async () => {
        const newSocket = await io(ioUrl);
        setSocket(newSocket);
      })();
    }
  }, [socket, setSocket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

SocketProvider.defaultProps = {
  children: null,
};

export default SocketProvider;
