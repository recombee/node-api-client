/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('MergeUsers', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with existing users', (done) => {
    let req, req2, resp;
    req2 = new rqs.AddUser('target');
    env.client.send(req2)
    .then((res) => {
      req = new rqs.MergeUsers('target','entity_id');
      env.client.send(req)
      .then((res) => {
        done();
      });
    });
  });
  
  it ('fails with nonexisting user', (done) => {
    let req, req2, resp;
    req = new rqs.MergeUsers('nonex_id','entity_id');
    env.client.send(req)
    .then((res) => {
      chai.fail();
      done();
    })
    .catch((err) => {
      if (err instanceof recombee.errors.ResponseError) {
        chai.equal(err.statusCode, 404);
        done();
      }
      throw err;
    });
  });
});
