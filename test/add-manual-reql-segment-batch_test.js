/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddManualReqlSegment', function(){
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
        assert.fail();
      }
      else {
        let requests = [
          new rqs.AddManualReqlSegment('seg1','first-segment','\'str_property\' != null',{'title': 'First Segment'})
          ];
        
        env.client.send(new rqs.Batch(requests))
        .then((responses) => {
            assert.equal(responses[0].code, 201);
          done();
        });
      }
    }));
  });
});
