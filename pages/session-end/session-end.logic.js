import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const SessionEnd = ({ className }) => (
  <div id="component-session-end" className={className}>
    <div className="component-session-end__content">
      <h1>Session ended</h1>
      <p>
        Request a valid link or
        {' '}
        <Link href="/">create a new room</Link>
        .
      </p>
    </div>
  </div>
);

SessionEnd.propTypes = {
  className: PropTypes.string.isRequired,
};

SessionEnd.defaultProps = {};

export default SessionEnd;
