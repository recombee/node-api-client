/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Inserts an existing item/series into a series of the given seriesId at a position determined by time.
 */
class InsertToSeries extends rqs.Request {

  /**
   * Construct the request
   * @param {string} seriesId - ID of the series to be inserted into.
   * @param {string} itemType - `item` iff the regular item from the catalog is to be inserted, `series` iff series is inserted as the item.
   * @param {string} itemId - ID of the item iff `itemType` is `item`. ID of the series iff `itemType` is `series`.
   * @param {number} time - Time index used for sorting items in the series. According to time, items are sorted within series in ascending order. In the example of TV show episodes, the episode number is a natural choice to be passed as time.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Indicates that any non-existing entity specified within the request should be created (as if corresponding PUT requests were invoked). This concerns both the `seriesId` and the `itemId`. If `cascadeCreate` is set to true, the behavior also depends on the `itemType`. In case of `item`, an item is created, in case of `series` a series + corresponding item with the same ID is created.
   */
  constructor(seriesId, itemType, itemId, time, optional) {
    super('POST', `/series/${seriesId}/items/`, 3000, false);
    this.seriesId = seriesId;
    this.itemType = itemType;
    this.itemId = itemId;
    this.time = time;
    optional = optional || {};
    this.cascadeCreate = optional.cascadeCreate;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.itemType = this.itemType;
    params.itemId = this.itemId;
    params.time = this.time;

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

exports.InsertToSeries = InsertToSeries
