export default (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let error = err.error || "Internal Server Error";
  let message = err.message || "Something went wrong";

  if (err.statusCode == 400) {
    error = "Bad Request";
  } else if (err.statusCode == 401) {
    error = "Unauthorized";
  } else if (err.statusCode == 403) {
    error = "Forbidden";
  } else if (err.statusCode == 404) {
    error = "Not Found";
  } else if (err.statusCode == 409) {
    error = "Conflict";
  } else if (err.statusCode == 422) {
    error = "Unprocessable Entity";
  } else if (err.statusCode == 429) {
    error = "Too Many Requests";
  } else if (err.statusCode == 500) {
    error = "Internal Server Error";
  } else if (err.statusCode == 501) {
    error = "Not Implemented";
  } else if (err.statusCode == 502) {
    error = "Bad Gateway";
  } else if (err.statusCode == 503) {
    error = "Service Unavailable";
  }

  res.status(statusCode).json({
    message: message,
    error: error,
    statusCode: statusCode,
  });
};
