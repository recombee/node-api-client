/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds a detail view of a given item made by a given user.
 */
class AddDetailView extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - User who viewed the item
   * @param {string} itemId - Viewed item
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *timestamp*
   *         - Type: string|number
   *         - Description: UTC timestamp of the view as ISO8601-1 pattern or UTC epoch time. The default value is the current time.
   *     - *duration*
   *         - Type: number
   *         - Description: Duration of the view
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the given user/item should be created if not present in the database.
   *     - *recommId*
   *         - Type: string
   *         - Description: If this detail view is based on a recommendation request, `recommId` is the id of the clicked recommendation.
   *     - *additionalData*
   *         - Type: 
   *         - Description: A dictionary of additional data for the interaction.
   */
  constructor(userId, itemId, optional) {
    super('POST', '/detailviews/', 1000, false);
    this.userId = userId;
    this.itemId = itemId;
    optional = optional || {};
    this.timestamp = optional.timestamp;
    this.duration = optional.duration;
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

    if(this.timestamp !== undefined)
      params.timestamp = this.timestamp;

    if(this.duration !== undefined)
      params.duration = this.duration;

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

exports.AddDetailView = AddDetailView
