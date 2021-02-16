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
  
  it ('lists search synonyms', (done) => {
    let req, req2, resp;
    req2 = new rqs.AddSearchSynonym('sci-fi','science fiction');
    env.client.send(req2)
    .then((res) => {
      req = new rqs.ListSearchSynonyms();
      env.client.send(req)
      .then((res) => {
        chai.equal(res['synonyms'].length, 1);
        req = new rqs.ListSearchSynonyms({'count': 10,'offset': 1});
        env.client.send(req)
        .then((res) => {
          chai.equal(res['synonyms'].length, 0);
          done();
        });
      });
    });
  });
});
