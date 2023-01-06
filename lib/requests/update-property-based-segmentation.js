/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Updates a Property Based Segmentation
 */
class UpdatePropertyBasedSegmentation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the updated Segmentation
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *propertyName*
   *         - Type: string
   *         - Description: Name of the property on which the Segmentation should be based
   *     - *title*
   *         - Type: string
   *         - Description: Human-readable name that is shown in the Recombee Admin UI.
   *     - *description*
   *         - Type: string
   *         - Description: Description that is shown in the Recombee Admin UI.
   */
  constructor(segmentationId, optional) {
    super('POST', `/segmentations/property-based/${segmentationId}`, 10000, false);
    this.segmentationId = segmentationId;
    optional = optional || {};
    this.propertyName = optional.propertyName;
    this.title = optional.title;
    this.description = optional.description;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

    if(this.propertyName !== undefined)
      params.propertyName = this.propertyName;

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

exports.UpdatePropertyBasedSegmentation = UpdatePropertyBasedSegmentation
