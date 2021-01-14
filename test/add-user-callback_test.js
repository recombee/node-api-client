/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
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
        chai.fail();
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
        chai.equal(err.name, 'ResponseError');
        chai.equal(err.statusCode, 400);
        done();
      }
      else {
        chai.fail();
      }
    }));
  });
  
  it ('really stores entity to the system', (done) => {
    let req, req2, resp;
    req = new rqs.AddUser('valid_id2');
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        env.client.send(req,((err,res) => {
          if(err) {
            chai.equal(err.name, 'ResponseError');
            chai.equal(err.statusCode, 409);
            done();
          }
          else {
            chai.fail();
          }
        }));
      }
    }));
  });
});
