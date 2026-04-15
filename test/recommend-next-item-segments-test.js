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
  
  it ('rejects request with invalid recommId', (done) => {
    let req, req2, resp;
    req2 = new rqs.RecommendNextItemSegments('invalid_recomm_id',5);
    env.client.send(req2)
    .then((res) => {
      assert.fail();
      done();
    })
    .catch((err) => {
      if (err instanceof recombee.errors.ResponseError) {
        assert.equal(err.statusCode, 400);
        done();
      }
      throw err;
    });
  });
  
  it ('rejects request to recommId which does not return item-segments', (done) => {
    let req, req2, resp;
    req2 = new rqs.RecommendItemsToUser('entity_id',3);
    env.client.send(req2)
    .then((res) => {
      req = new rqs.RecommendNextItemSegments(res['recommId'],5);
      env.client.send(req)
      .then((res) => {
        assert.fail();
        done();
      })
      .catch((err) => {
        if (err instanceof recombee.errors.ResponseError) {
          assert.equal(err.statusCode, 400);
          done();
        }
        throw err;
      });
    });
  });
});
