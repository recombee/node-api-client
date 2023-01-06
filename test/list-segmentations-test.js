/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListSegmentations', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('lists existing segmentations', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property');
    env.client.send(req2)
    .then((res) => {
      req = new rqs.ListSegmentations('items');
      env.client.send(req)
      .then((res) => {
        chai.equal(res['segmentations'].length, 1);
        done();
      });
    });
  });
});
