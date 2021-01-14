/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddUserProperty', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.AddUserProperty('number','int'),
      new rqs.AddUserProperty('str','string'),
      new rqs.AddUserProperty('prop','integer'),
      new rqs.AddUserProperty('number2','int'),
      new rqs.AddUserProperty('number2','int')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 201);
        chai.equal(responses[1].code, 201);
        chai.equal(responses[2].code, 400);
        chai.equal(responses[3].code, 201);
        chai.equal(responses[4].code, 409);
      done();
    });
  });
});
