import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useGlobalState } from '../../context/global-state';
import { setRoom } from '../../reducer/actions';
import Layout from '../../components/layout';
import StyledInput from '../../components/input';
import StyledButton from '../../components/button';
import { useSocket } from '../../context/socket';

const Join = ({ className }) => {
  const router = useRouter();
  const socket = useSocket();
  const [, dispatch] = useGlobalState();
  const [listenersReady, setListenersReady] = useState(false);
  const [guestName, setGuestName] = useState('');
  const isValidGuestName = useMemo(() => guestName.length >= 2, [guestName.length]);

  const onGuestChangeName = ({ target: { value } }) => {
    setGuestName(value);
  };

  const joinRoom = useCallback(() => {
    const { id: roomId = null } = router.query;
    if (!roomId) {
      alert('wrong URL');
      router.push('/');
      return;
    }
    if (socket && roomId && isValidGuestName) {
      socket.emit('joinRoom', { id: roomId, guestName });
    }
  }, [socket, router, guestName, isValidGuestName]);

  const onJoinedRoom = useCallback((joinedRoom) => {
    dispatch(setRoom(joinedRoom));
    router.push(`/room?id=${joinedRoom.id}`);
  }, [router, dispatch]);

  const onUnexistingRoom = useCallback(() => {
    router.push('/unexisting-room');
  }, [router]);

  useEffect(() => {
    if (socket && !listenersReady) {
      socket.on('guestJoined', onJoinedRoom);
      socket.on('unexistingRoom', onUnexistingRoom);
      setListenersReady(true);
    }
  }, [socket, listenersReady, onJoinedRoom, onUnexistingRoom]);

  return (
    <div id="component-join" className={`${className}`}>
      <Layout>
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
            disabled={!isValidGuestName}
          >
            Join
          </StyledButton>
          <p>
            Or if you prefer,
            {' '}
            <Link href="/">create a new room</Link>
            .
          </p>
        </div>
      </Layout>
    </div>
  );
};

Join.propTypes = {
  className: PropTypes.string.isRequired,
};

Join.defaultProps = {};

export default Join;
