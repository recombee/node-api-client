/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteManualReqlSegment', function(){
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
        env.client.send(new rqs.AddManualReqlSegment('seg1','first-segment','\'str_property\' != null',{'title': 'First Segment'}),((err,res) => {
          if(err) {
            chai.fail();
          }
          else {
            let requests = [
              new rqs.DeleteManualReqlSegment('seg1','first-segment')
              ];
            
            env.client.send(new rqs.Batch(requests))
            .then((responses) => {
                chai.equal(responses[0].code, 200);
              done();
            });
          }
        }));
      }
    }));
  });
});
