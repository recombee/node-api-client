/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListItemProperties', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.ListItemProperties()
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[0].json.length, 2);
      done();
    });
  });
});
