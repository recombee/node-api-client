/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * List all the items present in the given series, sorted according to their time index values.
 */
class ListSeriesItems extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series items of which are to be listed.
   */
  constructor(seriesId) {
    super('GET', `/series/${seriesId}/items/`, 100000, false);
    this.seriesId = seriesId;
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

exports.ListSeriesItems = ListSeriesItems
