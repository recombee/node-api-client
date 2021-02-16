/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes all synonyms defined in the database.
 */
class DeleteAllSearchSynonyms extends rqs.Request {

  /**
   * Construct the request
   */
  constructor() {
    super('DELETE', '/synonyms/items/', 10000, false);
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

exports.DeleteAllSearchSynonyms = DeleteAllSearchSynonyms
