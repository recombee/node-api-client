/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('MergeUsers', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    env.client.send(new rqs.AddUser('target'),((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        let requests = [
          new rqs.MergeUsers('target','entity_id'),
          new rqs.MergeUsers('nonex_id','entity_id')
          ];
        
        env.client.send(new rqs.Batch(requests))
        .then((responses) => {
            chai.equal(responses[0].code, 200);
            chai.equal(responses[1].code, 404);
          done();
        });
      }
    }));
  });
});
