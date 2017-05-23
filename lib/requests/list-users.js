/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets a list of IDs of users currently present in the catalog.
 */
class ListUsers extends rqs.Request {

  /**
   * Construct the request
   */
  constructor() {
    super('GET', '/users/list/', 239000, false);
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

exports.ListUsers = ListUsers
