/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gets a list of IDs of users currently present in the catalog.
 */
class ListUsers extends rqs.Request {

  /**
   * Construct the request
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter users to be listed. Only the users for which the expression is *true* will be returned.
   *     - *count*
   *         - Type: number
   *         - Description: The number of users to be listed.
   *     - *offset*
   *         - Type: number
   *         - Description: Specifies the number of users to skip (ordered by `userId`).
   *     - *returnProperties*
   *         - Type: boolean
   *         - Description: With `returnProperties=true`, property values of the listed users are returned along with their IDs in a JSON dictionary. 
   * Example response:
   * ```json
   *   [
   *     {
   *       "userId": "user-81",
   *       "country": "US",
   *       "sex": "M"
   *     },
   *     {
   *       "userId": "user-314",
   *       "country": "CAN",
   *       "sex": "F"
   *     }
   *   ]
   * ```
   *     - *includedProperties*
   *         - Type: string[]
   *         - Description: Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list.
   * Example response for `includedProperties=country`:
   * ```json
   *   [
   *     {
   *       "userId": "user-81",
   *       "country": "US"
   *     },
   *     {
   *       "userId": "user-314",
   *       "country": "CAN"
   *     }
   *   ]
   * ```
   */
  constructor(optional) {
    super('GET', '/users/list/', 100000, false);
    optional = optional || {};
    this.filter = optional.filter;
    this.count = optional.count;
    this.offset = optional.offset;
    this.returnProperties = optional.returnProperties;
    this.includedProperties = optional.includedProperties;
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
    if (this.filter !== undefined)
      params.filter = this.filter;
    if (this.count !== undefined)
      params.count = this.count;
    if (this.offset !== undefined)
      params.offset = this.offset;
    if (this.returnProperties !== undefined)
      params.returnProperties = this.returnProperties;
    if (this.includedProperties !== undefined)
      params.includedProperties = this.includedProperties;
    return params;
  }
}

exports.ListUsers = ListUsers
