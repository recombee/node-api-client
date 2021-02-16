/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Gives the list of synonyms defined in the database.
 */
class ListSearchSynonyms extends rqs.Request {

  /**
   * Construct the request
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *count*
   *         - Type: number
   *         - Description: The number of synonyms to be listed.
   *     - *offset*
   *         - Type: number
   *         - Description: Specifies the number of synonyms to skip (ordered by `term`).
   */
  constructor(optional) {
    super('GET', '/synonyms/items/', 100000, false);
    optional = optional || {};
    this.count = optional.count;
    this.offset = optional.offset;
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
    if (this.count !== undefined)
      params.count = this.count;
    if (this.offset !== undefined)
      params.offset = this.offset;
    return params;
  }
}

exports.ListSearchSynonyms = ListSearchSynonyms
