/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SetItemValues', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with existing entity and property', (done) => {
    let req, req2, resp;
    req = new rqs.SetItemValues('entity_id',{'int_property': 5});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('does not fail with non-ASCII string', (done) => {
    let req, req2, resp;
    req = new rqs.SetItemValues('entity_id',{'str_property': 'šřžذ的‎'});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('sets multiple properties', (done) => {
    let req, req2, resp;
    req = new rqs.SetItemValues('entity_id',{'int_property': 5,'str_property': 'test'});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('does not fail with !cascadeCreate', (done) => {
    let req, req2, resp;
    req = new rqs.SetItemValues('new_entity',{'int_property': 5,'str_property': 'test','!cascadeCreate': true});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('does not fail with cascadeCreate optional parameter', (done) => {
    let req, req2, resp;
    req = new rqs.SetItemValues('new_entity2',{'int_property': 5,'str_property': 'test'},{'cascadeCreate': true});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('fails with nonexisting entity', (done) => {
    let req, req2, resp;
    req = new rqs.SetItemValues('nonexisting',{'int_property': 5});
    env.client.send(req)
    .then((res) => {
      chai.fail();
      done();
    })
    .catch((err) => {
      if (err instanceof recombee.errors.ResponseError) {
        chai.equal(err.statusCode, 404);
        done();
      }
      throw err;
    });
  });
});
