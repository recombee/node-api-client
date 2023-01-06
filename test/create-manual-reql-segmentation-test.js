/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('CreateManualReqlSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('creates manual ReQL segmentation', (done) => {
    let req, req2, resp;
    req = new rqs.CreateManualReqlSegmentation('seg1','items',{'title': 'Test Segmentation','description': 'For test purposes'});
    env.client.send(req)
    .then((res) => {
      req = new rqs.CreateManualReqlSegmentation('seg1','items',{'title': 'Test Segmentation','description': 'For test purposes'});
      env.client.send(req)
      .then((res) => {
        chai.fail();
        done();
      })
      .catch((err) => {
        if (err instanceof recombee.errors.ResponseError) {
          chai.equal(err.statusCode, 409);
          done();
        }
        throw err;
      });
    });
  });
});
