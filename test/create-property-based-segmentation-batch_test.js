/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('CreatePropertyBasedSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property',{'title': 'Test Segmentation','description': 'For test purposes'}),
      new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property',{'title': 'Test Segmentation','description': 'For test purposes'})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 201);
        chai.equal(responses[1].code, 409);
      done();
    });
  });
});
