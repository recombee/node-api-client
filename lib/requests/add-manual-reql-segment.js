/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Adds a new Segment into a Manual ReQL Segmentation.
 * The new Segment is defined by a [ReQL](https://docs.recombee.com/reql) filter that returns `true` for an item in case that this item belongs to the segment.
 */
class AddManualReqlSegment extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the Segmentation to which the new Segment should be added
   * @param {string} segmentId - ID of the newly created Segment
   * @param {string} filter - ReQL filter that returns `true` for items that belong to this Segment. Otherwise returns `false`.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *title*
   *         - Type: string
   *         - Description: Human-readable name of the Segment that is shown in the Recombee Admin UI.
   */
  constructor(segmentationId, segmentId, filter, optional) {
    super('PUT', `/segmentations/manual-reql/${segmentationId}/segments/${segmentId}`, 10000, false);
    this.segmentationId = segmentationId;
    this.segmentId = segmentId;
    this.filter = filter;
    optional = optional || {};
    this.title = optional.title;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.filter = this.filter;

    if(this.title !== undefined)
      params.title = this.title;

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

exports.AddManualReqlSegment = AddManualReqlSegment
