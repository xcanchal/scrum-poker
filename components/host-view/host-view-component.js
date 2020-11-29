import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSocket } from '../../context/socket';
import { StyledCardList, StyledCardListItem } from '../card-list';
import Button from '../button';

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
  const socket = useSocket();
  const inviteLink = `${process.env.NEXT_PUBLIC_HOST}/join?id=${room.id}`;
  const allVoted = guestsVoted && hostVoted;

  const guestVoted = useCallback((guestId) => {
    const { vote = null } = room.guests.find(({ id }) => id === guestId);
    return vote;
  }, [room.guests]);

  const kickGuestOut = useCallback((guestId) => {
    socket.emit('kickGuestOut', { roomId: room.id, guestId });
  }, [socket, room]);

  const onGuestRemovalClick = useCallback(({ id, name }) => {
    if (window.confirm(`Do you really want to kick "${name}" out?`)) {
      kickGuestOut(id);
    }
  }, [kickGuestOut]);

  return (
    <div className={`${className} component-host-view`}>
      <h2>{room.name}</h2>
      {isHost && (
        <p>
          Hi
          {' '}
          {room.host.name}
          , you are the host. Use this link to invite others:
          <a href={inviteLink} target="_blank" rel="noreferrer">{inviteLink}</a>
        </p>
      )}
      <div className="component-host-view__cards">
        <StyledCardList>
          <div className="component-host-view__card-wrap">
            <StyledCardListItem
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
                disabled={!sessionStarted || !guestVoted(id)}
                revealed={allVoted}
                readOnly
              >
                <span>{allVoted ? vote : '?'}</span>
              </StyledCardListItem>
              <button
                className="kick-guest-button"
                onClick={() => onGuestRemovalClick({ id, name })}
                type="button"
              >
                x
              </button>
              <span>{name}</span>
            </div>
          ))}
        </StyledCardList>
      </div>
      {!sessionStarted && !!room.guests.length && (
        <Button
          onClick={startSession}
          className="component-host-view__button component-host-view__button--start"
        >
          Start session
        </Button>
      )}
      {(allVoted && isHost) && (
        <Button
          onClick={clearVotes}
          className="component-host-view__button component-host-view__button-reset"
        >
          Clear votes
        </Button>
      )}
    </div>
  );
};

HostView.propTypes = {
  className: PropTypes.string.isRequired,
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    guests: PropTypes.arrayOf(PropTypes.shape({})),
    host: PropTypes.shape({
      name: PropTypes.string,
      vote: PropTypes.string,
    }),
  }),
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
