/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Inserts an existing item/group into group of given `groupId`.
 */
class InsertToGroup extends rqs.Request {

  /**
   * Construct the request
   * @param {string} groupId - ID of the group to be inserted into.
   * @param {string} itemType - `item` iff the regular item from the catalog is to be inserted, `group` iff group is inserted as the item.
   * @param {string} itemId - ID of the item iff `itemType` is `item`. ID of the group iff `itemType` is `group`.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Indicates that any non-existing entity specified within the request should be created (as is corresponding PUT requests were invoked). This concerns both the `groupId` and the `groupId`. If `cascadeCreate` is set true, the behavior also depends on the `itemType`. Either items or group may be created if not present in the database.
   */
  constructor(groupId, itemType, itemId, optional) {
    super('POST', `/groups/${groupId}/items/`, 1000, false);
    this.groupId = groupId;
    this.itemType = itemType;
    this.itemId = itemId;
    optional = optional || {};
    this.cascadeCreate = optional.cascadeCreate;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.itemType = this.itemType;
    params.itemId = this.itemId;

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

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

exports.InsertToGroup = InsertToGroup
