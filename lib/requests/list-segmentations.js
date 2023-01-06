/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Return all existing items Segmentations.
 */
class ListSegmentations extends rqs.Request {

  /**
   * Construct the request
   * @param {string} sourceType - List Segmentations based on a particular type of data. Currently only `items` are supported.
   */
  constructor(sourceType) {
    super('GET', '/segmentations/list/', 10000, false);
    this.sourceType = sourceType;
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
    params.sourceType = this.sourceType;
    return params;
  }
}

exports.ListSegmentations = ListSegmentations
