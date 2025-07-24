/*
 This file is auto-generated, do not edit
*/

'use strict';
const rqs = require("./request");

/**
 * Deletes an item of the given `itemId` from the catalog.
 * If there are any *purchases*, *ratings*, *bookmarks*, *cart additions*, or *detail views* of the item present in the database, they will be deleted in cascade as well. Also, if the item is present in some *series*, it will be removed from all the *series* where present.
 * If an item becomes obsolete/no longer available, it is meaningful to keep it in the catalog (along with all the interaction data, which are very useful), and **only exclude the item from recommendations**. In such a case, use [ReQL filter](https://docs.recombee.com/reql) instead of deleting the item completely.
 */
class DeleteItem extends rqs.Request {

  /**
   * Construct the request
   * @param {string} itemId - ID of the item to be deleted.
   */
  constructor(itemId) {
    super('DELETE', `/items/${itemId}`, 3000, false);
    this.itemId = itemId;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let params = {};

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

exports.DeleteItem = DeleteItem
