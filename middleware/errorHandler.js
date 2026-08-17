/**
 * Global Express Error Handling Middleware
 * Ensures sensitive internal errors, stack traces, or credentials are never leaked to the client.
 */
export function errorHandler(err, req, res, next) {
  // Log full internal error for server monitoring/debugging
  console.error('💥 Internal Server Error:', {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Check if response has already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Safe client response (Requirement 8)
  const statusCode = err.status || err.statusCode || 500;
  
  return res.status(statusCode).json({
    success: false,
    message: 'Unable to send your message. Please try again later.'
  });
}
