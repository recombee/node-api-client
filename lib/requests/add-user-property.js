/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adding an user property is somehow equivalent to adding a column to the table of users. The users may be characterized by various properties of different types.
 */
class AddUserProperty extends rqs.Request {

  /**
   * Construct the request
   * @param {string} propertyName - Name of the user property to be created. Currently, the following names are reserved:`id`, `userid`, case insensitively. Also, the length of the property name must not exceed 63 characters.
   * @param {string} type - Value type of the user property to be created. One of: `int`, `double`, `string`, `boolean`, `timestamp`, `set`.
   * * `int` - Signed integer number.
   * * `double` - Floating point number. It uses 64-bit base-2 format (IEEE 754 standard).
   * * `string` - UTF-8 string.
   * * `boolean` - *true* / *false*
   * * `timestamp` - Value representing date and time.
   * * `set` - Set of strings.
   */
  constructor(propertyName, type) {
    super('PUT', `/users/properties/${propertyName}`, 100000, false);
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

exports.AddUserProperty = AddUserProperty
