/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('GetSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('gets existing segmentation', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property');
    env.client.send(req2)
    .then((res) => {
      req = new rqs.GetSegmentation('seg1');
      env.client.send(req)
      .then((res) => {
        chai.deepEqual('seg1', res['segmentationId']);
        done();
      });
    });
  });
});
