/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddSearchSynonym', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.AddSearchSynonym('sci-fi','science fiction',{'oneWay': true}),
      new rqs.AddSearchSynonym('sci-fi','science fiction',{'oneWay': true})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 201);
        chai.deepEqual('sci-fi', responses[0].json['term']);
        chai.deepEqual('science fiction', responses[0].json['synonym']);
        chai.equal(responses[1].code, 409);
      done();
    });
  });
});
