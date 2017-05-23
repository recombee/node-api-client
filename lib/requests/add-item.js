/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds new item of given `itemId` to the items catalog.
 * All the item properties for the newly created items are set null.
 */
class AddItem extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item to be created.
   */
  constructor(itemId) {
    super('PUT', `/items/${itemId}`, 1000, false);
    this.itemId = itemId;
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
    return params;
  }
}

exports.AddItem = AddItem
