/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds a cart addition of a given item made by a given user.
 */
class AddCartAddition extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - User who added the item to the cart
   * @param {string} itemId - Item added to the cart
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *timestamp*
   *         - Type: string|number
   *         - Description: UTC timestamp of the cart addition as ISO8601-1 pattern or UTC epoch time. The default value is the current time.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the given user/item should be created if not present in the database.
   *     - *amount*
   *         - Type: number
   *         - Description: Amount (number) added to cart. The default is 1. For example if `user-x` adds two `item-y` during a single order (session...), the `amount` should equal to 2.
   *     - *price*
   *         - Type: number
   *         - Description: Price of the added item. If `amount` is greater than 1, sum of prices of all the items should be given.
   *     - *recommId*
   *         - Type: string
   *         - Description: If this cart addition is based on a recommendation request, `recommId` is the id of the clicked recommendation.
   *     - *additionalData*
   *         - Type: 
   *         - Description: A dictionary of additional data for the interaction.
   */
  constructor(userId, itemId, optional) {
    super('POST', '/cartadditions/', 1000, false);
    this.userId = userId;
    this.itemId = itemId;
    optional = optional || {};
    this.timestamp = optional.timestamp;
    this.cascadeCreate = optional.cascadeCreate;
    this.amount = optional.amount;
    this.price = optional.price;
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

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

    if(this.amount !== undefined)
      params.amount = this.amount;

    if(this.price !== undefined)
      params.price = this.price;

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

exports.AddCartAddition = AddCartAddition
