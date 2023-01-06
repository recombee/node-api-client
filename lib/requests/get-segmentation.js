/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Get existing Segmentation.
 */
class GetSegmentation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the Segmentation that should be returned
   */
  constructor(segmentationId) {
    super('GET', `/segmentations/list/${segmentationId}`, 10000, false);
    this.segmentationId = segmentationId;
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

exports.GetSegmentation = GetSegmentation
