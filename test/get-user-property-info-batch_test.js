/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('GetUserPropertyInfo', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.GetUserPropertyInfo('int_property'),
      new rqs.GetUserPropertyInfo('str_property')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.deepEqual('int', responses[0].json['type']);
        chai.equal(responses[1].code, 200);
        chai.deepEqual('string', responses[1].json['type']);
      done();
    });
  });
});
