/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('InsertToGroup', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.AddItem('new_item'),
      new rqs.InsertToGroup('entity_id','item','new_item'),
      new rqs.InsertToGroup('new_set','item','new_item2',{'cascadeCreate': true}),
      new rqs.AddItem('new_item3'),
      new rqs.InsertToGroup('entity_id','item','new_item3'),
      new rqs.InsertToGroup('entity_id','item','new_item3')
    ];

    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
      chai.equal(responses[0].code, 201);
      chai.equal(responses[1].code, 200);
      chai.equal(responses[2].code, 200);
      chai.equal(responses[3].code, 201);
      chai.equal(responses[4].code, 200);
      chai.equal(responses[5].code, 409);
      done();
    });
  });
});