/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendNextItemSegments', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    env.client.send(new rqs.RecommendNextItemSegments('invalid_recomm_id',5),((err,errRes) => {
      if(err) {
        assert.equal(err.statusCode, 400);
        env.client.send(new rqs.RecommendItemsToUser('entity_id',3),((err,res) => {
          if(err) {
            assert.fail();
          }
          else {
            let requests = [
              new rqs.RecommendNextItemSegments(res['recommId'],5)
              ];
            
            env.client.send(new rqs.Batch(requests))
            .then((responses) => {
                assert.equal(responses[0].code, 400);
              done();
            });
          }
        }));
      }
      else {
        assert.fail();
      }
    }));
  });
});
