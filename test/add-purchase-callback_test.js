/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddPurchase', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with cascadeCreate', (done) => {
    let req, req2, resp;
    req = new rqs.AddPurchase('u_id','i_id',{'cascadeCreate': true,'additionalData': {'answer': 42}});
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('does not fail with existing item and user', (done) => {
    let req, req2, resp;
    req = new rqs.AddPurchase('entity_id','entity_id');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('does not fail with valid timestamp', (done) => {
    let req, req2, resp;
    req = new rqs.AddPurchase('entity_id','entity_id',{'timestamp': '2013-10-29T09:38:41.341Z'});
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('fails with nonexisting item id', (done) => {
    let req, req2, resp;
    req = new rqs.AddPurchase('entity_id','nonex_id');
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
  
  it ('fails with nonexisting user id', (done) => {
    let req, req2, resp;
    req = new rqs.AddPurchase('nonex_id','entity_id');
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
  
  it ('really stores interaction to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddPurchase('u_id2','i_id2',{'cascadeCreate': true,'timestamp': 5});
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
