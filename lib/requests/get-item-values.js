/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets all the current property values of the given item.
 */
class GetItemValues extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item whose properties are to be obtained.
   */
  constructor(itemId) {
    super('GET', `/items/${itemId}`, 3000, false);
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

exports.GetItemValues = GetItemValues
