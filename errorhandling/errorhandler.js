import * as z from "zod";

const ERROR_NAMES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
};

export default (err, req, res, next) => {
  // Zod-valideringsfeil -> 400
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: z.prettifyError(err),
      error: ERROR_NAMES[400],
      statusCode: 400,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const error = ERROR_NAMES[statusCode] || "Internal Server Error";

  res.status(statusCode).json({
    message,
    error,
    statusCode,
  });
};
