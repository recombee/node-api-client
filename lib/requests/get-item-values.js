/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Get all the current property values of a given item.
 */
class GetItemValues extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item properties of which are to be obtained.
   */
  constructor(itemId) {
    super('GET', `/items/${itemId}`, 1000, false);
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
