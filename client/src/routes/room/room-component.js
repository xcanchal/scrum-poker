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

  const onGuestsUpdated = (ids) => {
    setGuests(ids);
  }

 /*  const onClientLeave = (id) => {
    console.log(`Client ${id} left`);
    const guestIndex = guests.findIndex((id) => id === guest.id);
    const newGuests = [...guests];
    newGuests.slice(guestIndex, 1);
    setGuests(newGuests);
  }; */

  useEffect(() => {
    if (!roomId) {
      history.push('/');
    }

    if (!socket) {
      const socket = io(`${ioUrl}?room=${roomId}`);
      socket.on('clientJoined', onGuestJoin);
      socket.on('clientsUpdated', onGuestsUpdated);
      // socket.on('clientLeft', onClientLeave);
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
