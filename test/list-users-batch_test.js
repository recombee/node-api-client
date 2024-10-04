/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListUsers', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.ListUsers(),
      new rqs.ListUsers({'returnProperties': true})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.deepEqual(['entity_id'], responses[0].json);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[1].json.length, 1);
      done();
    });
  });
});
