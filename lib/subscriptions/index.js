const requireDirectory = require('require-directory');

module.exports = (context) => {
  const { socket } = context;

  requireDirectory(module, ({
    visit: ({ eventName, handler }) => {
      socket.on(eventName, (...params) => {
        handler(context, ...params);
      });
    },
  }));
};
