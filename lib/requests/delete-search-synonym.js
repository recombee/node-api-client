/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes synonym of given `id` and this synonym is no longer taken into account in the [Search items](https://docs.recombee.com/api.html#search-items).
 */
class DeleteSearchSynonym extends rqs.Request {

  /**
   * Construct the request
   * @param {string} id - ID of the synonym that should be deleted.
   */
  constructor(id) {
    super('DELETE', `/synonyms/items/${id}`, 10000, false);
    this.id = id;
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

exports.DeleteSearchSynonym = DeleteSearchSynonym
