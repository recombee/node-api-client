/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Get all [Scenarios](https://docs.recombee.com/scenarios) of the given database.
 */
class ListScenarios extends rqs.Request {

  /**
   * Construct the request
   */
  constructor() {
    super('GET', '/scenarios/', 10000, false);
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

exports.ListScenarios = ListScenarios
