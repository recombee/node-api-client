/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendNextItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setRecommEntities)
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    env.client.send(new rqs.RecommendItemsToUser('entity_id',3,{'returnProperties': true}),((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        let requests = [
          new rqs.RecommendNextItems(res['recommId'],3),
          new rqs.RecommendNextItems(res['recommId'],3)
          ];
        
        env.client.send(new rqs.Batch(requests))
        .then((responses) => {
            chai.equal(responses[0].code, 200);
            chai.equal(responses[0].json['recomms'].length, 3);
            chai.equal(responses[1].code, 200);
            chai.equal(responses[1].json['recomms'].length, 3);
          done();
        });
      }
    }));
  });
});
