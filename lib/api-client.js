'use strict';

const jsSHA = require("jssha");

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
   * @param {string} token - Corresponding secret token
   * @param {Object} [options] - Other custom options
   */
  constructor (databaseId, token, options) {
      this.databaseId = databaseId;
      this.token = token;
      this.options = options || {};

      if (Object.getPrototypeOf(this.options) !== Object.prototype) throw new Error(`options must be given as an Object (${this.options} given instead)`);

      this.protocol = this.options.protocol || 'https';
      this.baseUri = this._getBaseUri()
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
        headers: {'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'User-Agent': 'recombee-node-api-client/5.1.1'},
        timeout: request.timeout,
        agent: this.options.agent
    };

    if (Object.entries(request.bodyParameters()).length > 0)
      options.json = request.bodyParameters();

    return import('ky').then((ky) => {
        return ky.default(url, options)
           .json()
           .then((response)=> {
              return new Promise( (resolve) => {
                if (callback) { return callback(null, response); }
                return resolve(response);
              });
            })
            .catch(async (error) => {
              if (error instanceof ky.TimeoutError) {
                error = new api_errors.TimeoutError(request, error);
              } else if (error instanceof ky.HTTPError) {
                error = new api_errors.ResponseError(
                  request,
                  error.response.status,
                  await error.response.text()
                );
              }
              if (callback) {
                return callback(error);
              }
              throw error;
            });
    })
  }

  _getRegionalBaseUri(region) {
    const uri = {
      'ap-se': 'rapi-ap-se.recombee.com',
      'ca-east': 'rapi-ca-east.recombee.com',
      'eu-west': 'rapi-eu-west.recombee.com',
      'us-west': 'rapi-us-west.recombee.com'
    }[region.toLowerCase()];

    if (uri === undefined) {
      throw new Error(`Region "${region}" is unknown. You may need to update the version of the SDK.`)
    }

    return uri;
  }

  _getBaseUri() {
    let baseUri = process.env.RAPI_URI || this.options.baseUri;
    if (this.options.region) {
      if (baseUri) {
        throw new Error('baseUri and region cannot be specified at the same time');
      }
      baseUri = this._getRegionalBaseUri(this.options.region);
    }
    return baseUri || 'rapi.recombee.com';
  }

  _buildRequestUrl(request) {
    let usedProtocol = (request.ensureHttps) ? 'https' : this.protocol;
    let reqUrl = request.path + this._encodeRequestQueryParams(request);
    let signedUrl = this._signUrl(reqUrl);
    return usedProtocol + '://' + this.baseUri + signedUrl;
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
