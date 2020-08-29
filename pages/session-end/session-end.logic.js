import React, { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { initialState } from '../../reducer';
import { useGlobalState } from '../../context/global-state';
import { setRoom } from '../../reducer/actions';
import Layout from '../../components/layout';

const SessionEnd = ({ className }) => {
  const [{ room }, dispatch] = useGlobalState();

  useEffect(() => {
    if (room.id !== null) {
      dispatch(setRoom(initialState));
    }
  }, [dispatch, room.id]);

  return (
    <div id="component-session-end" className={className}>
      <Layout>
        <div className="component-session-end__content">
          <h1>Session ended</h1>
          <p>
            Request a valid link or
            {' '}
            <Link href="/">create a new room</Link>
            .
          </p>
        </div>
      </Layout>
    </div>
  );
}

SessionEnd.propTypes = {
  className: PropTypes.string.isRequired,
};

SessionEnd.defaultProps = {};

export default SessionEnd;
