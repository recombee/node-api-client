/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteSearchSynonym', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  it ('works in batch', (done) => {
    env.client.send(new rqs.AddSearchSynonym('sci-fi','science fiction'),((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        let requests = [
          new rqs.DeleteSearchSynonym(res['id']),
          new rqs.DeleteSearchSynonym('a968271b-d666-4dfb-8a30-f459e564ba7b')
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
