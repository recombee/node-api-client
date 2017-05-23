/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('GetItemValues', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('gets values', (done) => {
    let req, req2, resp;
    req = new rqs.GetItemValues('entity_id');
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        chai.deepEqual(42, res['int_property']);
        chai.deepEqual('hello', res['str_property']);
        done();
      }
    }));
  });
});
