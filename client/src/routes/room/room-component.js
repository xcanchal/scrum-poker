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

  /*  const kickGuestOut = () => {
    alert('room does not exist!');
    history.push('/');
  }; */

  const createSocket = async () => {
    const newSocket = await io(ioUrl);
    setSocket(newSocket);
  };

  const addListeners = () => {
    if (!listenersReady) {
      // socket.on('unexistingRoom', kickGuestOut);
      socket.on('guestJoined', (room) => {
        console.warn('GUEST JOINED', room);
      });
      setListenersReady(true);
    }
  };

  useEffect(() => {
    if (!socket) {
      createSocket();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      if (!room.id) {
        socket.emit('joinRoom', roomId, (room) => {
          setRoom(room);
          console.log('joined room', room);
        });
      }
      addListeners();
    }
  }, [socket]);

/*   useEffect(() => {
    return () => {
      if (socket) {
        socket.emit('leaveRoom');
      }
    };
  }); */

 /*  useEffect(() => {
    if (socket) {
      if (!room) {
        socket.emit('joinRoom', roomId, setRoom);
      }
      addListeners();

      return () => {
        socket.emit('leaveRoom');
      };
    }
  }, [socket]); */

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
            {room.host && <li>{room.host} (host)</li>}
            {room.guests && room.guests.map((id) => (
              <li key={id}>{id}</li>
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
