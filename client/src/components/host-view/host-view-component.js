import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { StyledCardList, StyledCardListItem } from '../../components/card-list/';

const HostView = ({ className, room }) => {
  const inviteLink = `http://${process.env.HOST}:${process.env.PORT}/join/${room.id}`;

  return (
    <div className="component-host-view" className={`${className}`}>
      <h3>Room: {room.name} </h3>
      <p>Hi {room.host.name}, you are the host. Use this link to invite others: <a href={inviteLink} target="_blank">{inviteLink}</a></p>

      <div className="component-host-view__cards">
        <StyledCardList>
          {room.guests.map(({ id, name }) => (
            <div className="component-host-view__card-wrap" key={id}>
              <Fragment>
                <StyledCardListItem><span>?</span></StyledCardListItem>
              </Fragment>
              <p>{name}</p>
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
};

HostView.defaultProps = {
  room: {},
};

export default HostView;
