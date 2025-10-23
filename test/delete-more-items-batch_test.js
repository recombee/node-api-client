/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteMoreItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.DeleteMoreItems('\'int_property\' == 42')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[0].json['itemIds'].length, 1);
        assert.deepEqual(1, responses[0].json['count']);
      done();
    });
  });
});
