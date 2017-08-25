/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * List all the cart additions ever made by a given user.
 */
class ListUserCartAdditions extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user whose cart additions are to be listed.
   */
  constructor(userId) {
    super('GET', `/users/${userId}/cartadditions/`, 100000, false);
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

exports.ListUserCartAdditions = ListUserCartAdditions
