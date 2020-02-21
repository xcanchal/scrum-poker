import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ioUrl } from '../../config';

const Home = ({ className, history, io, socket, setSocket }) => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');

  const onHostNameChange = ({ target: { value }}) => {
    setHostName(value);
  };

  const onRoomNameChange = ({ target: { value }}) => {
    setRoomName(value);
  };

  const connect = async () => {
    const socket = await io(ioUrl);
    setSocket(socket);
  };

  useEffect(() => {
    connect();
  }, []);

  const createRoom = async () => {
    if (socket && !!roomName.length && !!hostName.length) {
      socket.emit('createRoom', { hostName, roomName }, (room) => {
        history.push(`/room/${room.id}`, { room });
      });
    }
  };

  return (
    <div id="component-home" className={`${className}`}>
      <input type="text" placeholder="Your name" onChange={onHostNameChange} value={hostName} />
      <input type="text" placeholder="Room..." onChange={onRoomNameChange} value={roomName} />
      <button onClick={createRoom}>Create room</button>
      {/* <Link to="/room"><small>Join an existing room</small></Link> */}
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  io: PropTypes.func.isRequired,
  socket: PropTypes.object,
  setSocket: PropTypes.func.isRequired,
};

Home.defaultProps = {};

export default withRouter(Home);
