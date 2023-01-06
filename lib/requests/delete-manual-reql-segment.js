/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Delete a Segment from a Manual ReQL Segmentation.
 */
class DeleteManualReqlSegment extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the Segmentation from which the Segment should be deleted
   * @param {string} segmentId - ID of the Segment that should be deleted
   */
  constructor(segmentationId, segmentId) {
    super('DELETE', `/segmentations/manual-reql/${segmentationId}/segments/${segmentId}`, 10000, false);
    this.segmentationId = segmentationId;
    this.segmentId = segmentId;
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

exports.DeleteManualReqlSegment = DeleteManualReqlSegment
