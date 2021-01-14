/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('SearchItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setRecommEntities)
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.SearchItems('entity_id','hell',9),
      new rqs.SearchItems('entity_id','sdhskldf',9),
      new rqs.SearchItems('entity_id','hell',9,{'returnProperties': true})
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        chai.equal(responses[0].code, 200);
        chai.equal(responses[0].json['recomms'].length, 1);
        chai.equal(responses[1].code, 200);
        chai.equal(responses[1].json['recomms'].length, 0);
        chai.equal(responses[2].code, 200);
        chai.equal(responses[2].json['recomms'].length, 1);
      done();
    });
  });
});
