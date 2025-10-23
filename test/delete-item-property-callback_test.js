/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteItemProperty', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with existing property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteItemProperty('int_property');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
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
    }));
  });
  
  it ('fails with invalid property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteItemProperty('***not_valid$$$');
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
  
  it ('fails with non-existing property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteItemProperty('not_existing');
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
});
