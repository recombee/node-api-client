/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Update an existing Segmentation.
 */
class UpdateAutoReqlSegmentation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the updated Segmentation
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *expression*
   *         - Type: string
   *         - Description: ReQL expression that returns for each item a set with IDs of segments to which the item belongs
   *     - *title*
   *         - Type: string
   *         - Description: Human-readable name that is shown in the Recombee Admin UI.
   *     - *description*
   *         - Type: string
   *         - Description: Description that is shown in the Recombee Admin UI.
   */
  constructor(segmentationId, optional) {
    super('POST', `/segmentations/auto-reql/${segmentationId}`, 10000, false);
    this.segmentationId = segmentationId;
    optional = optional || {};
    this.expression = optional.expression;
    this.title = optional.title;
    this.description = optional.description;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

    if(this.expression !== undefined)
      params.expression = this.expression;

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

exports.UpdateAutoReqlSegmentation = UpdateAutoReqlSegmentation
