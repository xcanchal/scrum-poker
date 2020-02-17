import 'core-js/stable';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

// const io = io(`http://${process.env.HOST}:${process.env.SERVER_PORT}`);

import App from './root/app';

render(
  <App io={io} />,
  document.getElementById('root'),
);
