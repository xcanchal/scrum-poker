import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../routes/home';

export default ({ io }) => (
  <Switch>
    <Route exact path="/" render={(props) => (
      <Home io={io} {...props} />
    )} />
    <Route path="*">{() => <h1>404 - Not found</h1>}</Route>
  </Switch>
);

