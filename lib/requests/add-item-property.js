/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adding an item property is somewhat equivalent to adding a column to the table of items. The items may be characterized by various properties of different types.
 */
class AddItemProperty extends rqs.Request {

  /**
   * Construct the request
   * @param {string} propertyName - Name of the item property to be created. Currently, the following names are reserved: `id`, `itemid`, case-insensitively. Also, the length of the property name must not exceed 63 characters.
   * @param {string} type - Value type of the item property to be created. One of: `int`, `double`, `string`, `boolean`, `timestamp`, `set`, `image` or `imageList`.
   * * `int` - Signed integer number.
   * * `double` - Floating point number. It uses 64-bit base-2 format (IEEE 754 standard).
   * * `string` - UTF-8 string.
   * * `boolean` - *true* / *false*
   * * `timestamp` - Value representing date and time. ISO8601-1 pattern (string) or UTC epoch time (number).
   * * `set` - Set of strings.
   * * `image` - URL of an image (`jpeg`, `png` or `gif`).
   * * `imageList` - List of URLs that refer to images.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *role*
   *         - Type: string | object
   *         - Description: [Role](https://docs.recombee.com/api/property_roles_metadata#roles) to assign to the property.
   *     - *metadata*
   *         - Type: string[]
   *         - Description: List of [metadata](https://docs.recombee.com/api/property_roles_metadata#metadata) entries to assign to the property.
   */
  constructor(propertyName, type, optional) {
    super('PUT', `/items/properties/${propertyName}`, 100000, false);
    this.propertyName = propertyName;
    this.type = type;
    optional = optional || {};
    this.role = optional.role;
    this.metadata = optional.metadata;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.type = this.type;

    if(this.role !== undefined)
      params.role = this.role;

    if(this.metadata !== undefined)
      params.metadata = this.metadata;

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

exports.AddItemProperty = AddItemProperty
