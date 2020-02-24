import React from 'react';
import PropTypes from 'prop-types';

import { StyledCardList, StyledCardListItem } from '../../components/card-list/';

const HostView = ({
  className,
  room,
  guestsVoted,
  hostVoted,
  clearVotes
}) => {
  const inviteLink = `http://${process.env.HOST}:${process.env.PORT}/join/${room.id}`;
  const allVoted = guestsVoted && hostVoted;

  return (
    <div className="component-host-view" className={`${className}`}>
      <h3>Room: {room.name} </h3>
      <p>Hi {room.host.name}, you are the host. Use this link to invite others: <a href={inviteLink} target="_blank">{inviteLink}</a></p>
      {allVoted && <button onClick={clearVotes}>Reset</button>}
      <div className="component-host-view__cards">
        <StyledCardList>
          <div className="component-host-view__card-wrap">
            <StyledCardListItem><span>{room.host.vote ? room.host.vote : '?'}</span></StyledCardListItem>
            <span>{room.host.name}</span>
          </div>
          {room.guests.map(({ id, name, vote = '?' }) => (
            <div className="component-host-view__card-wrap" key={id}>
              <StyledCardListItem><span>{allVoted ? vote : '?'}</span></StyledCardListItem>
              <span>{name}</span>
            </div>
          ))}
        </StyledCardList>
      </div>
  </div>
  );
};

HostView.propTypes = {
  className: PropTypes.string.isRequired,
  room: PropTypes.object,
  guestsVoted: PropTypes.bool.isRequired,
  hostVoted: PropTypes.bool.isRequired,
  clearVotes: PropTypes.func.isRequired,
};

HostView.defaultProps = {
  room: {},
};

export default HostView;
