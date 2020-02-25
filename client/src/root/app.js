import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SocketProvider } from '../components/socket';
import Header from '../components/header';
import Routes from './routes';

import GlobalStyles from './global-styles';

const App = () => (
  <SocketProvider>
    <GlobalStyles />
    <Router>
      <div className="layout-header">
        <Header />
      </div>
      <div className="layout-content">
        <Routes />
      </div>
    </Router>
  </SocketProvider>
);

export default App;
