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
  
  it ('deletes search synonym', (done) => {
    let req, req2, resp;
    req2 = new rqs.AddSearchSynonym('sci-fi','science fiction');
    env.client.send(req2)
    .then((res) => {
      req = new rqs.DeleteSearchSynonym(res['id']);
      env.client.send(req)
      .then((res) => {
        req = new rqs.DeleteSearchSynonym('a968271b-d666-4dfb-8a30-f459e564ba7b');
        env.client.send(req)
        .then((res) => {
          chai.fail();
          done();
        })
        .catch((err) => {
          if (err instanceof recombee.errors.ResponseError) {
            chai.equal(err.statusCode, 404);
            done();
          }
          throw err;
        });
      });
    });
  });
});
