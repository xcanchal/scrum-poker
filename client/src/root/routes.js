import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WithSocket from '../hocs/with-socket';

import Home from '../routes/home';
import Join from '../routes/join';
import Room from '../routes/room';
import SessionEnd from '../routes/session-end';

export default () => (
  <Switch>
    <Route exact path="/" render={(props) => (
      <WithSocket {...props} component={Home} />
    )} />
    <Route exact path="/join/:roomId?" component={Join} />
    <Route exact path="/room/:roomId?" render={(props) => (
      <WithSocket {...props} component={Room} />
    )} />
    <Route exact path="/session-end" component={SessionEnd} />
    <Route path="*">{() => <h1>404 - Not found</h1>}</Route>
  </Switch>
);

