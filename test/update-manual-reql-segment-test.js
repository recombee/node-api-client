/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('UpdateManualReqlSegment', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('updates manual ReQL segment', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreateManualReqlSegmentation('seg1','items',{'title': 'Test Segmentation','description': 'For test purposes'});
    env.client.send(req2)
    .then((res) => {
      req2 = new rqs.AddManualReqlSegment('seg1','first-segment','\'str_property\' != null',{'title': 'First Segment'});
      env.client.send(req2)
      .then((res) => {
        req = new rqs.UpdateManualReqlSegment('seg1','first-segment','\'str_property\' == null',{'title': 'Updated Segment'});
        env.client.send(req)
        .then((res) => {
          done();
        });
      });
    });
  });
});
