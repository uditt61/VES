export class ApiError extends Error {
  constructor(message = 'Internal Server Error', statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errors = null) {
    return new ApiError(message, 400, errors);
  }

  static unauthorized(message = 'Unauthorized access') {
    return new ApiError(message, 401);
  }

  static forbidden(message = 'Forbidden action') {
    return new ApiError(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(message, 404);
  }

  static conflict(message = 'Resource already exists') {
    return new ApiError(message, 409);
  }

  static unprocessable(message = 'Validation Error', errors = null) {
    return new ApiError(message, 422, errors);
  }
}
