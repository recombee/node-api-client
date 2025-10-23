/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListItemDetailViews', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setInteractions)
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    let requests = [
      new rqs.ListItemDetailViews('item')
      ];
    
    env.client.send(new rqs.Batch(requests))
    .then((responses) => {
        assert.equal(responses[0].code, 200);
        assert.equal(responses[0].json.length, 1);
        assert.deepEqual('item', responses[0].json[0]['itemId']);
        assert.deepEqual('user', responses[0].json[0]['userId']);
      done();
    });
  });
});
