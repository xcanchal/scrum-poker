import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/header';
import Routes from './routes';

import GlobalStyles from './global-styles';

const App = ({ io }) => (
  <Fragment>
    <GlobalStyles />
    <Router>
      <div className="layout-header">
        <Header />
      </div>
      <div className="layout-content">
        <Routes io={io} />
      </div>
    </Router>
  </Fragment>
);

export default App;
