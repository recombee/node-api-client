/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Removes an existing group item from the group.
 */
class RemoveFromGroup extends rqs.Request {

  /**
   * Construct the request
   * @param {string} groupId - ID of the group from which a group item is to be removed.
   * @param {string} itemType - Type of the item to be removed.
   * @param {string} itemId - ID of the item iff `itemType` is `item`. ID of the group iff `itemType` is `group`.
   */
  constructor(groupId, itemType, itemId) {
    super('DELETE', `/groups/${groupId}/items/`, 1000, false);
    this.groupId = groupId;
    this.itemType = itemType;
    this.itemId = itemId;
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
    params.itemType = this.itemType;
    params.itemId = this.itemId;
    return params;
  }
}

exports.RemoveFromGroup = RemoveFromGroup
