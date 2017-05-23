'use strict';
const rqs = require("./request");

/**
 * Set/update (some) property values of a given entity.
 */
class SetValues extends rqs.Request {

  /**
   * Construct the request
   * @param {Object} values - The values for the individual properties.
   *   {
   *     product_description: '4K TV with 3D feature',
   *     categories:   ['Electronics', 'Televisions'],
   *     price_usd: 342,
   *     in_stock_from: '2016-11-16T08:00Z'
   *   }
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the item should be created if not present in the database.
   */
  constructor(path, values, optional) {
    super('POST', path, 1000, false);
    this.values = values;
    optional = optional || {};
    this.cascadeCreate = optional.cascadeCreate;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let result = this.values;
    if(this.cascadeCreate)
      result['!cascadeCreate'] = true;
    return result;
  }

  /**
   * Get query parameters
   * @return {Object} The values of query parameters (name of parameter: value of the parameter)
   */
  queryParameters() {
    return {};
  }
}

exports.SetValues = SetValues
