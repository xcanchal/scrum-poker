import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import StyledInput from '../../components/input';
import StyledButton from '../../components/button';
import { useSocket } from '../../context/socket';

const Join = ({ className }) => {
  const router = useRouter();
  const [guestName, setGuestName] = useState('');
  const socket = useSocket();
  // const { id: roomId = null } = useMemo(() => router.query, [router.query]);
  const validGuestName = useMemo(() => guestName.length >= 2, [guestName.length]);

  useEffect(() => {
    const { id: roomId = null } = router.query;
    setRoomId(roomId);
    console.log('router.query', router.query);
    console.log('router.query.id', router.query.id);
    console.log('roomId', roomId);
    if (!roomId) {
      /* TODO: show message that room link is malformed.
      Either create one or request a proper room link. */
      router.push('/');
    }
  }, [router]);

  const onGuestChangeName = ({ target: { value } }) => {
    setGuestName(value);
  };

  const joinRoom = async () => {
    if (socket && validGuestName) {
      const { id: roomId = null } = router.query;
      socket.emit('joinRoom', { roomId, guestName }, (room) => {
        router.push(`/room?id=${room.id}`);
      });
    }
    /* if (guestName.length >= 2) {
      router.push(`/room?id${roomId}?guest=${guestName}`);
    } */
  };

  return (
    <div id="component-join" className={`${className}`}>
      <h1>Join room</h1>
      <div className="component-join__content">
        <StyledInput
          className="component-join__input component-home__input__host-name"
          placeholder="Your name"
          onChange={onGuestChangeName}
          value={guestName}
          size="lg"
        />
        <StyledButton
          className="component-join__button"
          onClick={joinRoom}
          size="lg"
          disabled={!validGuestName}
        >
          Join
        </StyledButton>
      </div>
    </div>
  );
};

Join.propTypes = {
  className: PropTypes.string.isRequired,
};

Join.defaultProps = {};

export default Join;
