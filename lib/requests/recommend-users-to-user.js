/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Get similar users as some given user, based on the user's past interactions (purchases, ratings, etc.) and values of properties.
 * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
 * The returned users are sorted by similarity (first user being the most similar).
 */
class RecommendUsersToUser extends rqs.Request {

  /**
   * Construct the request
   * @param {string} userId - User to which we find similar users
   * @param {number} count - Number of users to be recommended (N for the top-N recommendation).
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql.html) expression which allows you to filter recommended users based on the values of their attributes.
   *     - *booster*
   *         - Type: string
   *         - Description: Number-returning [ReQL](https://docs.recombee.com/reql.html) expression which allows you to boost recommendation rate of some users based on the values of their attributes.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows for example rotations in the following recommendations for that user, as the user will be already known to the system.
   *     - *scenario*
   *         - Type: string
   *         - Description: Scenario defines a particular application of recommendations. It can be for example "homepage", "cart" or "emailing". You can see each scenario in the UI separately, so you can check how well each application performs. The AI which optimizes models in order to get the best results may optimize different scenarios separately, or even use different models in each of the scenarios.
   *     - *returnProperties*
   *         - Type: boolean
   *         - Description: With `returnProperties=true`, property values of the recommended users are returned along with their IDs in a JSON dictionary. The acquired property values can be used for easy displaying the recommended users. 
   * Example response:
   * ```
   *   {
   *     "recommId": "9cb9c55d-50ba-4478-84fd-ab456136156e",
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
   *     }
   * ```
   *     - *includedProperties*
   *         - Type: string[]
   *         - Description: Allows to specify, which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. 
   * Example response for `includedProperties=country`:
   * ```
   *   {
   *     "recommId": "b326d82d-5d57-4b45-b362-c9d6f0895855",
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
   *         - Description: **Expert option** Real number from [0.0, 1.0] which determines how much mutually dissimilar should the recommended users be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification.
   *     - *minRelevance*
   *         - Type: string
   *         - Description: **Expert option** Specifies the threshold of how much relevant must the recommended users be. Possible values one of: "low", "medium", "high". The default value is "low", meaning that the system attempts to recommend number of users equal to *count* at any cost. If there are not enough data (such as interactions or user properties), this may even lead to bestseller-based recommendations to be appended to reach the full *count*. This behavior may be suppressed by using "medium" or "high" values. In such case, the system only recommends users of at least the requested relevancy, and may return less than *count* users when there is not enough data to fulfill it.
   *     - *rotationRate*
   *         - Type: number
   *         - Description: **Expert option** If your users browse the system in real-time, it may easily happen that you wish to offer them recommendations multiple times. Here comes the question: how much should the recommendations change? Should they remain the same, or should they rotate? Recombee API allows you to control this per-request in backward fashion. You may penalize an user for being recommended in the near past. For the specific user, `rotationRate=1` means maximal rotation, `rotationRate=0` means absolutely no rotation. You may also use, for example `rotationRate=0.2` for only slight rotation of recommended users.
   *     - *rotationTime*
   *         - Type: number
   *         - Description: **Expert option** Taking *rotationRate* into account, specifies how long time it takes to an user to recover from the penalization. For example, `rotationTime=7200.0` means that users recommended less than 2 hours ago are penalized.
   *     - *expertSettings*
   *         - Type: 
   *         - Description: Dictionary of custom options.
   *     - *returnAbGroup*
   *         - Type: boolean
   *         - Description: If there is a custom AB-testing running, return name of group to which the request belongs.
   */
  constructor(userId, count, optional) {
    super('POST', `/recomms/users/${userId}/users/`, 50000, false);
    this.userId = userId;
    this.count = count;
    optional = optional || {};
    this.filter = optional.filter;
    this.booster = optional.booster;
    this.cascadeCreate = optional.cascadeCreate;
    this.scenario = optional.scenario;
    this.returnProperties = optional.returnProperties;
    this.includedProperties = optional.includedProperties;
    this.diversity = optional.diversity;
    this.minRelevance = optional.minRelevance;
    this.rotationRate = optional.rotationRate;
    this.rotationTime = optional.rotationTime;
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

    if(this.returnProperties !== undefined)
      params.returnProperties = this.returnProperties;

    if(this.includedProperties !== undefined)
      params.includedProperties = this.includedProperties;

    if(this.diversity !== undefined)
      params.diversity = this.diversity;

    if(this.minRelevance !== undefined)
      params.minRelevance = this.minRelevance;

    if(this.rotationRate !== undefined)
      params.rotationRate = this.rotationRate;

    if(this.rotationTime !== undefined)
      params.rotationTime = this.rotationTime;

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

exports.RecommendUsersToUser = RecommendUsersToUser
