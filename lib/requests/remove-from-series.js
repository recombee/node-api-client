/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Removes an existing series item from the series.
 */
class RemoveFromSeries extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series from which a series item is to be removed.
   * @param {string} itemType - Type of the item to be removed.
   * @param {string} itemId - ID of the item iff `itemType` is `item`. ID of the series iff `itemType` is `series`.
   */
  constructor(seriesId, itemType, itemId) {
    super('DELETE', `/series/${seriesId}/items/`, 3000, false);
    this.seriesId = seriesId;
    this.itemType = itemType;
    this.itemId = itemId;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.itemType = this.itemType;
    params.itemId = this.itemId;

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

exports.RemoveFromSeries = RemoveFromSeries
