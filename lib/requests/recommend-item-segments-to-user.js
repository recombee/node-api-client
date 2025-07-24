/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Recommends the top Segments from a [Segmentation](https://docs.recombee.com/segmentations) for a particular user, based on the user's past interactions.
 * Based on the used Segmentation, this endpoint can be used for example for:
 *   - Recommending the top categories for the user
 *   - Recommending the top genres for the user
 *   - Recommending the top brands for the user
 *   - Recommending the top artists for the user
 * You need to set the used Segmentation the Admin UI in the [Scenario settings](https://docs.recombee.com/scenarios) prior to using this endpoint.
 * The returned segments are sorted by relevance (first segment being the most relevant).
 * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
 */
class RecommendItemSegmentsToUser extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user for whom personalized recommendations are to be generated.
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
  constructor(userId, count, optional) {
    super('POST', `/recomms/users/${userId}/item-segments/`, 3000, false);
    this.userId = userId;
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

exports.RecommendItemSegmentsToUser = RecommendItemSegmentsToUser
