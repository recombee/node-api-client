/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adding an item property is somehow equivalent to adding a column to the table of items. The items may be characterized by various properties of different types.
 */
class AddItemProperty extends rqs.Request {

  /**
   * Construct the request
   * @param {string} propertyName - Name of the item property to be created. Currently, the following names are reserved:`id`, `itemid`, case insensitively. Also, the length of the property name must not exceed 63 characters.
   * @param {string} type - Value type of the item property to be created. One of: `int`, `double`, `string`, `boolean`, `timestamp`, `set`
   */
  constructor(propertyName, type) {
    super('PUT', `/items/properties/${propertyName}`, 1000, false);
    this.propertyName = propertyName;
    this.type = type;
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
    params.type = this.type;
    return params;
  }
}

exports.AddItemProperty = AddItemProperty
