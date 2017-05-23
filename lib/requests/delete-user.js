/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes a user of given *userId* from the database.
 * If there are any purchases, ratings, bookmarks, cart additions or detail views made by the user present in the database, they will be deleted in cascade as well.
 */
class DeleteUser extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user to be added.
   */
  constructor(userId) {
    super('DELETE', `/users/${userId}`, 1000, false);
    this.userId = userId;
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

exports.DeleteUser = DeleteUser
