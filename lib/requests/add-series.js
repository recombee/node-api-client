/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Creates a new series in the database.
 */
class AddSeries extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series to be created.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If set to `true`, the item will be created with the same ID as the series. Default is `true`.
   */
  constructor(seriesId, optional) {
    super('PUT', `/series/${seriesId}`, 3000, false);
    this.seriesId = seriesId;
    optional = optional || {};
    this.cascadeCreate = optional.cascadeCreate;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

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
