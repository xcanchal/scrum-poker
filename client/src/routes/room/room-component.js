import React, { useEffect, useState, Fragment } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ioUrl } from '../../config';
import { StyledCardList, StyledCardListItem } from '../../components/card-list/';

const cardValues = [1, 3, 5, 8, 13, 20, 40, 100, '?', '☕'];

const Room = ({ className, history, io, socket, setSocket }) => {
  const [guests, setGuests] = useState([]);
  const { roomId } = useParams();

  const onGuestJoin = (id) => {
    console.log(`Guest ${id} joined`);
  };

  const onGuestLeave = (id) => {
    console.log(`Guest ${id} left`);
  };

  const onGuestsUpdated = (ids) => {
    setGuests(ids);
  }

  const setListeners = (socket) => {
    socket.on('clientJoined', onGuestJoin);
    socket.on('clientLeft', onGuestLeave);
    socket.on('clientsUpdated', onGuestsUpdated);
  };

  useEffect(() => {
    if (!roomId) {
      history.push('/');
    }

    if (!socket) {
      socket = io(`${ioUrl}?roomId=${roomId}`);
      setSocket(socket);
      setListeners(socket);
    } else {
      setListeners(socket);
    }

    return () => {
      socket.emit('disconnect');
    }
  }, []);

  return (
    <div id="room-component" className={`${className}`}>
      {roomId && (
        <Fragment>
          <p>Room: {roomId}</p>
          <StyledCardList>
            {cardValues.map((value) => (
              <StyledCardListItem key={value}>
                <span>{value}</span>
              </StyledCardListItem>
            ))}
          </StyledCardList>
          <p>Guests:</p>
          <ul>
            {guests.map((id) => (
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
  io: PropTypes.func.isRequired,
  socket: PropTypes.object,
  setSocket: PropTypes.func.isRequired,
};

Room.defaultProps = {
  socket: null,
};

export default withRouter(Room);
