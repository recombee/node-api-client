/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Sets viewed portion of an item (for example a video or article) by a user (at a session).
 * If you send new request with the same (`userId`, `itemId`, `sessionId`), the portion gets updated.
 */
class SetViewPortion extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - User who viewed a portion of the item
   * @param {string} itemId - Viewed item
   * @param {number} portion - Viewed portion of the item (number between 0.0 (viewed nothing) and 1.0 (viewed full item) ). It should be the really viewed part of the item, no matter seeking, so for example if the user seeked immediately to half of the item and then viewed 10% of the item, the `portion` should still be `0.1`.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *sessionId*
   *         - Type: string
   *         - Description: ID of session in which the user viewed the item. Default is `null` (`None`, `nil`, `NULL` etc. depending on language).
   *     - *timestamp*
   *         - Type: string|number
   *         - Description: UTC timestamp of the rating as ISO8601-1 pattern or UTC epoch time. The default value is the current time.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the given user/item should be created if not present in the database.
   *     - *recommId*
   *         - Type: string
   *         - Description: If this view portion is based on a recommendation request, `recommId` is the id of the clicked recommendation.
   *     - *additionalData*
   *         - Type: 
   *         - Description: A dictionary of additional data for the interaction.
   */
  constructor(userId, itemId, portion, optional) {
    super('POST', '/viewportions/', 1000, false);
    this.userId = userId;
    this.itemId = itemId;
    this.portion = portion;
    optional = optional || {};
    this.sessionId = optional.sessionId;
    this.timestamp = optional.timestamp;
    this.cascadeCreate = optional.cascadeCreate;
    this.recommId = optional.recommId;
    this.additionalData = optional.additionalData;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.userId = this.userId;
    params.itemId = this.itemId;
    params.portion = this.portion;

    if(this.sessionId !== undefined)
      params.sessionId = this.sessionId;

    if(this.timestamp !== undefined)
      params.timestamp = this.timestamp;

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

    if(this.recommId !== undefined)
      params.recommId = this.recommId;

    if(this.additionalData !== undefined)
      params.additionalData = this.additionalData;

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

exports.SetViewPortion = SetViewPortion
