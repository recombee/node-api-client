/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets a list of IDs of items currently present in the catalog.
 */
class ListItems extends rqs.Request {

  /**
   * Construct the request
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql.html) expression, which allows you to filter items to be listed. Only the items for which the expression is *true* will be returned.
   */
  constructor(optional) {
    super('GET', '/items/list/', 600000, false);
    optional = optional || {};
    this.filter = optional.filter;
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
    if (this.filter !== undefined)
      params.filter = this.filter;
    return params;
  }
}

exports.ListItems = ListItems
