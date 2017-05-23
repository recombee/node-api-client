/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Creates new group in the database.
 */
class AddGroup extends rqs.Request {

  /**
   * Construct the request
   * @param {string} groupId - ID of the group to be created.
   */
  constructor(groupId) {
    super('PUT', `/groups/${groupId}`, 1000, false);
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

exports.AddGroup = AddGroup
