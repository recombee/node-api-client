/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeletePurchase', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setInteractions)
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.DeletePurchase('user','item',{'timestamp': 0}),
      new rqs.DeletePurchase('user','item')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[1].code, 404);
      done();
    });
  });
});
