import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { GET } from '../../api';
import { useSocket } from '../../context/socket';
import HostView from '../../components/host-view';
import GuestView from '../../components/guest-view';

export default function Room({ className, room: roomData }) {
  const router = useRouter();
  const [room, setRoom] = useState(roomData);
  const socket = useSocket();

  const [listenersReady, setListenersReady] = useState(false);
  const [guestsVoted, setGuestsVoted] = useState(false);
  const [hostVoted, setHostVoted] = useState(false);
  const [votedValue, setVotedValue] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  useEffect(() => {
    console.log('socket', socket);
    console.log('room', room);
    if (!room) {
      router.push('/');
    }
  }, [room, router]);

  const kickGuestOut = useCallback((reason) => {
    alert(reason);
    router.replace('/session-end', { reason });
  }, [router]);

  const onGuestJoin = useCallback((newRoom) => {
    if (!sessionStarted) {
      setSessionStarted(false);
    }
    setRoom(newRoom);
  }, [sessionStarted]);

  const onVoted = (newRoom) => {
    if (newRoom.guests.every(({ vote }) => !!vote)) {
      setGuestsVoted(true);
    }
    if (newRoom.host.vote) {
      setHostVoted(true);
    }
    setRoom(newRoom);
  };

  const onVotesCleared = (newRoom) => {
    setGuestsVoted(false);
    setHostVoted(false);
    setVotedValue(null);
    setRoom(newRoom);
  };

  const addListeners = useCallback(() => {
    if (socket && !listenersReady) {
      socket.on('unexistingRoom', () => kickGuestOut('The room does no longer exist'));
      socket.on('guestJoined', onGuestJoin);
      socket.on('guestLeft', setRoom);
      socket.on('hostLeft', () => kickGuestOut('The host has ended the session'));
      socket.on('voted', onVoted);
      socket.on('votesCleared', onVotesCleared);
      socket.on('sessionStarted', () => setSessionStarted(true));
      setListenersReady(true);
    }
  }, [socket, kickGuestOut, listenersReady, onGuestJoin]);

  useEffect(() => {
    if (socket) {
      if (!listenersReady) {
        addListeners(socket);
      }

      return () => {
        socket.emit('leaveRoom');
      };
    }
  }, [socket, addListeners, listenersReady]);

  const vote = useCallback((value) => {
    setVotedValue(value);
    socket.emit('vote', { roomId: room.id, value });
  }, [socket, room.id]);

  const clearVotes = useCallback(() => {
    socket.emit('clearVotes', room.id);
  }, [socket, room.id]);

  const startSession = useCallback(() => {
    socket.emit('startSession', room.id);
  }, [socket, room.id]);

  const ViewComponent = useMemo(() => {
    if (!socket || !room) {
      return null;
    }
    const isHost = socket.id === room.host.id;
    const guestProps = {
      room, vote, votedValue, sessionStarted,
    };
    const hostProps = {
      room, guestsVoted, hostVoted, clearVotes, isHost, startSession, sessionStarted,
    };
    /* eslint-disable react/jsx-props-no-spreading */
    const GuestComponent = <GuestView {...guestProps} />;
    const HostComponent = <HostView {...hostProps} />;
    if (isHost) {
      return (guestsVoted && !hostVoted) ? GuestComponent : HostComponent;
    }
    return (guestsVoted && hostVoted) ? HostComponent : GuestComponent;
  }, [
    room, sessionStarted, socket, votedValue, guestsVoted,
    vote, clearVotes, hostVoted, startSession,
  ]);

  return (socket && room) ? (
    <div id="room-component" className={`${className}`}>
      <div className="component-room__content">
        {ViewComponent}
      </div>
    </div>
  ) : null;
}

Room.propTypes = {
  className: PropTypes.string,
  room: PropTypes.shape,
};

Room.defaultProps = {
  className: '',
  room: null,
};

export async function getServerSideProps({ params }) {
  let room = null;
  if (params.id) {
    room = await GET(`${process.env.NEXT_PUBLIC_HOST}/api/rooms/${params.id}`);
  }
  return { props: { room } };
}
