/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('UpdateManualReqlSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('updates manual ReQL segmentation', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreateManualReqlSegmentation('seg1','items',{'title': 'Test Segmentation','description': 'For test purposes'});
    env.client.send(req2,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.UpdateManualReqlSegmentation('seg1',{'title': 'New title','description': 'Updated'});
        env.client.send(req,((err,res) => {
          if(err) {
            chai.fail();
          }
          else {
            done();
          }
        }));
      }
    }));
  });
});
