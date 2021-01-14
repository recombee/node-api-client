/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RemoveFromSeries', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.RemoveFromSeries('entity_id','item','entity_id',0),
      new rqs.RemoveFromSeries('entity_id','item','entity_id',1),
      new rqs.RemoveFromSeries('entity_id','item','not_contained',1)
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 404);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[2].code, 404);
      done();
    });
  });
});
