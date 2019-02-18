/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds a rating of given item made by a given user.
 */
class AddRating extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - User who submitted the rating
   * @param {string} itemId - Rated item
   * @param {number} rating - Rating rescaled to interval [-1.0,1.0], where -1.0 means the worst rating possible, 0.0 means neutral, and 1.0 means absolutely positive rating. For example, in the case of 5-star evaluations, rating = (numStars-3)/2 formula may be used for the conversion.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *timestamp*
   *         - Type: string|number
   *         - Description: UTC timestamp of the rating as ISO8601-1 pattern or UTC epoch time. The default value is the current time.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the given user/item should be created if not present in the database.
   *     - *recommId*
   *         - Type: string
   *         - Description: If this rating is based on a recommendation request, `recommId` is the id of the clicked recommendation.
   *     - *additionalData*
   *         - Type: 
   *         - Description: A dictionary of additional data for the interaction.
   */
  constructor(userId, itemId, rating, optional) {
    super('POST', '/ratings/', 1000, false);
    this.userId = userId;
    this.itemId = itemId;
    this.rating = rating;
    optional = optional || {};
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
    params.rating = this.rating;

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

exports.AddRating = AddRating
