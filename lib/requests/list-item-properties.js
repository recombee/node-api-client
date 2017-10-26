/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets the list of all the item properties in your database.
 */
class ListItemProperties extends rqs.Request {

  /**
   * Construct the request
   */
  constructor() {
    super('GET', '/items/properties/list/', 100000, false);
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

exports.ListItemProperties = ListItemProperties
