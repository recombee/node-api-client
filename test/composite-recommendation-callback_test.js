/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('CompositeRecommendation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('rejects request to scenario which is not set up', (done) => {
    let req, req2, resp;
    req = new rqs.CompositeRecommendation('scenario_id',5,{'cascadeCreate': true});
    env.client.send(req,((err,res) => {
      if(err) {
        assert.equal(err.name, 'ResponseError');
        assert.equal(err.statusCode, 400);
        done();
      }
      else {
        assert.fail();
      }
    }));
  });
});
