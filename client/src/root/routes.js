import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WithSocket from '../hocs/with-socket';
import Home from '../routes/home';
import Room from '../routes/room';

export default () => (
  <Switch>
    <Route exact path="/" render={(props) => (
      <WithSocket {...props} component={Home} />
    )} />
    <Route exact path="/room/:roomId?" render={(props) => (
      <WithSocket {...props} component={Room} />
    )} />
    <Route path="*">{() => <h1>404 - Not found</h1>}</Route>
  </Switch>
);

