const createHttpError = require('http-errors');

module.exports.badRequestError = (err, message = 'Bad request') => {
  createHttpError(400, message);
};

module.exports.unauthorizedError = (message = 'Unauthorized') => {
  createHttpError(401, message);
};

module.exports.forbiddenError = (message = 'Forbidden') => {
  createHttpError(403, message);
};

module.exports.notFoundError = (message = 'Not found') => {
  createHttpError(404, message);
};

module.exports.internalError = (message = 'Internal error') => {
  createHttpError(500, message);
};
