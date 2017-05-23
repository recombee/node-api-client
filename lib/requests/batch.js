'use strict';
const rqs = require("./request");

var sum_timeouts = ((requests) => {
  return requests.map((r) => r.timeout).reduce((a, b) => a + b, 0);
});

/**
 * In many cases, it may be desirable to execute multiple requests at once. For example, when synchronizing the catalog of items in a periodical manner, you would have to execute a sequence of thousands of separate POST requests, which is very ineffective and may take a very long time to complete. Most notably, network latencies can make execution of such sequence very slow and even if executed in multiple parallel threads, there will still be unreasonable overhead caused by the HTTP(s). To avoid the mentioned problems, batch processing may be used, encapsulating a sequence of requests into a single HTTPS request.
 * Batch processing allows you to submit arbitrary sequence of requests and the batch may combine different types of requests arbitrarily as well.
 * Note that the status code of the batch request itself is 200 even if the individual requests result in error – you have to inspect the code values in the resulting array.
  */
class Batch extends rqs.Request {

  /**
   * Construct the request
   * @param {Request[]} requests - Array containing the requests.
   * @param {Object} optional - Optional parameters given as an object with structure name of the parameter: value
   * - Allowed parameters:
   *     - *distinctRecomms*
   *         - Type: boolean
   *         - Description: Makes all the recommended items for a certain user distinct among multiple recommendation requests in the batch.
   */
  constructor(requests, optional) {
    super('POST', '/batch/', sum_timeouts(requests), true);
    this.requests = requests;
    optional = optional || {};
    this.distinctRecomms = optional.distinctRecomms;
  }

  /**
   * Get body parameters
   * @return {Object} The values of body parameters (name of parameter: value of the parameter)
   */
  bodyParameters() {
    let reqs = this.requests.map((r) => this._request_to_batch_object(r));
    let result = {requests: reqs};

    if(this.distinctRecomms !== undefined)
      result.distinctRecomms = this.distinctRecomms;
    
    return result;
  }

  _request_to_batch_object(req) {
    let bo = {
      method: req.method,
      path: req.path
    };

    let params = req.queryParameters();
    let bodyParams = req.bodyParameters();
    for (var attrname in bodyParams) { params[attrname] = bodyParams[attrname]; }

    if(Object.keys(params).length > 0)
      bo.params = params;

    return bo;
  }

  /**
   * Get query parameters
   * @return {Object} The values of query parameters (name of parameter: value of the parameter)
   */
  queryParameters() {
    return {};
  }
}

exports.Batch = Batch
