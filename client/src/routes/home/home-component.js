import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ioUrl } from '../../config';

const Home = ({ className, history, io, setSocket }) => {
  const createRoom = async () => {
    const roomId = '1234';
    const socket = await io(`${ioUrl}?roomId=${roomId}`);
    socket.on('connect', () => {
      setSocket(socket);
      history.push(`/room/${roomId}`);
    });
  };

  return (
    <div id="component-home" className={`${className}`}>
      <button onClick={createRoom}>Create room</button>
      {/* <Link to="/room"><small>Join an existing room</small></Link> */}
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  io: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
};

Home.defaultProps = {};

export default withRouter(Home);
