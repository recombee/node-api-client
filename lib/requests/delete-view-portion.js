/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes an existing view portion specified by (`userId`, `itemId`, `sessionId`) from the database.
 */
class DeleteViewPortion extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user who rated the item.
   * @param {string} itemId - ID of the item which was rated.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *sessionId*
   *         - Type: string
   *         - Description: Identifier of a session.
   */
  constructor(userId, itemId, optional) {
    super('DELETE', '/viewportions/', 1000, false);
    this.userId = userId;
    this.itemId = itemId;
    optional = optional || {};
    this.sessionId = optional.sessionId;
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
    if (this.sessionId !== undefined)
      params.sessionId = this.sessionId;
    return params;
  }
}

exports.DeleteViewPortion = DeleteViewPortion
