/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Full-text personalized search that returns Segments from a Segmentation. The results are based on the provided `searchQuery` and also on the user's past interactions (purchases, ratings, etc.).
 * Based on the used Segmentation, this endpoint can be used for example for:
 *   - Searching within categories or brands
 *   - Searching within genres or artists
 * For example if the user is searching for "iPhone" this endpoint can return "cell phones" category.
 * You need to set the used Segmentation the Admin UI in the Scenario settings prior to using this endpoint.
 * The returned segments are sorted by relevance (first segment being the most relevant).
 * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
 */
class SearchItemSegments extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user for whom personalized search will be performed.
   * @param {string} searchQuery - Search query provided by the user. It is used for the full-text search.
   * @param {number} count - Number of segments to be returned (N for the top-N results).
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
  constructor(userId, searchQuery, count, optional) {
    super('POST', `/search/users/${userId}/item-segments/`, 3000, false);
    this.userId = userId;
    this.searchQuery = searchQuery;
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
    params.searchQuery = this.searchQuery;
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

exports.SearchItemSegments = SearchItemSegments
