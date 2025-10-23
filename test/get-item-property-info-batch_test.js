/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('GetItemPropertyInfo', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.GetItemPropertyInfo('int_property'),
      new rqs.GetItemPropertyInfo('str_property')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.deepEqual('int', responses[0].json['type']);
        assert.equal(responses[1].code, 200);
        assert.deepEqual('string', responses[1].json['type']);
      done();
    });
  });
});
