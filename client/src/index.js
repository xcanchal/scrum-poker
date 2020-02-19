import 'core-js/stable';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
// import io from 'socket.io-client';

import App from './root/app';

{/* <App io={io} />, */}
render(
  <App />,
  document.getElementById('root'),
);
