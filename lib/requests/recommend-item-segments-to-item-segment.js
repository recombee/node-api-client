/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Recommends Segments from a result [Segmentation](https://docs.recombee.com/segmentations) that are the most relevant to a particular Segment from a context Segmentation.
 * Based on the used Segmentations, this endpoint can be used for example for:
 *   - Recommending the related brands to particular brand
 *   - Recommending the related brands to particular category
 *   - Recommending the related artists to a particular genre (assuming songs are the Items)
 * You need to set the used context and result Segmentation the Admin UI in the [Scenario settings](https://docs.recombee.com/scenarios) prior to using this endpoint.
 * The returned segments are sorted by relevance (first segment being the most relevant).
 * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
 */
class RecommendItemSegmentsToItemSegment extends rqs.Request {

  /**
   * Construct the request
   * @param {string} contextSegmentId - ID of the segment from `contextSegmentationId` for which the recommendations are to be generated.
   * @param {string} targetUserId - ID of the user who will see the recommendations.
   * Specifying the *targetUserId* is beneficial because:
   * * It makes the recommendations personalized
   * * Allows the calculation of Actions and Conversions
   *   in the graphical user interface,
   *   as Recombee can pair the user who got recommendations
   *   and who afterward viewed/purchased an item.
   * If you insist on not specifying the user, pass `null`
   * (`None`, `nil`, `NULL` etc., depending on the language) to *targetUserId*.
   * Do not create some special dummy user for getting recommendations,
   * as it could mislead the recommendation models,
   * and result in wrong recommendations.
   * For anonymous/unregistered users, it is possible to use, for example, their session ID.
   * @param {number} count - Number of item segments to be recommended (N for the top-N recommendation).
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *scenario*
   *         - Type: string
   *         - Description: Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing".
   * You can set various settings to the [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com). You can also see the performance of each scenario in the Admin UI separately, so you can check how well each application performs.
   * The AI that optimizes models to get the best results may optimize different scenarios separately or even use different models in each of the scenarios.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system.
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to filter recommended segments based on the `segmentationId`.
   *     - *booster*
   *         - Type: string
   *         - Description: Number-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to boost recommendation rate of some segments based on the `segmentationId`.
   *     - *logic*
   *         - Type: string | object
   *         - Description: Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case.
   * See [this section](https://docs.recombee.com/recommendation_logics) for a list of available logics and other details.
   * The difference between `logic` and `scenario` is that `logic` specifies mainly behavior, while `scenario` specifies the place where recommendations are shown to the users.
   * Logic can also be set to a [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com).
   *     - *expertSettings*
   *         - Type: object
   *         - Description: Dictionary of custom options.
   *     - *returnAbGroup*
   *         - Type: boolean
   *         - Description: If there is a custom AB-testing running, return the name of the group to which the request belongs.
   */
  constructor(contextSegmentId, targetUserId, count, optional) {
    super('POST', '/recomms/item-segments/item-segments/', 3000, false);
    this.contextSegmentId = contextSegmentId;
    this.targetUserId = targetUserId;
    this.count = count;
    optional = optional || {};
    this.scenario = optional.scenario;
    this.cascadeCreate = optional.cascadeCreate;
    this.filter = optional.filter;
    this.booster = optional.booster;
    this.logic = optional.logic;
    this.expertSettings = optional.expertSettings;
    this.returnAbGroup = optional.returnAbGroup;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.contextSegmentId = this.contextSegmentId;
    params.targetUserId = this.targetUserId;
    params.count = this.count;

    if(this.scenario !== undefined)
      params.scenario = this.scenario;

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

    if(this.filter !== undefined)
      params.filter = this.filter;

    if(this.booster !== undefined)
      params.booster = this.booster;

    if(this.logic !== undefined)
      params.logic = this.logic;

    if(this.expertSettings !== undefined)
      params.expertSettings = this.expertSettings;

    if(this.returnAbGroup !== undefined)
      params.returnAbGroup = this.returnAbGroup;

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

exports.RecommendItemSegmentsToItemSegment = RecommendItemSegmentsToItemSegment
