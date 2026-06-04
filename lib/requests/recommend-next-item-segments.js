/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Returns [Item Segments](https://docs.recombee.com/segmentations) to be shown as the next recommendations when a user scrolls (e.g., within a carousel or feed of Item Segments such as brands, artists, topics, or categories).
 * The request requires the `recommId` of a base recommendation request and the number of Segments to return (`count`).
 * The base request can be one of:
 *   - [Recommend Item Segments to Item](https://docs.recombee.com/api#recommend-item-segments-to-item)
 *   - [Recommend Item Segments to User](https://docs.recombee.com/api#recommend-item-segments-to-user)
 *   - [Recommend Item Segments to Item Segment](https://docs.recombee.com/api#recommend-item-segments-to-item-segment)
 *   - [Search Item Segments](https://docs.recombee.com/api#search-item-segments)
 * All other parameters are inherited from the base request associated with the provided `recommId`.
 * This endpoint can be called multiple times for a single `recommId`. Each call returns different Item Segments that have not been recommended in previous calls.
 * The number of calls made so far is returned in the `numberNextRecommsCalls` field.
 * Requests can be made up to 30 minutes after the base request or the most recent Recommend Next Item Segments call.
 * For billing purposes, each call to this endpoint is counted as a separate recommendation request.
 */
class RecommendNextItemSegments extends rqs.Request {

  /**
   * Construct the request
   * @param {string} recommId - ID of the base recommendation request for which next recommendations should be returned
   * @param {number} count - Number of item segments to be recommended
   */
  constructor(recommId, count) {
    super('POST', `/recomms/next/item-segments/${recommId}`, 3000, false);
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

exports.RecommendNextItemSegments = RecommendNextItemSegments
