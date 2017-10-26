/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendItemsToItem', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setRecommEntities)
    .then(()=> {
      done();
     });
  });
  
  it ('recommends', (done) => {
    let req, req2, resp;
    req = new rqs.RecommendItemsToItem('entity_id','entity_id',9);
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('recommends to previously nonexisting entity with cascadeCreate', (done) => {
    let req, req2, resp;
    req = new rqs.RecommendItemsToItem('nonexisting','entity_id',9,{'cascadeCreate': true});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('recommends with expert settings', (done) => {
    let req, req2, resp;
    req = new rqs.RecommendItemsToItem('nonexisting2','entity_id',9,{'cascadeCreate': true,'expertSettings': {}});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
});
