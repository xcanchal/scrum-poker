import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSocket } from '../../context/socket';

import Layout from '../../components/layout';
import HtmlHead from '../../components/html-head';
import Input from '../../components/input';
import Button from '../../components/button';
import { Select, SelectOption } from '../../components/select';

const Home = ({ className }) => {
  const router = useRouter();
  const socket = useSocket();
  console.log('home socket', socket);
  const [room, setRoom] = useState({
    hostName: '',
    roomName: '',
    cardsMode: '',
  });

  const updateState = (field, value) => {
    setRoom({ ...room, [field]: value });
  };

  const canCreateRoom = useMemo(() => {
    const { roomName, hostName, cardsMode } = room;
    return !!roomName.length && !!hostName.length && !!cardsMode.length;
  }, [room]);

  const createRoom = () => {
    if (socket && canCreateRoom) {
      socket.emit('createRoom', room, (createdRoom) => {
        router.push(`/room/${createdRoom.id}`);
      });
    }
  };

  return (
    <div id="component-home" className={`${className} component-home`}>
      <Layout>
        <HtmlHead title="Scrum poker - Home" />
        <h1>Create a room</h1>
        <div className="component-home__content">
          <Input
            className="component-home__input component-home__input__host-name"
            placeholder="Your name"
            onChange={({ target: { value } }) => updateState('hostName', value)}
            value={room.hostName}
            size="lg"
          />
          <Input
            className="component-home__input component-home__input__room-name"
            placeholder="Room name"
            onChange={({ target: { value } }) => updateState('roomName', value)}
            value={room.roomName}
            size="lg"
          />
          <Select
            value={room.cardsMode}
            onChange={({ target: { value } }) => updateState('cardsMode', value)}
            size="lg"
          >
            <SelectOption value="">Cards mode</SelectOption>
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
      </Layout>
    </div>
  );
};

Home.propTypes = {
  className: PropTypes.string.isRequired,
};

Home.defaultProps = {};

export default Home;
