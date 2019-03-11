/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Recommend users that are likely to be interested in a given item.
 * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
 * The returned users are sorted by predicted interest in the item (first user being the most interested).
 */
class RecommendUsersToItem extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item for which the recommendations are to be generated.
   * @param {number} count - Number of items to be recommended (N for the top-N recommendation).
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql.html) expression which allows you to filter recommended items based on the values of their attributes.
   *     - *booster*
   *         - Type: string
   *         - Description: Number-returning [ReQL](https://docs.recombee.com/reql.html) expression which allows you to boost recommendation rate of some items based on the values of their attributes.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If item of given *itemId* doesn't exist in the database, it creates the missing item.
   *     - *scenario*
   *         - Type: string
   *         - Description: Scenario defines a particular application of recommendations. It can be for example "homepage", "cart" or "emailing". You can see each scenario in the UI separately, so you can check how well each application performs. The AI which optimizes models in order to get the best results may optimize different scenarios separately, or even use different models in each of the scenarios.
   *     - *logic*
   *         - Type: string|
   *         - Description: Logic specifies particular behavior of the recommendation models. You can pick tailored logic for your domain (e-commerce, multimedia, fashion ...) and use case.
   * See [this section](https://docs.recombee.com/recommendation_logic.html) for list of available logics and other details.
   * The difference between `logic` and `scenario` is that `logic` specifies mainly behavior, while `scenario` specifies the place where recommendations are shown to the users.
   *     - *returnProperties*
   *         - Type: boolean
   *         - Description: With `returnProperties=true`, property values of the recommended users are returned along with their IDs in a JSON dictionary. The acquired property values can be used for easy displaying the recommended users. 
   * Example response:
   * ```
   *   {
   *     "recommId": "039b71dc-b9cc-4645-a84f-62b841eecfce",
   *     "recomms":
   *       [
   *         {
   *           "id": "user-17",
   *           "values": {
   *             "country": "US",
   *             "sex": "F"
   *           }
   *         },
   *         {
   *           "id": "user-2",
   *           "values": {
   *             "country": "CAN",
   *             "sex": "M"
   *           }
   *         }
   *       ]
   *   }
   * ```
   *     - *includedProperties*
   *         - Type: string[]
   *         - Description: Allows to specify, which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. 
   * Example response for `includedProperties=country`:
   * ```
   *   {
   *     "recommId": "b2b355dd-972a-4728-9c6b-2dc229db0678",
   *     "recomms":
   *       [
   *         {
   *           "id": "user-17",
   *           "values": {
   *             "country": "US"
   *           }
   *         },
   *         {
   *           "id": "user-2",
   *           "values": {
   *             "country": "CAN"
   *           }
   *         }
   *       ]
   *   }
   * ```
   *     - *diversity*
   *         - Type: number
   *         - Description: **Expert option** Real number from [0.0, 1.0] which determines how much mutually dissimilar should the recommended items be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification.
   *     - *expertSettings*
   *         - Type: 
   *         - Description: Dictionary of custom options.
   *     - *returnAbGroup*
   *         - Type: boolean
   *         - Description: If there is a custom AB-testing running, return name of group to which the request belongs.
   */
  constructor(itemId, count, optional) {
    super('POST', `/recomms/items/${itemId}/users/`, 50000, false);
    this.itemId = itemId;
    this.count = count;
    optional = optional || {};
    this.filter = optional.filter;
    this.booster = optional.booster;
    this.cascadeCreate = optional.cascadeCreate;
    this.scenario = optional.scenario;
    this.logic = optional.logic;
    this.returnProperties = optional.returnProperties;
    this.includedProperties = optional.includedProperties;
    this.diversity = optional.diversity;
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

    if(this.filter !== undefined)
      params.filter = this.filter;

    if(this.booster !== undefined)
      params.booster = this.booster;

    if(this.cascadeCreate !== undefined)
      params.cascadeCreate = this.cascadeCreate;

    if(this.scenario !== undefined)
      params.scenario = this.scenario;

    if(this.logic !== undefined)
      params.logic = this.logic;

    if(this.returnProperties !== undefined)
      params.returnProperties = this.returnProperties;

    if(this.includedProperties !== undefined)
      params.includedProperties = this.includedProperties;

    if(this.diversity !== undefined)
      params.diversity = this.diversity;

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

exports.RecommendUsersToItem = RecommendUsersToItem
