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
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        req = new rqs.AddItemProperty('str','string');
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
    req = new rqs.AddItemProperty('prop','integer');
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
    req = new rqs.AddItemProperty('number2','int');
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
  
  it ('does not fail with valid property role and metadata', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('title','string',{'role': 'title'});
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('fails with duplicate property role or invalid metadata', (done) => {
    let req, req2, resp;
    req = new rqs.AddItemProperty('str4','string',{'role': 'summary'});
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        env.client.send(req,((err,res) => {
          if(err) {
            assert.equal(err.name, 'ResponseError');
            assert.equal(err.statusCode, 409);
            req = new rqs.AddItemProperty('str5','string',{'role': 'titl'});
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
          }
          else {
            assert.fail();
          }
        }));
      }
    }));
  });
});
