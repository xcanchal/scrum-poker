import React from 'react';
import PropTypes from 'prop-types';

import HtmlHead from '../../components/html-head';
import Layout from '../../components/layout';

const KickedOut = ({ className }) => (
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

KickedOut.propTypes = {
  className: PropTypes.string.isRequired,
};

KickedOut.defaultProps = {};

export default KickedOut;
