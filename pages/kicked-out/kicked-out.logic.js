import React, { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { initialState } from '../../reducer';
import { useGlobalState } from '../../context/global-state';
import HtmlHead from '../../components/html-head';
import { setRoom } from '../../reducer/actions';
import Layout from '../../components/layout';

const KickedOut = ({ className }) => {
  // const [{ room }, dispatch] = useGlobalState();
/*
  useEffect(() => {
    if (room.id !== null) {
      dispatch(setRoom(initialState.room));
    }
  }, [dispatch, room.id]); */

  return (
    <div id="component-kicked-out" className={className}>
      <Layout>
        <HtmlHead title="Scrum poker - Kicked out" />
        <div className="component-unexisting-room__content">
          <h1>Oops</h1>
          <p>You have been kicked out by the host.</p>
        </div>
      </Layout>
    </div>
  );
};

KickedOut.propTypes = {
  className: PropTypes.string.isRequired,
};

KickedOut.defaultProps = {};

export default KickedOut;
