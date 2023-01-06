/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('deletes segmentation', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property');
    env.client.send(req2)
    .then((res) => {
      req = new rqs.DeleteSegmentation('seg1');
      env.client.send(req)
      .then((res) => {
        req = new rqs.DeleteSegmentation('seg1');
        env.client.send(req)
        .then((res) => {
          chai.fail();
          done();
        })
        .catch((err) => {
          if (err instanceof recombee.errors.ResponseError) {
            chai.equal(err.statusCode, 404);
            done();
          }
          throw err;
        });
      });
    });
  });
});
