/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * List all the ever-made cart addition of a given item.
 */
class ListItemCartAdditions extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item of which the cart addition are to be listed.
   */
  constructor(itemId) {
    super('GET', `/items/${itemId}/cartadditions/`, 100000, false);
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

exports.ListItemCartAdditions = ListItemCartAdditions
