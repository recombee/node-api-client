/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Composite Recommendation returns both a *source entity* (e.g., an Item or [Item Segment](https://docs.recombee.com/segmentations)) and a list of related recommendations in a single response.
 * It is ideal for use cases such as personalized homepage sections (*Articles from <category>*), *Because You Watched <movie>*, or *Artists Related to Your Favorite Artist <artist>*.
 * See detailed **examples and configuration guidance** in the [Composite Scenarios documentation](https://docs.recombee.com/scenarios#composite-recommendations).
 * **Structure**
 * The endpoint operates in two stages:
 * 1. Recommends the *source* (e.g., an Item Segment or item) to the user.
 * 2. Recommends *results* (items or Item Segments) related to that *source*.
 * For example, *Articles from <category>* can be decomposed into:
 *   - [Recommend Item Segments To User](https://docs.recombee.com/api#recommend-item-segments-to-user) to find the category.
 *   - [Recommend Items To Item Segment](https://docs.recombee.com/api#recommend-items-to-item-segment) to recommend articles from that category.
 * Since the first step uses [Recommend Item Segments To User](https://docs.recombee.com/api#recommend-items-to-user), you must include the `userId` parameter in the *Composite Recommendation* request.
 * Each *Composite Recommendation* counts as a single recommendation API request for billing.
 * **Stage-specific Parameters**
 * Additional parameters can be supplied via [sourceSettings](https://docs.recombee.com/api#composite-recommendation-param-sourceSettings) and [resultSettings](https://docs.recombee.com/api#composite-recommendation-param-resultSettings).
 * In the example above:
 *   - `sourceSettings` may include any parameter valid for [Recommend Item Segments To User](https://docs.recombee.com/api#recommend-items-to-user) (e.g., `filter`, `booster`).
 *   - `resultSettings` may include any parameter valid for [Recommend Items To Item Segment](https://docs.recombee.com/api#recommend-items-to-item-segment).
 * See [this example](https://docs.recombee.com/api#composite-recommendation-example-setting-parameters-for-individual-stages) for more details.
 */
class CompositeRecommendation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} scenario - Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing".
   * You can set various settings to the [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com). You can also see the performance of each scenario in the Admin UI separately, so you can check how well each application performs.
   * The AI that optimizes models to get the best results may optimize different scenarios separately or even use different models in each of the scenarios.
   * @param {number} count - Number of items to be recommended (N for the top-N recommendation).
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *itemId*
   *         - Type: string
   *         - Description: ID of the item for which the recommendations are to be generated.
   *     - *userId*
   *         - Type: string
   *         - Description: ID of the user for which the recommendations are to be generated.
   *     - *logic*
   *         - Type: string | object
   *         - Description: Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case.
   * See [this section](https://docs.recombee.com/recommendation_logics) for a list of available logics and other details.
   * The difference between `logic` and `scenario` is that `logic` specifies mainly behavior, while `scenario` specifies the place where recommendations are shown to the users.
   * Logic can also be set to a [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com).
   *     - *segmentId*
   *         - Type: string
   *         - Description: ID of the segment from `contextSegmentationId` for which the recommendations are to be generated.
   *     - *searchQuery*
   *         - Type: string
   *         - Description: Search query provided by the user. It is used for the full-text search. Only applicable if the *scenario* corresponds to a search scenario.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If the entity for the source recommendation does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that entity, as the entity will be already known to the system.
   *     - *sourceSettings*
   *         - Type: object
   *         - Description: Parameters applied for recommending the *Source* stage. The accepted parameters correspond with the recommendation sub-endpoint used to recommend the *Source*.
   *     - *resultSettings*
   *         - Type: object
   *         - Description: Parameters applied for recommending the *Result* stage. The accepted parameters correspond with the recommendation sub-endpoint used to recommend the *Result*.
   *     - *expertSettings*
   *         - Type: object
   *         - Description: Dictionary of custom options.
   */
  constructor(scenario, count, optional) {
    super('POST', '/recomms/composite/', 3000, false);
    this.scenario = scenario;
    this.count = count;
    optional = optional || {};
    this.itemId = optional.itemId;
    this.userId = optional.userId;
    this.logic = optional.logic;
    this.segmentId = optional.segmentId;
    this.searchQuery = optional.searchQuery;
    this.cascadeCreate = optional.cascadeCreate;
    this.sourceSettings = optional.sourceSettings;
    this.resultSettings = optional.resultSettings;
    this.expertSettings = optional.expertSettings;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.scenario = this.scenario;
    params.count = this.count;

    if(this.itemId !== undefined)
      params.itemId = this.itemId;

    if(this.userId !== undefined)
      params.userId = this.userId;

    if(this.logic !== undefined)
      params.logic = this.logic;

    if(this.segmentId !== undefined)
      params.segmentId = this.segmentId;

    if(this.searchQuery !== undefined)
      params.searchQuery = this.searchQuery;

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

    if(this.sourceSettings !== undefined)
      params.sourceSettings = this.sourceSettings;

    if(this.resultSettings !== undefined)
      params.resultSettings = this.resultSettings;

    if(this.expertSettings !== undefined)
      params.expertSettings = this.expertSettings;

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

exports.CompositeRecommendation = CompositeRecommendation
