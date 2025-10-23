/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RemoveFromSeries', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('does not fail when removing item that is contained in the set', (done) => {
    let req, req2, resp;
    req = new rqs.RemoveFromSeries('entity_id','item','entity_id');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('fails when removing item that is not contained in the set', (done) => {
    let req, req2, resp;
    req = new rqs.RemoveFromSeries('entity_id','item','not_contained');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.equal(err.name, 'ResponseError');
        assert.equal(err.statusCode, 404);
        done();
      }
      else {
        assert.fail();
      }
    }));
  });
});
