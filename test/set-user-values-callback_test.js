/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SetUserValues', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with existing entity and property', (done) => {
    let req, req2, resp;
    req = new rqs.SetUserValues('entity_id',{'int_property': 5});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('does not fail with non-ASCII string', (done) => {
    let req, req2, resp;
    req = new rqs.SetUserValues('entity_id',{'str_property': 'šřžذ的‎'});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('sets multiple properties', (done) => {
    let req, req2, resp;
    req = new rqs.SetUserValues('entity_id',{'int_property': 5,'str_property': 'test'});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('does not fail with !cascadeCreate', (done) => {
    let req, req2, resp;
    req = new rqs.SetUserValues('new_entity',{'int_property': 5,'str_property': 'test','!cascadeCreate': true});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('does not fail with cascadeCreate optional parameter', (done) => {
    let req, req2, resp;
    req = new rqs.SetUserValues('new_entity2',{'int_property': 5,'str_property': 'test'},{'cascadeCreate': true});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('fails with nonexisting entity', (done) => {
    let req, req2, resp;
    req = new rqs.SetUserValues('nonexisting',{'int_property': 5});
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
