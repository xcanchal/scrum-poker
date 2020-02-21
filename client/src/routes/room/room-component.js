import React, { useEffect, useState, Fragment } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ioUrl } from '../../config';
import { StyledCardList, StyledCardListItem } from '../../components/card-list/';

const cardValues = [1, 3, 5, 8, 13, 20, 40, 100, '?', '☕'];

const Room = ({ className, history, location, io, socket, setSocket }) => {
  const { roomId } = useParams();
  const existingRoom = location.state && location.state.room ? location.state.room : {};
  const [room, setRoom] = useState(existingRoom);
  const [listenersReady, setListenersReady] = useState(false);

   const kickGuestOut = () => {
    alert('room does not exist!');
    history.push('/');
  };

  const addListeners = (sckt) => {
    if (!listenersReady) {
      sckt.on('unexistingRoom', kickGuestOut);
      sckt.on('guestJoined', setRoom);
      sckt.on('guestLeft', setRoom);
      setListenersReady(true);
    }
  };

  const createSocket = async () => {
    const newSocket = await io(ioUrl);
    setSocket(newSocket);
    newSocket.emit('joinRoom', { roomId, guestName: 'random' }, setRoom);
    addListeners(newSocket);
  };

  useEffect(() => {
    if (!socket) {
      createSocket();
    } else {
      addListeners(socket);
    }

    /* return () => {
      socket.emit('leaveRoom');
    } */
  }, []);


  return (
    <div id="room-component" className={`${className}`}>
      {room.name && (
        <Fragment>
          <p>Room: {room.name}</p>
          <StyledCardList>
            {cardValues.map((value) => (
              <StyledCardListItem key={value}>
                <span>{value}</span>
              </StyledCardListItem>
            ))}
          </StyledCardList>
          <p>Participants:</p>
          <ul>
            {room.host && <li>{room.host.name} (host)</li>}
            {!!room.guests.length && room.guests.filter((guest) => guest).map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

Room.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  io: PropTypes.func.isRequired,
  socket: PropTypes.object,
  setSocket: PropTypes.func.isRequired,
};

Room.defaultProps = {
  socket: null,
};

export default withRouter(Room);
