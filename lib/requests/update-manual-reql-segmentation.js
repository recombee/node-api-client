/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Update an existing Segmentation.
 */
class UpdateManualReqlSegmentation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the updated Segmentation
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *title*
   *         - Type: string
   *         - Description: Human-readable name that is shown in the Recombee Admin UI.
   *     - *description*
   *         - Type: string
   *         - Description: Description that is shown in the Recombee Admin UI.
   */
  constructor(segmentationId, optional) {
    super('POST', `/segmentations/manual-reql/${segmentationId}`, 10000, false);
    this.segmentationId = segmentationId;
    optional = optional || {};
    this.title = optional.title;
    this.description = optional.description;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

    if(this.title !== undefined)
      params.title = this.title;

    if(this.description !== undefined)
      params.description = this.description;

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

exports.UpdateManualReqlSegmentation = UpdateManualReqlSegmentation
