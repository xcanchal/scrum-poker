import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';

import StyledInput from '../../components/input';
import StyledButton from '../../components/button';

const Join = ({ className, history }) => {
  const { roomId } = useParams();
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    if (!roomId) {
      history.push('/');
    }
  }, []);

  const onGuestChangeName = ({ target: { value } }) => {
    setGuestName(value);
  };

  const joinRoom = async () => {
    if (guestName.length > 1) {
      history.push(`/room/${roomId}`, { guestName });
    }
  };

  return (
    <div id="component-join" className={`${className}`}>
      <div className="component-join__content">
        <StyledInput
          className="component-join__input component-home__input__host-name"
          placeholder="Your name"
          onChange={onGuestChangeName}
          value={guestName}
          size="lg"
        />
        <StyledButton
          className="component-join__button"
          onClick={joinRoom}
          size="lg"
        >
          Join
        </StyledButton>
      </div>
    </div>
  );
}

Join.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

Join.defaultProps = {};

export default withRouter(Join);
