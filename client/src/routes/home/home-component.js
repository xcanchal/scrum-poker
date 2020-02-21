import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ioUrl } from '../../config';

const Home = ({ className, history, io, setSocket }) => {
  const [roomName, setRoomName] = useState('');

  const onNameChange = ({ target: { value }}) => {
    setRoomName(value);
  };

  const createRoom = async () => {
    if (!!roomName.length) {
      const socket = await io(ioUrl);
      socket.on('connect', () => {
        setSocket(socket);
        socket.emit('createRoom', roomName, (room) => {
          console.log('created room', room);
          history.push(`/room/${room.id}`, { room });
        });
      })
    }
  };

  return (
    <div id="component-home" className={`${className}`}>
      <input type="text" placeholder="Room name..." onChange={onNameChange} />
      <button onClick={createRoom}>Create room</button>
      {/* <Link to="/room"><small>Join an existing room</small></Link> */}
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  io: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
};

Home.defaultProps = {};

export default withRouter(Home);
