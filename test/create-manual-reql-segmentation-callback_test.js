/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
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
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        req = new rqs.CreateManualReqlSegmentation('seg1','items',{'title': 'Test Segmentation','description': 'For test purposes'});
        env.client.send(req,((err,res) => {
          if(err) {
            assert.equal(err.name, 'ResponseError');
            assert.equal(err.statusCode, 409);
            done();
          }
          else {
            assert.fail();
          }
        }));
      }
    }));
  });
});
