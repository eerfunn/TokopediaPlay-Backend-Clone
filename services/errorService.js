const errorTemplate = (statusCode, message) => {
  const error = new Error();
  error.code = statusCode;
  error.message = message;
  throw error;
};
module.exports = {
  errorTemplate,
};
