class ErrorResponce extends Error {
  constructor(err, statusCode) {
    super(err);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponce;
