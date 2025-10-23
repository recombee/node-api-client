/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddUserProperty', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with valid name and type', (done) => {
    let req, req2, resp;
    req = new rqs.AddUserProperty('number','int');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        req = new rqs.AddUserProperty('str','string');
        env.client.send(req,((err,res) => {
          if(err) {
            assert.fail();
          }
          else {
            done();
          }
        }));
      }
    }));
  });
  
  it ('fails with invalid type', (done) => {
    let req, req2, resp;
    req = new rqs.AddUserProperty('prop','integer');
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
  
  it ('really stores property to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddUserProperty('number2','int');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        env.client.send(req,((err,res) => {
          if(err) {
            assert.equal(err.name, 'ResponseError');
            assert.equal(err.statusCode, 409);
            done();
          }
          else {
            assert.fail();
          }
        }));
      }
    }));
  });
});
