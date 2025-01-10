/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes the series of the given `seriesId` from the database.
 * Deleting a series will only delete assignment of items to it, not the items themselves!
 */
class DeleteSeries extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series to be deleted.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeDelete*
   *         - Type: boolean
   *         - Description: If set to `true`, item with the same ID as seriesId will be also deleted. Default is `false`.
   */
  constructor(seriesId, optional) {
    super('DELETE', `/series/${seriesId}`, 3000, false);
    this.seriesId = seriesId;
    optional = optional || {};
    this.cascadeDelete = optional.cascadeDelete;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

    if(this.cascadeDelete !== undefined)
      params.cascadeDelete = this.cascadeDelete;

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

exports.DeleteSeries = DeleteSeries
