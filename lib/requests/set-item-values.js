'use strict';
const svr = require("./set-values");

/**
 * Set/update (some) property values of a given item. The properties (columns) must be previously created by [Add item property](https://docs.recombee.com/api#add-item-property).
 */
class SetItemValues extends svr.SetValues {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item which will be modified.
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
  constructor(itemId, values, optional) {
    super(`/items/${itemId}`, values, optional);
  }
}
exports.SetItemValues = SetItemValues
