/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RemoveFromSeries', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('fails when removing item which have different time', (done) => {
    let req, req2, resp;
    req = new rqs.RemoveFromSeries('entity_id','item','entity_id',0);
    env.client.send(req)
    .then((res) => {
      chai.fail();
      done();
    })
    .catch(recombee.errors.ResponseError,(err) => {
      chai.equal(err.statusCode, 404);
      done();
    });
  });
  
  it ('does not fail when removing item that is contained in the set', (done) => {
    let req, req2, resp;
    req = new rqs.RemoveFromSeries('entity_id','item','entity_id',1);
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('fails when removing item that is not contained in the set', (done) => {
    let req, req2, resp;
    req = new rqs.RemoveFromSeries('entity_id','item','not_contained',1);
    env.client.send(req)
    .then((res) => {
      chai.fail();
      done();
    })
    .catch(recombee.errors.ResponseError,(err) => {
      chai.equal(err.statusCode, 404);
      done();
    });
  });
});
