const errorConstants = require("../constants/constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || errorConstants.STATUS_CODES.SERVER_ERROR;
  const message = err.message || errorConstants.MESSAGES.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = errorHandler;
