/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes all the items that pass the filter.
 * If an item becomes obsolete/no longer available, it is meaningful to **keep it in the catalog** (along with all the interaction data, which are very useful) and **only exclude the item from recommendations**. In such a case, use [ReQL filter](https://docs.recombee.com/reql) instead of deleting the item completely.
 */
class DeleteMoreItems extends rqs.Request {

  /**
   * Construct the request
   * @param {string} filter - A [ReQL](https://docs.recombee.com/reql) expression, which returns `true` for the items that shall be updated.
   */
  constructor(filter) {
    super('DELETE', '/more-items/', 100000, false);
    this.filter = filter;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.filter = this.filter;

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

exports.DeleteMoreItems = DeleteMoreItems
