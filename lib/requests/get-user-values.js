/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets all the current property values of the given user.
 */
class GetUserValues extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user whose properties are to be obtained.
   */
  constructor(userId) {
    super('GET', `/users/${userId}`, 3000, false);
    this.userId = userId;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

    return params;
  }

  /**
   * Get query parameters
   * @return {Object} The values of query parameters (name of parameter: value of the parameter)
   */
  queryParameters() {
    let params = {};
    return params;
  }
}

exports.GetUserValues = GetUserValues
