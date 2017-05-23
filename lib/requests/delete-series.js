/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes the series of given `seriesId` from the database.
 * Deleting a series will only delete assignment of items to it, not the items themselves!
 */
class DeleteSeries extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series to be deleted.
   */
  constructor(seriesId) {
    super('DELETE', `/series/${seriesId}`, 1000, false);
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

exports.DeleteSeries = DeleteSeries
