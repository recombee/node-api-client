/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListSeriesItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('lists set items', (done) => {
    let req, req2, resp;
    req = new rqs.ListSeriesItems('entity_id');
    env.client.send(req)
    .then((res) => {
      assert.equal(res.length, 1);
      assert.deepEqual('entity_id', res[0]['itemId']);
      assert.deepEqual('item', res[0]['itemType']);
      done();
    });
  });
});
