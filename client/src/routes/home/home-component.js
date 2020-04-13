import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ioUrl } from '../../config';
import Input from '../../components/input';
import Button from '../../components/button';
import { Select, SelectOption } from '../../components/select';

const Home = ({ className, history, io, socket, setSocket }) => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [cardsMode, setCardsMode] = useState('');

  const onHostNameChange = ({ target: { value }}) => {
    setHostName(value);
  };

  const onRoomNameChange = ({ target: { value }}) => {
    setRoomName(value);
  };

  const onCardsModeChange = ({ target: { value }}) => {
    setCardsMode(value);
  };

  const connect = async () => {
    const socket = await io(ioUrl);
    setSocket(socket);
  };

  useEffect(() => {
    connect();
  }, []);

  const canCreateRoom = !!roomName.length && !!hostName.length && !!cardsMode.length;

  const createRoom = async () => {
    if (socket && canCreateRoom) {
      socket.emit('createRoom', {
        hostName,
        roomName,
        cardsMode
      }, (room) => {
        history.push(`/room/${room.id}`, { room });
      });
    }
  };

  return (
    <div id="component-home" className={`${className} component-home`}>
      <h1>Create a room</h1>
      <div className="component-home__content">
        <Input
          className="component-home__input component-home__input__host-name"
          placeholder="Your name"
          onChange={onHostNameChange}
          value={hostName}
          size="lg"
          />
        <Input
          className="component-home__input component-home__input__room-name"
          placeholder="Room name"
          onChange={onRoomNameChange}
          value={roomName}
          size="lg"
          />
        <Select value={cardsMode} onChange={onCardsModeChange} size="lg">
          <SelectOption value="">Select an option</SelectOption>
          <SelectOption value="fibonacci">Fibonacci (1, 2, 3, 5...)</SelectOption>
          <SelectOption value="t-shirt-size">T-shirt size (xs, s, m...)</SelectOption>
        </Select>
        <Button
          className="component-home__button"
          onClick={createRoom}
          disabled={!canCreateRoom}
          size="lg"
          >
            Create room
          </Button>
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
