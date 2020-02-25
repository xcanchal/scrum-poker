import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SessionEnd = ({ className, location }) => {
  const { reason = '' } = location.state ? location.state.reason : '';
  return (
    <div id="component-session-end" className={`${className}`}>
      <div className="component-session-end__content">
        <h1>The session has ended</h1>
        <p>{reason}</p>
        <Link to="/">Create a new room</Link>
      </div>
    </div>
  );
}

SessionEnd.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

SessionEnd.defaultProps = {
  socket: {},
};

export default SessionEnd;
