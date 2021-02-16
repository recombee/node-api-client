'use strict';

const jsSHA = require("jssha");
const rp = require('request-promise');
const rp_errors = require('request-promise/errors');

const api_errors = require('./errors');
const requests = require('./requests');

const BATCH_MAX_SIZE = 10000;
/**
  * Client for sending requests to Recombee and getting replies
  */
class ApiClient {

  /**
   * Construct the client
   * @param {string} databaseId - ID of your database
   * @param {string} secretToken - Corresponding secret token
   * @param {boolean} alwaysUseHttps - If true, all requests are sent using HTTPS (default: true)
   * @param {Object} options - Other custom options
   */
  constructor (databaseId, token, alwaysUseHttps, options) {
      this.databaseId = databaseId;
      this.token = token;
      this.alwaysUseHttps = (alwaysUseHttps === undefined) ? true : alwaysUseHttps;
      this.options = options || {};
      this.baseUri = process.env.RAPI_URI || this.options.baseUri || 'rapi.recombee.com';
  }

  /**
   * Send the request to Recombee
   * @param {Request} request - Request to be sent
   * @param {Object} callback - Optional callback (send returns Promise if omitted) 
   */
  send(request, callback) {

    if (request instanceof requests.Batch && request.requests.length > BATCH_MAX_SIZE)
      return this._send_multipart_batch(request);

    let url = this._buildRequestUrl(request);
    let options = {
        method: request.method,
        uri: url,
        headers: {'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'User-Agent': 'recombee-node-api-client/3.2.0'},
        timeout: request.timeout,
        resolveWithFullResponse: true,
        json: true
    };

    if (this.options.proxy)
      options.proxy = this.options.proxy;

    if (request.bodyParameters()) 
      options.body = request.bodyParameters();

    return rp(options)
           .then(this._parseResponse)
           .then((response)=> {
              return new Promise( (resolve) => {
                if (callback) { return callback(null, response); }
                return resolve(response);
              });
            })
            .catch(rp_errors.StatusCodeError,((error) => {
                throw new api_errors.ResponseError(request, error.statusCode, error.message);
              }
            ))
            .catch(rp_errors.RequestError,((error) => {
                if(error.cause.code === 'ETIMEDOUT' || error.cause.code === 'ESOCKETTIMEDOUT')
                  throw new api_errors.TimeoutError(request, error);
                throw error;
              }
            ))
            .catch((error) => {
              if (callback) {return callback(error)};
              throw error;
            });
  }

  _buildRequestUrl(request) {
    let protocol = (request.ensureHttps || this.alwaysUseHttps) ? 'https' : 'http';
    let reqUrl = request.path + this._encodeRequestQueryParams(request);
    let signedUrl = this._signUrl(reqUrl);
    return protocol + '://' + this.baseUri + signedUrl;
  }

  _encodeRequestQueryParams(request) {
    let res = ''
    let queryParams = request.queryParameters();
    let paramPairs = [];
    for (let d in queryParams)
      paramPairs.push(this._rfc3986EncodeURIComponent(d) + '=' + this._formatQueryParameterValue(queryParams[d]));
    res += paramPairs.join('&');
    if (res.length > 0) {
      res = '?' + res;
    }
    return res;
  }

  //https://stackoverflow.com/questions/18251399/why-doesnt-encodeuricomponent-encode-single-quotes-apostrophes
  _rfc3986EncodeURIComponent (str) {  
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
  }

  _formatQueryParameterValue(value) {
    if (value instanceof Array) {
      return value.map((v) => this._rfc3986EncodeURIComponent(v.toString())).join(',');
    }
    return this._rfc3986EncodeURIComponent(value.toString());
  }

  _split_requests(requests, chunk_size) {
    //http://stackoverflow.com/questions/8495687/split-array-into-chunks
    let result = [];
    let i,j;
    for (i=0,j=requests.length; i<j; i+=chunk_size) {
        result.push(requests.slice(i,i+chunk_size));
    }
    return result;
  }

  _concat_multipart_results(responses) {
    return new Promise(
      function (resolve, reject) {
        let result = [].concat.apply([], responses);
        resolve(result);
      }
    );
  }

  _send_batch_part_rec(requests, results) {
    if (requests.length == 0)
      return new Promise((resolve) => {resolve(results)});
    let request = requests.shift();
    return this.send(request)
    .then((result) => {
      results.push(result);
      return this._send_batch_part_rec(requests, results);
    });
  }

  _send_multipart_batch(batch, callback) {
    let chunks = this._split_requests(batch.requests, BATCH_MAX_SIZE);
    let rqs = chunks.map((rqs) => new requests.Batch(rqs));
    
    return this._send_batch_part_rec(rqs, [])
      .then(this._concat_multipart_results)
      .then((response)=> {

        return new Promise( (resolve) => {
          if (callback) { return callback(null, response); }
          return resolve(response);
        });
      })
      .catch((error) => {
        if (callback) {return callback(error)};
        throw error;
      });
  }

  _parseResponse(response) {
    return new Promise(
      function (resolve, reject) {
        resolve(response.body);
      }
    );
  }

  _signUrl (req_part) {
    let url = '/' + this.databaseId + req_part;
    url += (req_part.indexOf("?") == -1 ? "?" : "&" ) + "hmac_timestamp=" + parseInt(new Date().getTime() / 1000);
    
    let shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(this.token, "TEXT");
    shaObj.update(url);

    url += "&hmac_sign=" + shaObj.getHMAC("HEX");
    return url;
  }
}

exports.ApiClient = ApiClient
