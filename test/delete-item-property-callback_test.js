/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
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
        chai.fail();
      }
      else {
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
      }
    }));
  });
  
  it ('fails with invalid property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteItemProperty('***not_valid$$$');
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
  
  it ('fails with non-existing property', (done) => {
    let req, req2, resp;
    req = new rqs.DeleteItemProperty('not_existing');
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
});
