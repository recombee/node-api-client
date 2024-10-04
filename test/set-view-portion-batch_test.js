/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SetViewPortion', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.SetViewPortion('u_id','i_id',1,{'cascadeCreate': true,'additionalData': {'answer': 42}}),
      new rqs.SetViewPortion('entity_id','entity_id',0),
      new rqs.SetViewPortion('entity_id','nonex_id',1),
      new rqs.SetViewPortion('nonex_id','entity_id',0.5),
      new rqs.SetViewPortion('entity_id','entity_id',-2),
      new rqs.SetViewPortion('entity_id','entity_id',0.7,{'sessionId': 'a****'})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[2].code, 404);
        chai.equal(responses[3].code, 404);
        chai.equal(responses[4].code, 400);
        chai.equal(responses[5].code, 400);
      done();
    });
  });
});
