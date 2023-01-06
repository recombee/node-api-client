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
  it ('works in batch', (done) => {
    env.client.send(new rqs.CreateManualReqlSegmentation('seg1','items',{'title': 'Test Segmentation','description': 'For test purposes'}),((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        let requests = [
          new rqs.UpdateManualReqlSegmentation('seg1',{'title': 'New title','description': 'Updated'})
          ];
        
        env.client.send(new rqs.Batch(requests))
        .then((responses) => {
            chai.equal(responses[0].code, 200);
          done();
        });
      }
    }));
  });
});
