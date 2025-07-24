/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Segment the items using a [ReQL](https://docs.recombee.com/reql) expression.
 * For each item, the expression should return a set that contains IDs of segments to which the item belongs to.
 */
class CreateAutoReqlSegmentation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} segmentationId - ID of the newly created Segmentation
   * @param {string} sourceType - What type of data should be segmented. Currently only `items` are supported.
   * @param {string} expression - ReQL expression that returns for each item a set with IDs of segments to which the item belongs
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *title*
   *         - Type: string
   *         - Description: Human-readable name that is shown in the Recombee Admin UI.
   *     - *description*
   *         - Type: string
   *         - Description: Description that is shown in the Recombee Admin UI.
   */
  constructor(segmentationId, sourceType, expression, optional) {
    super('PUT', `/segmentations/auto-reql/${segmentationId}`, 10000, false);
    this.segmentationId = segmentationId;
    this.sourceType = sourceType;
    this.expression = expression;
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
    params.sourceType = this.sourceType;
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

exports.CreateAutoReqlSegmentation = CreateAutoReqlSegmentation
