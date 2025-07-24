/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds a new synonym for the [Search items](https://docs.recombee.com/api#search-items).
 * When the `term` is used in the search query, the `synonym` is also used for the full-text search.
 * Unless `oneWay=true`, it works also in the opposite way (`synonym` -> `term`).
 * An example of a synonym can be `science fiction` for the term `sci-fi`.
 */
class AddSearchSynonym extends rqs.Request {

  /**
   * Construct the request
   * @param {string} term - A word to which the `synonym` is specified.
   * @param {string} synonym - A word that should be considered equal to the `term` by the full-text search engine.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *oneWay*
   *         - Type: boolean
   *         - Description: If set to `true`, only `term` -> `synonym` is considered. If set to `false`, also `synonym` -> `term` works.
   * Default: `false`.
   */
  constructor(term, synonym, optional) {
    super('POST', '/synonyms/items/', 10000, false);
    this.term = term;
    this.synonym = synonym;
    optional = optional || {};
    this.oneWay = optional.oneWay;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.term = this.term;
    params.synonym = this.synonym;

    if(this.oneWay !== undefined)
      params.oneWay = this.oneWay;

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

exports.AddSearchSynonym = AddSearchSynonym
