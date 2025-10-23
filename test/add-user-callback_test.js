/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddUser', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with valid entity id', (done) => {
    let req, req2, resp;
    req = new rqs.AddUser('valid_id');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('fails with invalid entity id', (done) => {
    let req, req2, resp;
    req = new rqs.AddUser('***not_valid$$$');
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
  
  it ('really stores entity to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddUser('valid_id2');
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
