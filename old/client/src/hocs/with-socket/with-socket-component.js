import React from 'react';

import { SocketConsumer } from '../../components/socket';

const WithSocket = (props) => (
  <SocketConsumer>
    {(socketProps) => (
      <props.component { ...props} {...socketProps } />
    )}
  </SocketConsumer>
);

export default WithSocket;
