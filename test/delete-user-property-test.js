/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteUserProperty', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with existing property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteUserProperty('int_property');
    env.client.send(req)
    .then((res) => {
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
  
  it ('fails with invalid property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteUserProperty('***not_valid$$$');
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
  
  it ('fails with non-existing property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteUserProperty('not_existing');
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
