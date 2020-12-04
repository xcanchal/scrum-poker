import {
  useState, useMemo, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { useSocket } from '../../context/socket';
import { useGlobalState } from '../../context/global-state';
import { useEnterKey } from '../../hooks';
import { setRoom, updateRoom } from '../../reducer/actions';
import Layout from '../../components/layout';
import HtmlHead from '../../components/html-head';
import Input from '../../components/input';
import Button from '../../components/button';
import { Select, SelectOption } from '../../components/select';

const Home = ({ className }) => {
  const router = useRouter();
  const socket = useSocket();
  const [listenersReady, setListenersReady] = useState(false);
  const [{ room }, dispatch] = useGlobalState();

  const updateState = useCallback((field, value) => {
    dispatch(updateRoom({ [field]: value }));
  }, [dispatch]);

  const canCreateRoom = useMemo(() => {
    const { name, host, cardsMode } = room;
    return !!name.length && !!host.name.length && !!cardsMode.length;
  }, [room]);

  const createRoom = useCallback(() => {
    if (socket && canCreateRoom) {
      socket.emit('createRoom', room);
    }
  }, [socket, room, canCreateRoom]);

  useEnterKey(createRoom);

  const onRoomCreated = useCallback((createdRoom) => {
    dispatch(setRoom(createdRoom));
    socket.emit('joinRoom', { id: createdRoom.id });
  }, [socket, dispatch]);

  const onJoinedRoom = useCallback(({ id }) => {
    router.push(`/room?id=${id}`);
  }, [router]);

  useEffect(() => {
    if (socket && !listenersReady) {
      socket.on('roomCreated', onRoomCreated);
      socket.on('guestJoined', onJoinedRoom);
      setListenersReady(true);
    }
  }, [socket, listenersReady, onRoomCreated, onJoinedRoom]);

  return (
    <div id="component-home" className={`${className} component-home`}>
      <Layout>
        <HtmlHead title="Scrum poker - Home" />
        <h1>Create a room</h1>
        <div className="component-home__content">
          <Input
            className="component-home__input component-home__input__host-name"
            placeholder="Your name"
            onChange={({ target: { value } }) => updateState('host', { name: value })}
            value={room.host ? room.host.name : ''}
            size="lg"
          />
          <Input
            className="component-home__input component-home__input__room-name"
            placeholder="Room name"
            onChange={({ target: { value } }) => updateState('name', value)}
            value={room.name}
            size="lg"
          />
          <Select
            value={room.cardsMode}
            onChange={({ target: { value } }) => updateState('cardsMode', value)}
            size="lg"
          >
            <SelectOption value="">Cards mode</SelectOption>
            <SelectOption value="fibonacci">Fibonacci (1, 2, 3, 5...)</SelectOption>
            <SelectOption value="tShirtSize">T-shirt size (xs, s, m...)</SelectOption>
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
      </Layout>
    </div>
  );
};

Home.propTypes = {
  className: PropTypes.string.isRequired,
};

Home.defaultProps = {};

export default Home;
