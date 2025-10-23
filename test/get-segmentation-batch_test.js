/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
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
  it ('works in batch', (done) => {
    env.client.send(new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property'),((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        let requests = [
          new rqs.GetSegmentation('seg1')
          ];
        
        env.client.send(new rqs.Batch(requests))
        .then((responses) => {
            assert.equal(responses[0].code, 200);
            assert.deepEqual('seg1', responses[0].json['segmentationId']);
          done();
        });
      }
    }));
  });
});
