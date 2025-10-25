function errorHandler(err, req, res, next) {
  console.error("Error occurred:");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("Status:", err.status);

  const status = err.status || 500;
  const response = {
    error: err.message || "Internal server error",
  };

  // Include stack trace in development
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

module.exports = errorHandler;
