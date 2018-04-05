/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Recommends set of items that are somehow related to one given item, *X*. Typical scenario for using item-based recommendation is when user *A* is viewing *X*. Then you may display items to the user that he might be also interested in. Item-recommendation request gives you Top-N such items, optionally taking the target user *A* into account.
 *  It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
 * @deprecated Deprecated since version 2.0.0. Use RecommendItemsToItem request instead.
 */
class ItemBasedRecommendation extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item for which the recommendations are to be generated.
   * @param {number} count - Number of items to be recommended (N for the top-N recommendation).
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *targetUserId*
   *         - Type: string
   *         - Description: ID of the user who will see the recommendations.
   * Specifying the *targetUserId* is beneficial because:
   * * It makes the recommendations personalized
   * * Allows the calculation of Actions and Conversions in the graphical user interface,
   *   as Recombee can pair the user who got recommendations and who afterwards viewed/purchased an item.
   * For the above reasons, we encourage you to set the *targetUserId* even for anonymous/unregistered users (i.e. use their session ID).
   *     - *userImpact*
   *         - Type: number
   *         - Description: If *targetUserId* parameter is present, the recommendations are biased towards the user given. Using *userImpact*, you may control this bias. For an extreme case of `userImpact=0.0`, the interactions made by the user are not taken into account at all (with the exception of history-based blacklisting), for `userImpact=1.0`, you'll get user-based recommendation. The default value is `0`.
   *     - *filter*
   *         - Type: string
   *         - Description: Boolean-returning [ReQL](https://docs.recombee.com/reql.html) expression which allows you to filter recommended items based on the values of their attributes.
   *     - *booster*
   *         - Type: string
   *         - Description: Number-returning [ReQL](https://docs.recombee.com/reql.html) expression which allows you to boost recommendation rate of some items based on the values of their attributes.
   *     - *allowNonexistent*
   *         - Type: boolean
   *         - Description: Instead of causing HTTP 404 error, returns some (non-personalized) recommendations if either item of given *itemId* or user of given *targetUserId* does not exist in the database. It creates neither of the missing entities in the database.
   *     - *cascadeCreate*
   *         - Type: boolean
   *         - Description: If item of given *itemId* or user of given *targetUserId* doesn't exist in the database, it creates the missing enity/entities and returns some (non-personalized) recommendations. This allows for example rotations in the following recommendations for the user of given *targetUserId*, as the user will be already known to the system.
   *     - *scenario*
   *         - Type: string
   *         - Description: Scenario defines a particular application of recommendations. It can be for example "homepage", "cart" or "emailing". You can see each scenario in the UI separately, so you can check how well each application performs. The AI which optimizes models in order to get the best results may optimize different scenarios separately, or even use different models in each of the scenarios.
   *     - *returnProperties*
   *         - Type: boolean
   *         - Description: With `returnProperties=true`, property values of the recommended items are returned along with their IDs in a JSON dictionary. The acquired property values can be used for easy displaying of the recommended items to the user. 
   * Example response:
   * ```
   *   [
   *     {
   *       "itemId": "tv-178",
   *       "description": "4K TV with 3D feature",
   *       "categories":   ["Electronics", "Televisions"],
   *       "price": 342,
   *       "url": "myshop.com/tv-178"
   *     },
   *     {
   *       "itemId": "mixer-42",
   *       "description": "Stainless Steel Mixer",
   *       "categories":   ["Home & Kitchen"],
   *       "price": 39,
   *       "url": "myshop.com/mixer-42"
   *     }
   *   ]
   * ```
   *     - *includedProperties*
   *         - Type: string[]
   *         - Description: Allows to specify, which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. 
   * Example response for `includedProperties=description,price`:
   * ```
   *   [
   *     {
   *       "itemId": "tv-178",
   *       "description": "4K TV with 3D feature",
   *       "price": 342
   *     },
   *     {
   *       "itemId": "mixer-42",
   *       "description": "Stainless Steel Mixer",
   *       "price": 39
   *     }
   *   ]
   * ```
   *     - *diversity*
   *         - Type: number
   *         - Description: **Expert option** Real number from [0.0, 1.0] which determines how much mutually dissimilar should the recommended items be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification.
   *     - *minRelevance*
   *         - Type: string
   *         - Description: **Expert option** If the *targetUserId* is provided:  Specifies the threshold of how much relevant must the recommended items be to the user. Possible values one of: "low", "medium", "high". The default value is "low", meaning that the system attempts to recommend number of items equal to *count* at any cost. If there are not enough data (such as interactions or item properties), this may even lead to bestseller-based recommendations to be appended to reach the full *count*. This behavior may be suppressed by using "medium" or "high" values. In such case, the system only recommends items of at least the requested qualit, and may return less than *count* items when there is not enough data to fulfill it.
   *     - *rotationRate*
   *         - Type: number
   *         - Description: **Expert option** If the *targetUserId* is provided: If your users browse the system in real-time, it may easily happen that you wish to offer them recommendations multiple times. Here comes the question: how much should the recommendations change? Should they remain the same, or should they rotate? Recombee API allows you to control this per-request in backward fashion. You may penalize an item for being recommended in the near past. For the specific user, `rotationRate=1` means maximal rotation, `rotationRate=0` means absolutely no rotation. You may also use, for example `rotationRate=0.2` for only slight rotation of recommended items. Default: `0.01`.
   *     - *rotationTime*
   *         - Type: number
   *         - Description: **Expert option** If the *targetUserId* is provided: Taking *rotationRate* into account, specifies how long time it takes to an item to recover from the penalization. For example, `rotationTime=7200.0` means that items recommended less than 2 hours ago are penalized. Default: `7200.0`.
   *     - *expertSettings*
   *         - Type: 
   *         - Description: Dictionary of custom options.
   */
  constructor(itemId, count, optional) {
    super('POST', `/items/${itemId}/recomms/`, 3000, false);
    this.itemId = itemId;
    this.count = count;
    optional = optional || {};
    this.targetUserId = optional.targetUserId;
    this.userImpact = optional.userImpact;
    this.filter = optional.filter;
    this.booster = optional.booster;
    this.allowNonexistent = optional.allowNonexistent;
    this.cascadeCreate = optional.cascadeCreate;
    this.scenario = optional.scenario;
    this.returnProperties = optional.returnProperties;
    this.includedProperties = optional.includedProperties;
    this.diversity = optional.diversity;
    this.minRelevance = optional.minRelevance;
    this.rotationRate = optional.rotationRate;
    this.rotationTime = optional.rotationTime;
    this.expertSettings = optional.expertSettings;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};
    params.count = this.count;

    if(this.targetUserId !== undefined)
      params.targetUserId = this.targetUserId;

    if(this.userImpact !== undefined)
      params.userImpact = this.userImpact;

    if(this.filter !== undefined)
      params.filter = this.filter;

    if(this.booster !== undefined)
      params.booster = this.booster;

    if(this.allowNonexistent !== undefined)
      params.allowNonexistent = this.allowNonexistent;

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

exports.ItemBasedRecommendation = ItemBasedRecommendation
