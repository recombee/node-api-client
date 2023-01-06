/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Updates (some) property values of all the items that pass the filter.
 * Example: *Setting all the items that are older than a week as unavailable*
 *   ```
 *     {
 *       "filter": "'releaseDate' < now() - 7*24*3600",
 *       "changes": {"available": false}
 *     }
 *   ```
 */
class UpdateMoreItems extends rqs.Request {

  /**
   * Construct the request
   * @param {string} filter - A [ReQL](https://docs.recombee.com/reql.html) expression, which returns `true` for the items that shall be updated.
   * @param {} changes - A dictionary where the keys are properties that shall be updated.
   */
  constructor(filter, changes) {
    super('POST', '/more-items/', 1000, false);
    this.filter = filter;
    this.changes = changes;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.filter = this.filter;
    params.changes = this.changes;

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

exports.UpdateMoreItems = UpdateMoreItems
