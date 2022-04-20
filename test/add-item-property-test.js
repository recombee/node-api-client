/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
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
  
  it ('really stores property to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('number2','int');
    env.client.send(req)
    .then((res) => {
      env.client.send(req)
      .then((res) => {
        chai.fail();
        done();
      })
      .catch((err) => {
        if (err instanceof recombee.errors.ResponseError) {
          chai.equal(err.statusCode, 409);
          done();
        }
        throw err;
      });
    });
  });
});
