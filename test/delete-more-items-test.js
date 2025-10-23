/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteMoreItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('deletes more items', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteMoreItems('\'int_property\' == 42');
    env.client.send(req)
    .then((res) => {
      assert.equal(res['itemIds'].length, 1);
      assert.deepEqual(1, res['count']);
      done();
    });
  });
});
