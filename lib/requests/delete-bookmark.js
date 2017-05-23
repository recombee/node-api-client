/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes a bookmark uniquely specified by `userId`, `itemId`, and `timestamp` or all the bookmarks with given `userId` and `itemId` if `timestamp` is omitted.
 */
class DeleteBookmark extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user who made the bookmark.
   * @param {string} itemId - ID of the item of which was bookmarked.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *timestamp*
   *         - Type: number
   *         - Description: Unix timestamp of the bookmark. If the `timestamp` is omitted, then all the bookmarks with given `userId` and `itemId` are deleted.
   */
  constructor(userId, itemId, optional) {
    super('DELETE', '/bookmarks/', 1000, false);
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

exports.DeleteBookmark = DeleteBookmark
