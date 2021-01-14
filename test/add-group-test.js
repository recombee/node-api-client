/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddGroup', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('does not fail with valid entity id', (done) => {
    let req, req2, resp;
    req = new rqs.AddGroup('valid_id');
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('fails with invalid entity id', (done) => {
    let req, req2, resp;
    req = new rqs.AddGroup('***not_valid$$$');
    env.client.send(req)
    .then((res) => {
      chai.fail();
      done();
    })
    .catch(recombee.errors.ResponseError,(err) => {
      chai.equal(err.statusCode, 400);
      done();
    });
  });
  
  it ('really stores entity to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddGroup('valid_id2');
    env.client.send(req)
    .then((res) => {
      env.client.send(req)
      .then((res) => {
        chai.fail();
        done();
      })
      .catch(recombee.errors.ResponseError,(err) => {
        chai.equal(err.statusCode, 409);
        done();
      });
    });
  });
});
