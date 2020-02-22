import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { StyledCardList, StyledCardListItem } from '../../components/card-list/';

const cardValues = [1, 3, 5, 8, 13, 20, 40, 100, '?', '☕'];

const GuestView = ({ className, room, vote }) => {
  const [votedValue, setVotedValue] = useState(null);

  const handleVoting = (value) => {
    setVotedValue(value);
    vote(value);
  };

  return (
    <div className="component-guest-view" className={`${className}`}>
      <h3>Room: {room.name} </h3>
      <StyledCardList>
        {cardValues.map((value) => (
          <div className="component-guest-view__card-wrap" key={value}>
            <StyledCardListItem
              selected={votedValue === value}
              onClick={() => handleVoting(value)}
            >
              <span>{value}</span>
            </StyledCardListItem>
          </div>
        ))}
      </StyledCardList>
      <p>Participants:</p>
      <ul>
        {room.host && <li>{room.host.name} (host)</li>}
        {!!room.guests.length && room.guests.filter((guest) => guest).map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

GuestView.propTypes = {
  className: PropTypes.string.isRequired,
  room: PropTypes.object,
  vote: PropTypes.func.isRequired,
};

GuestView.defaultProps = {
  room: {},
};

export default GuestView;
