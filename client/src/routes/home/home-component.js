import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ioUrl } from '../../config';
import StyledInput from '../../components/input';
import StyledButton from '../../components/button';

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
    console.log('socket', socket);
    if (socket && !!roomName.length && !!hostName.length) {
      socket.emit('createRoom', { hostName, roomName }, (room) => {
        history.push(`/room/${room.id}`, { room });
      });
    }
  };

  return (
    <div id="component-home" className={`${className} component-home`}>
      <h1>Create a room</h1>
      <div className="component-home__content">
        <StyledInput
          className="component-home__input component-home__input__host-name"
          placeholder="Your name"
          onChange={onHostNameChange}
          value={hostName}
          size="lg"
          />
        <StyledInput
          className="component-home__input component-home__input__room-name"
          placeholder="Room name"
          onChange={onRoomNameChange}
          value={roomName}
          size="lg"
          />
        <StyledButton
          className="component-home__button"
          onClick={createRoom}
          size="lg">
            Create room
          </StyledButton>
      </div>
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
