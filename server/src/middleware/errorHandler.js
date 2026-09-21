import { ApiError } from '../utils/apiError.js';
import { ENV } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    error = ApiError.badRequest(`Resource not found with id of ${err.value}`);
  }

  // Mongoose Duplicate Key (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error = ApiError.conflict(`Duplicate value entered for ${field}`);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
    error = ApiError.unprocessable('Validation Error', messages);
  }

  const statusCode = error.statusCode || 500;
  
  // In production, mask non-operational or 500 internal errors to prevent leaking system/database internals
  let clientMessage = error.message || 'Internal Server Error';
  if (ENV.NODE_ENV === 'production' && (statusCode >= 500 || !error.isOperational)) {
    clientMessage = 'An unexpected internal server error occurred. Please try again later.';
  }

  const response = {
    success: false,
    message: clientMessage,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  // Never expose stack trace in production
  if (ENV.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  if (statusCode >= 500) {
    console.error(`💥 Server Error [${req.method} ${req.originalUrl}]:`, err.message || err);
  }

  res.status(statusCode).json(response);
};
