'use strict';
const svr = require("./set-values");

/**
 * Set/update (some) property values of a given user. The properties (columns) must be previously created by [Add user property](https://docs.recombee.com/api#add-user-property).
 */
class SetUserValues extends svr.SetValues {
  /**
   * Construct the request
   * @param {string} userId - ID of the user which will be modified.
   * @param {Object} values - The values for the individual properties.
   *   {
   *     country: 'US',
   *     sex: 'F'
   *   }
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the user should be created  if not present in the database.
   */
  constructor(userId, values, optional) {
    super(`/users/${userId}`, values, optional);
  }
}

exports.SetUserValues = SetUserValues
