/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SetViewPortion', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with cascadeCreate', (done) => {
    let req, req2, resp;
    req = new rqs.SetViewPortion('u_id','i_id',1,{'cascadeCreate': true,'additionalData': {'answer': 42}});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('does not fail with existing item and user', (done) => {
    let req, req2, resp;
    req = new rqs.SetViewPortion('entity_id','entity_id',0);
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('fails with nonexisting item id', (done) => {
    let req, req2, resp;
    req = new rqs.SetViewPortion('entity_id','nonex_id',1);
    env.client.send(req,((err,res) => {
      if(err) {
        chai.equal(err.name, 'ResponseError');
        chai.equal(err.statusCode, 404);
        done();
      }
      else {
        chai.fail();
      }
    }));
  });
  
  it ('fails with nonexisting user id', (done) => {
    let req, req2, resp;
    req = new rqs.SetViewPortion('nonex_id','entity_id',0.5);
    env.client.send(req,((err,res) => {
      if(err) {
        chai.equal(err.name, 'ResponseError');
        chai.equal(err.statusCode, 404);
        done();
      }
      else {
        chai.fail();
      }
    }));
  });
  
  it ('fails with invalid portion', (done) => {
    let req, req2, resp;
    req = new rqs.SetViewPortion('entity_id','entity_id',-2);
    env.client.send(req,((err,res) => {
      if(err) {
        chai.equal(err.name, 'ResponseError');
        chai.equal(err.statusCode, 400);
        done();
      }
      else {
        chai.fail();
      }
    }));
  });
  
  it ('fails with invalid sessionId', (done) => {
    let req, req2, resp;
    req = new rqs.SetViewPortion('entity_id','entity_id',0.7,{'sessionId': 'a****'});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.equal(err.name, 'ResponseError');
        chai.equal(err.statusCode, 400);
        done();
      }
      else {
        chai.fail();
      }
    }));
  });
});
