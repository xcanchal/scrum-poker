import React from 'react';
import PropTypes from 'prop-types';

import { StyledCardList, StyledCardListItem } from '../../components/card-list/';
import StyledButton from '../../components/button';

/*
const getResults = (votes) => {
  let results = {};

  votes.forEach((vote) => {
    if (!results[vote]) {
      results[vote] = 1;
    } else {
      results[vote] += 1;
    }
  });

  const [popular, ...otherVotes] = Object.entries(results)
    .sort(([, sumA], [, sumB]) => sumB - sumA)
    .map(([vote]) => vote)
    .filter((vote) => vote);

  return { popular, otherVotes };
} */

const HostView = ({
  className,
  room,
  guestsVoted,
  hostVoted,
  clearVotes,
  isHost,
  startSession,
  sessionStarted,
}) => {
  const inviteLink = `http://${process.env.HOST}:${process.env.PORT}/join/${room.id}`;
  const allVoted = guestsVoted && hostVoted;
  /* const { popular, otherVotes } = (guestsVoted && hostVoted) ?
    getResults([room.host.vote, room.guests.map(({ vote }) => vote)]) :
    { popular: null, otherVotes: [] }; */
  /* console.log('{ popular, otherVotes }', { popular, otherVotes }); */

  return (
    <div className="component-host-view" className={`${className}`}>
      <h2>{room.name}</h2>
      {isHost && <p>Hi {room.host.name}, you are the host. Use this link to invite others: <a href={inviteLink} target="_blank">{inviteLink}</a></p>}
      <div className="component-host-view__cards">
        <StyledCardList>
          <div className="component-host-view__card-wrap">
            <StyledCardListItem
              /* error={room.host.vote && otherVotes && otherVotes.includes(room.host.vote)} */
              disabled={!guestsVoted}
              revealed={allVoted}
              readOnly
            >
              <span>{room.host.vote ? room.host.vote : '?'}</span>
              {!hostVoted && <small>Wait until all guests voted</small>}
            </StyledCardListItem>
            <span>{room.host.name}</span>
          </div>
          {room.guests.map(({ id, name, vote = '?' }) => (
            <div className="component-host-view__card-wrap" key={id}>
              <StyledCardListItem
                /* error={vote && otherVotes && otherVotes.includes(vote)} */
                disabled={!sessionStarted}
                revealed={allVoted}
                readOnly
              >
                <span>{allVoted ? vote : '?'}</span>
                {!sessionStarted && <small>Session not started</small>}
              </StyledCardListItem>
              <span>{name}</span>
            </div>
          ))}
        </StyledCardList>
      </div>
      {!sessionStarted && !!room.guests.length && (
        <StyledButton
          onClick={startSession}
          className="component-host-view__button component-host-view__button--start"
        >
          Start session
        </StyledButton>
      )}
      {(allVoted && isHost) && (
        <StyledButton
          onClick={clearVotes}
          className="component-host-view__button component-host-view__button-reset"
        >
          Clear votes
        </StyledButton>
      )}
    </div>
  );
};

HostView.propTypes = {
  className: PropTypes.string.isRequired,
  room: PropTypes.object,
  isHost: PropTypes.bool.isRequired,
  guestsVoted: PropTypes.bool.isRequired,
  hostVoted: PropTypes.bool.isRequired,
  clearVotes: PropTypes.func.isRequired,
  startSession: PropTypes.func.isRequired,
  sessionStarted: PropTypes.bool.isRequired,
};

HostView.defaultProps = {
  room: {},
};

export default HostView;
