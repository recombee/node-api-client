/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('UserBasedRecommendation', function(){
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
      new rqs.UserBasedRecommendation('entity_id',9),
      new rqs.UserBasedRecommendation('nonexisting',9,{'cascadeCreate': true}),
      new rqs.UserBasedRecommendation('nonexisting2',9,{'cascadeCreate': true,'expertSettings': {}})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.equal(responses[0].json.length, 9);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[1].json.length, 9);
        chai.equal(responses[2].code, 200);
        chai.equal(responses[2].json.length, 9);
      done();
    });
  });
});
