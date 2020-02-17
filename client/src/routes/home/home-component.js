import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { StyledCardList, StyledCardListItem } from '../../components/card-list';

const ioUrl = `http://${process.env.HOST}:${process.env.SERVER_PORT}`;

const cardValues = [1, 3, 5, 8, 13, 20, 40, 100, '?', '☕'];

const Home = ({ className, io }) => {
  const [room, setRoom] = useState(null);

  const createRoom = async () => {
    if (!room.id) {
      const id = uuidv4();
      const socket = await io(`${ioUrl}?room=${id}`);
      setRoom({ id, name: room.name, socket });
    }
  };

  return (
    <div id="component-home" className={`${className}`}>
      {room && room.id ? (
        <div id="room-component">
          <p>Room: {room.name} ({room.id}) </p>
          <StyledCardList>
            {cardValues.map((value) => (
              <StyledCardListItem key={value}>
                <span>{value}</span>
              </StyledCardListItem>
            ))}
          </StyledCardList>
        </div>
      ) : (
        <Fragment>
          <input type="text" placeholder="Set a room name" onChange={(e) => setRoom({ name: e.target.value })}></input>
          <button onClick={createRoom}>Create room</button>
        </Fragment>
      )}
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
};

Home.defaultProps = {};

export default withRouter(Home);
