/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddSeries', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.AddSeries('valid_id'),
      new rqs.AddSeries('***not_valid$$$'),
      new rqs.AddSeries('valid_id2'),
      new rqs.AddSeries('valid_id2')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 201);
        chai.equal(responses[1].code, 400);
        chai.equal(responses[2].code, 201);
        chai.equal(responses[3].code, 409);
      done();
    });
  });
});
