/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendItemsToUser', function(){
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
      new rqs.RecommendItemsToUser('entity_id',9),
      new rqs.RecommendItemsToUser('nonexisting',9,{'cascadeCreate': true}),
      new rqs.RecommendItemsToUser('nonexisting2',9,{'cascadeCreate': true,'expertSettings': {}}),
      new rqs.RecommendItemsToUser('nonexisting2',9,{'cascadeCreate': true,'reqlExpressions': {'boolean': 'true','number': 'if (\'answer\' > 0) then 1 else 2','string': '"test"'}})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[1].code, 200);
        assert.equal(responses[2].code, 200);
        assert.equal(responses[3].code, 200);
      done();
    });
  });
});
