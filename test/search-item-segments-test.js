/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SearchItemSegments', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('rejects request to scenario which is not set up', (done) => {
    let req, req2, resp;
    req = new rqs.SearchItemSegments('entity_id','query',5,{'scenario': 'scenario1','cascadeCreate': true});
    env.client.send(req)
    .then((res) => {
      chai.fail();
      done();
    })
    .catch((err) => {
      if (err instanceof recombee.errors.ResponseError) {
        chai.equal(err.statusCode, 400);
        done();
      }
      throw err;
    });
  });
});
