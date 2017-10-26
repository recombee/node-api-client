/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * List all the items present in the given group.
 */
class ListGroupItems extends rqs.Request {

  /**
   * Construct the request
   * @param {string} groupId - ID of the group items of which are to be listed.
   */
  constructor(groupId) {
    super('GET', `/groups/${groupId}/items/`, 100000, false);
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

exports.ListGroupItems = ListGroupItems
