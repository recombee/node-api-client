/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Returns items that shall be shown to a user as next recommendations when the user e.g. scrolls the page down (*infinite scroll*) or goes to the next page.
 * It accepts `recommId` of a base recommendation request (e.g., request from the first page) and the number of items that shall be returned (`count`).
 * The base request can be one of:
 *   - [Recommend Items to Item](https://docs.recombee.com/api#recommend-items-to-item)
 *   - [Recommend Items to User](https://docs.recombee.com/api#recommend-items-to-user)
 *   - [Recommend Items to Item Segment](https://docs.recombee.com/api#recommend-items-to-item-segment)
 *   - [Search Items](https://docs.recombee.com/api#search-items)
 * All the other parameters are inherited from the base request.
 * *Recommend next items* can be called many times for a single `recommId` and each call returns different (previously not recommended) items.
 * The number of *Recommend next items* calls performed so far is returned in the `numberNextRecommsCalls` field.
 * *Recommend next items* can be requested up to 30 minutes after the base request or a previous *Recommend next items* call.
 * For billing purposes, each call to *Recommend next items* is counted as a separate recommendation request.
 */
class RecommendNextItems extends rqs.Request {

  /**
   * Construct the request
   * @param {string} recommId - ID of the base recommendation request for which next recommendations should be returned
   * @param {number} count - Number of items to be recommended
   */
  constructor(recommId, count) {
    super('POST', `/recomms/next/items/${recommId}`, 3000, false);
    this.recommId = recommId;
    this.count = count;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.count = this.count;

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

exports.RecommendNextItems = RecommendNextItems
