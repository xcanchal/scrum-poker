import 'core-js/stable';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';

import App from './root/app';

render(
  <App />,
  document.getElementById('root'),
);
