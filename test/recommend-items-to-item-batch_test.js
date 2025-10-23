/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendItemsToItem', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setRecommEntities)
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.RecommendItemsToItem('entity_id','entity_id',9),
      new rqs.RecommendItemsToItem('nonexisting','entity_id',9,{'cascadeCreate': true}),
      new rqs.RecommendItemsToItem('nonexisting2','entity_id',9,{'cascadeCreate': true,'expertSettings': {}})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[1].code, 200);
        assert.equal(responses[2].code, 200);
      done();
    });
  });
});
