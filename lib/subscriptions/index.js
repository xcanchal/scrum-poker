const requireDirectory = require('require-directory');

module.exports = (socket) => {
  requireDirectory(module, ({
    visit: ({ eventName, handler }) => {
      socket.on(eventName, (...params) => {
        handler(socket, ...params);
      });
    },
  }));
};
