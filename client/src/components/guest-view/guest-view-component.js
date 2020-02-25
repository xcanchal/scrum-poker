import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { StyledCardList, StyledCardListItem } from '../../components/card-list/';

const cardValues = ['1', '2', '3', '5', '8', '13', '21', '34', '?', '☕'];

const GuestView = ({ className, room, vote, votedValue, sessionStarted }) => (
  <div className="component-guest-view" className={`${className}`}>
    <h2>{room.name}</h2>
    {sessionStarted ? (
      <Fragment>
        <StyledCardList>
          {cardValues.map((value) => (
            <div className="component-guest-view__card-wrap" key={value}>
              <StyledCardListItem
                selected={(votedValue && value) && votedValue === value}
                onClick={() => vote(value)}
              >
                <span>{value}</span>
              </StyledCardListItem>
            </div>
          ))}
        </StyledCardList>
{/*         <p>Participants:</p>
        <ul>
          {room.host && <li>{room.host.name} (host)</li>}
          {!!room.guests.length && room.guests.filter((guest) => guest).map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul> */}
      </Fragment>
    ) : (
      <p>Waiting for the host to start the session.</p>
    )}
  </div>
);

GuestView.propTypes = {
  className: PropTypes.string.isRequired,
  room: PropTypes.object,
  vote: PropTypes.func.isRequired,
  votedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sessionStarted: PropTypes.bool.isRequired,
};

GuestView.defaultProps = {
  room: {},
  votedValue: null,
};

export default GuestView;
