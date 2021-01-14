/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SetUserValues', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.SetUserValues('entity_id',{'int_property': 5}),
      new rqs.SetUserValues('entity_id',{'str_property': 'šřžذ的‎'}),
      new rqs.SetUserValues('entity_id',{'int_property': 5,'str_property': 'test'}),
      new rqs.SetUserValues('new_entity',{'int_property': 5,'str_property': 'test','!cascadeCreate': true}),
      new rqs.SetUserValues('new_entity2',{'int_property': 5,'str_property': 'test'},{'cascadeCreate': true}),
      new rqs.SetUserValues('nonexisting',{'int_property': 5})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[2].code, 200);
        chai.equal(responses[3].code, 200);
        chai.equal(responses[4].code, 200);
        chai.equal(responses[5].code, 404);
      done();
    });
  });
});
