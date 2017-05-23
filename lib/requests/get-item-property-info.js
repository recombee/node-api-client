/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets information about specified item property.
 */
class GetItemPropertyInfo extends rqs.Request {

  /**
   * Construct the request
   * @param {string} propertyName - Name of the property about which the information is to be retrieved.
   */
  constructor(propertyName) {
    super('GET', `/items/properties/${propertyName}`, 1000, false);
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

exports.GetItemPropertyInfo = GetItemPropertyInfo
