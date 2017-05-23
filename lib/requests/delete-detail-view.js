/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes an existing detail view uniquely specified by (`userId`, `itemId`, and `timestamp`) or all the detail views with given `userId` and `itemId` if `timestamp` is omitted.
 */
class DeleteDetailView extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user who made the detail view.
   * @param {string} itemId - ID of the item of which the details were viewed.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *timestamp*
   *         - Type: number
   *         - Description: Unix timestamp of the detail view. If the `timestamp` is omitted, then all the detail views with given `userId` and `itemId` are deleted.
   */
  constructor(userId, itemId, optional) {
    super('DELETE', '/detailviews/', 1000, false);
    this.userId = userId;
    this.itemId = itemId;
    optional = optional || {};
    this.timestamp = optional.timestamp;
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
    params.userId = this.userId;
    params.itemId = this.itemId;
    if (this.timestamp !== undefined)
      params.timestamp = this.timestamp;
    return params;
  }
}

exports.DeleteDetailView = DeleteDetailView
