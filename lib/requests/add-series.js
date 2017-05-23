/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Creates new series in the database.
 */
class AddSeries extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series to be created.
   */
  constructor(seriesId) {
    super('PUT', `/series/${seriesId}`, 1000, false);
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

exports.AddSeries = AddSeries
