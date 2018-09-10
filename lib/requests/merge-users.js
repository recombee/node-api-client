/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Merges interactions (purchases, ratings, bookmarks, detail views ...) of two different users under a single user ID. This is especially useful for online e-commerce applications working with anonymous users identified by unique tokens such as the session ID. In such applications, it may often happen that a user owns a persistent account, yet accesses the system anonymously while, e.g., putting items into a shopping cart. At some point in time, such as when the user wishes to confirm the purchase, (s)he logs into the system using his/her username and password. The interactions made under anonymous session ID then become connected with the persistent account, and merging these two together becomes desirable.
 * Merging happens between two users referred to as the *target* and the *source*. After the merge, all the interactions of the source user are attributed to the target user, and the source user is **deleted**.
 */
class MergeUsers extends rqs.Request {

  /**
   * Construct the request
   * @param {string} targetUserId - ID of the targer user.
   * @param {string} sourceUserId - ID of the source user.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: Sets whether the user *targetUserId* should be created if not present in the database.
   */
  constructor(targetUserId, sourceUserId, optional) {
    super('PUT', `/users/${targetUserId}/merge/${sourceUserId}`, 10000, false);
    this.targetUserId = targetUserId;
    this.sourceUserId = sourceUserId;
    optional = optional || {};
    this.cascadeCreate = optional.cascadeCreate;
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
    if (this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;
    return params;
  }
}

exports.MergeUsers = MergeUsers
