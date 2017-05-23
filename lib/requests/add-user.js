/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds a new user to the database.
 */
class AddUser extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user to be added.
   */
  constructor(userId) {
    super('PUT', `/users/${userId}`, 1000, false);
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

exports.AddUser = AddUser
