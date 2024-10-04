/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddRating', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.AddRating('u_id','i_id',1,{'cascadeCreate': true,'additionalData': {'answer': 42}}),
      new rqs.AddRating('entity_id','entity_id',0),
      new rqs.AddRating('entity_id','nonex_id',-1),
      new rqs.AddRating('nonex_id','entity_id',0.5),
      new rqs.AddRating('entity_id','entity_id',-2),
      new rqs.AddRating('u_id','i_id',0.3,{'cascadeCreate': true,'timestamp': 5}),
      new rqs.AddRating('u_id','i_id',0.3,{'cascadeCreate': true,'timestamp': 5})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[2].code, 404);
        chai.equal(responses[3].code, 404);
        chai.equal(responses[4].code, 400);
        chai.equal(responses[5].code, 200);
        chai.equal(responses[6].code, 409);
      done();
    });
  });
});
