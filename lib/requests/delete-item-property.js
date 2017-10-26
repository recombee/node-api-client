/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deleting an item property is roughly equivalent to removing a column from the table of items.
 */
class DeleteItemProperty extends rqs.Request {

  /**
   * Construct the request
   * @param {string} propertyName - Name of the property to be deleted.
   */
  constructor(propertyName) {
    super('DELETE', `/items/properties/${propertyName}`, 100000, false);
    this.propertyName = propertyName;
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

exports.DeleteItemProperty = DeleteItemProperty
