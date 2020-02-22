import React, { useEffect, useState, Fragment } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ioUrl } from '../../config';
import HostView from '../../components/host-view';
import GuestView from '../../components/guest-view';

const Room = ({ className, history, location, io, socket, setSocket }) => {
  const { roomId } = useParams();
  const existingRoom = location.state && location.state.room ? location.state.room : {};
  const guestName = location.state && location.state.guestName ? location.state.guestName : null;
  const [room, setRoom] = useState(existingRoom);
  const [listenersReady, setListenersReady] = useState(false);
  const [allVoted, setAllVoted] = useState(false);

   const kickGuestOut = () => {
    alert('room does not exist!');
    history.push('/');
  };

  const onVoted = (room) => {
    // const hostVoted = !!room.host.vote;
    const guestsVoted = room.guests.every(({ vote }) => !!vote);
    if (/* hostVoted &&  */guestsVoted) {
      setAllVoted(true);
    }
    setRoom(room);
  };

  const onVotesCleared = (room) => {
    setAllVoted(false);
    setRoom(room);
  };

  const addListeners = (sckt) => {
    if (!listenersReady) {
      sckt.on('unexistingRoom', kickGuestOut);
      sckt.on('guestJoined', setRoom);
      sckt.on('guestLeft', setRoom);
      sckt.on('voted', onVoted);
      sckt.on('votesCleared', onVotesCleared);
      setListenersReady(true);
    }
  };

  const createSocket = async () => {
    const newSocket = await io(ioUrl);
    setSocket(newSocket);
    newSocket.emit('joinRoom', { roomId, guestName }, setRoom);
    addListeners(newSocket);
  };

  useEffect(() => {
    if (!room.host && !guestName) {
      if (roomId) {
        history.replace(`/join/${roomId}`);
      } else {
        history.replace('/');
      }
    } else {
      if (!socket.id) {
        createSocket();
      } else {
        addListeners(socket);
      }
    }
  }, []);

  useEffect(() => {
    if (socket.id) {
      return () => {
        socket.emit('leaveRoom');
      }
    }
  }, [socket]);


  const vote = (value) => {
    socket.emit('vote', { roomId, value });
  };

  const clearVotes = () => {
    socket.emit('clearVotes', roomId);
  }

  return socket.id && room.id ? (
    <div id="room-component" className={`${className}`}>
      {socket.id === room.host.id ?
        <HostView room={room} allVoted={allVoted} clearVotes={clearVotes} /> :
        <GuestView room={room} vote={vote} />
      }
    </div>
  ) : null;
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
  socket: {},
};

export default withRouter(Room);
