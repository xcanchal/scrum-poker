import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';

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
      <input type="text" placeholder="Your name" onChange={onGuestChangeName} value={guestName} />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

Join.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

Join.defaultProps = {};

export default withRouter(Join);
