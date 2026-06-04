/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddItemProperty', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with valid name and type', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('number','int');
    env.client.send(req)
    .then((res) => {
      req = new rqs.AddItemProperty('str','string');
      env.client.send(req)
      .then((res) => {
        done();
      });
    });
  });
  
  it ('fails with invalid type', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('prop','integer');
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
  
  it ('really stores property to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('number2','int');
    env.client.send(req)
    .then((res) => {
      env.client.send(req)
      .then((res) => {
        assert.fail();
        done();
      })
      .catch((err) => {
        if (err instanceof recombee.errors.ResponseError) {
          assert.equal(err.statusCode, 409);
          done();
        }
        throw err;
      });
    });
  });
  
  it ('does not fail with valid property role and metadata', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('title','string',{'role': 'title'});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('fails with duplicate property role or invalid metadata', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('str4','string',{'role': 'summary'});
    env.client.send(req)
    .then((res) => {
      env.client.send(req)
      .then((res) => {
        assert.fail();
        req = new rqs.AddItemProperty('str5','string',{'role': 'titl'});
      env.client.send(req)
      .then((res) => {
        assert.fail();
        done();
      })
      .catch((err) => {
        if (err instanceof recombee.errors.ResponseError) {
          assert.equal(err.statusCode, 404);
          done();
        }
        throw err;
      });
      })
      .catch((err) => {
        if (err instanceof recombee.errors.ResponseError) {
          assert.equal(err.statusCode, 409);
          done();
        }
        throw err;
      });
    });
  });
});
