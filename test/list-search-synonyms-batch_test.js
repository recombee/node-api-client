/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListSearchSynonyms', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  it ('works in batch', (done) => {
    env.client.send(new rqs.AddSearchSynonym('sci-fi','science fiction'),((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        let requests = [
          new rqs.ListSearchSynonyms(),
          new rqs.ListSearchSynonyms({'count': 10,'offset': 1})
          ];
        
        env.client.send(new rqs.Batch(requests))
        .then((responses) => {
            chai.equal(responses[0].code, 200);
            chai.equal(responses[0].json['synonyms'].length, 1);
            chai.equal(responses[1].code, 200);
            chai.equal(responses[1].json['synonyms'].length, 0);
          done();
        });
      }
    }));
  });
});
