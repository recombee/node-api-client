/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteItem', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.DeleteItem('entity_id'),
      new rqs.DeleteItem('entity_id'),
      new rqs.DeleteItem('***not_valid$$$'),
      new rqs.DeleteItem('valid_id')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[1].code, 404);
        assert.equal(responses[2].code, 400);
        assert.equal(responses[3].code, 404);
      done();
    });
  });
});
