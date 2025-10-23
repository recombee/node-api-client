/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendUsersToItem', function(){
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
    req = new rqs.RecommendUsersToItem('entity_id',9);
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('recommends to previously nonexisting entity with cascadeCreate', (done) => {
    let req, req2, resp;
    req = new rqs.RecommendUsersToItem('nonexisting',9,{'cascadeCreate': true});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('recommends with expert settings', (done) => {
    let req, req2, resp;
    req = new rqs.RecommendUsersToItem('nonexisting2',9,{'cascadeCreate': true,'expertSettings': {}});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
  
  it ('recommends with reql expressions', (done) => {
    let req, req2, resp;
    req = new rqs.RecommendUsersToItem('nonexisting2',9,{'cascadeCreate': true,'reqlExpressions': {'boolean': 'true','number': 'if (\'answer\' > 0) then 1 else 2','string': '"test"'}});
    env.client.send(req)
    .then((res) => {
      done();
    });
  });
});
