'use strict';
const ae = require("./api-error");

/**
 * Error thrown when a request did not succeed (did not return 200 or 201)
 */
class ResponseError extends ae.ApiError {
  /**
   * Create the exception
   * @param {Request} request - Request which caused the exception
   * @param {number} statusCode - The returned status code
   * @param {string} message - Error message from the API
   */
  constructor(request, statusCode, message) {
    super(message);
    this.request = request;
    this.statusCode = statusCode;
  }
}

exports.ResponseError = ResponseError
