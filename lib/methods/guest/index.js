const requireDirectory = require('require-directory');
const camel = require('camelcase');

module.exports = requireDirectory(module, { rename: camel });
