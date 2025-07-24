/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Full-text personalized search. The results are based on the provided `searchQuery` and also on the user's past interactions (purchases, ratings, etc.) with the items (items more suitable for the user are preferred in the results).
 * All the string and set item properties are indexed by the search engine.
 * This endpoint should be used in a search box on your website/app. It can be called multiple times as the user is typing the query in order to get the most viable suggestions based on the current state of the query, or once after submitting the whole query. 
 * The returned items are sorted by relevance (the first item being the most relevant).
 * Besides the recommended items, also a unique `recommId` is returned in the response. It can be used to:
 * - Let Recombee know that this search was successful (e.g., user clicked one of the recommended items). See [Reported metrics](https://docs.recombee.com/admin_ui#reported-metrics).
 * - Get subsequent search results when the user scrolls down or goes to the next page. See [Recommend Next Items](https://docs.recombee.com/api#recommend-next-items).
 * It is also possible to use POST HTTP method (for example in the case of a very long ReQL filter) - query parameters then become body parameters.
 */
class SearchItems extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - ID of the user for whom personalized search will be performed.
   * @param {string} searchQuery - Search query provided by the user. It is used for the full-text search.
   * @param {number} count - Number of items to be returned (N for the top-N results).
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *scenario*
   *         - Type: string
   *         - Description: Scenario defines a particular search field in your user interface.
   * You can set various settings to the [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com). You can also see the performance of each scenario in the Admin UI separately, so you can check how well each field performs.
   * The AI that optimizes models to get the best results may optimize different scenarios separately, or even use different models in each of the scenarios.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If the user does not exist in the database, returns a list of non-personalized search results and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system.
   *     - *returnProperties*
   *         - Type: boolean
   *         - Description: With `returnProperties=true`, property values of the recommended items are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended items to the user. 
   * Example response:
   * ```json
   *   {
   *     "recommId": "ce52ada4-e4d9-4885-943c-407db2dee837",
   *     "recomms": 
   *       [
   *         {
   *           "id": "tv-178",
   *           "values": {
   *             "description": "4K TV with 3D feature",
   *             "categories":   ["Electronics", "Televisions"],
   *             "price": 342,
   *             "url": "myshop.com/tv-178"
   *           }
   *         },
   *         {
   *           "id": "mixer-42",
   *           "values": {
   *             "description": "Stainless Steel Mixer",
   *             "categories":   ["Home & Kitchen"],
   *             "price": 39,
   *             "url": "myshop.com/mixer-42"
   *           }
   *         }
   *       ],
   *     "numberNextRecommsCalls": 0
   *   }
   * ```
   *     - *includedProperties*
   *         - Type: string[]
   *         - Description: Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list.
   * Example response for `includedProperties=description,price`:
   * ```json
   *   {
   *     "recommId": "a86ee8d5-cd8e-46d1-886c-8b3771d0520b",
   *     "recomms":
   *       [
   *         {
   *           "id": "tv-178",
   *           "values": {
   *             "description": "4K TV with 3D feature",
   *             "price": 342
   *           }
   *         },
   *         {
   *           "id": "mixer-42",
   *           "values": {
   *             "description": "Stainless Steel Mixer",
   *             "price": 39
   *           }
   *         }
   *       ],
   *     "numberNextRecommsCalls": 0
   *   }
   * ```
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended items based on the values of their attributes.
   * Filters can also be assigned to a [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com).
   *     - *booster*
   *         - Type: string
   *         - Description: Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some items based on the values of their attributes.
   * Boosters can also be assigned to a [scenario](https://docs.recombee.com/scenarios) in the [Admin UI](https://admin.recombee.com).
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
    super('POST', `/search/users/${userId}/items/`, 3000, false);
    this.userId = userId;
    this.searchQuery = searchQuery;
    this.count = count;
    optional = optional || {};
    this.scenario = optional.scenario;
    this.cascadeCreate = optional.cascadeCreate;
    this.returnProperties = optional.returnProperties;
    this.includedProperties = optional.includedProperties;
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

    if(this.returnProperties !== undefined)
      params.returnProperties = this.returnProperties;

    if(this.includedProperties !== undefined)
      params.includedProperties = this.includedProperties;

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

exports.SearchItems = SearchItems
