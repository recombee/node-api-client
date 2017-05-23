/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes the group of given `groupId` from the database.
 * Deleting a group will only delete assignment of items to it, not the items themselves!
 */
class DeleteGroup extends rqs.Request {

  /**
   * Construct the request
   * @param {string} groupId - ID of the group to be deleted.
   */
  constructor(groupId) {
    super('DELETE', `/groups/${groupId}`, 1000, false);
    this.groupId = groupId;
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

exports.DeleteGroup = DeleteGroup
