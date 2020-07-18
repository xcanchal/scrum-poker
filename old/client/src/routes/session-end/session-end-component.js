import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const SessionEnd = ({ className, location }) => {
  const reason = location.state && location.state.reason ? location.state.reason : 'Session ended';
  return (
    <div id="component-session-end" className={`${className}`}>
      <div className="component-session-end__content">
        {reason && <h1>{reason}</h1>}
        <p>Request a valid link or <Link to="/">create a new room</Link>.</p>
      </div>
    </div>
  );
}

SessionEnd.propTypes = {
  className: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

SessionEnd.defaultProps = {
};

export default withRouter(SessionEnd);
