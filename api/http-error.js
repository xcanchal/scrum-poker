export default class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  toString() {
    return this.message;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
