/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('ListSeriesItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('lists set items', (done) => {
    let req, req2, resp;
    req = new rqs.ListSeriesItems('entity_id');
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        chai.equal(res.length, 1);
        chai.deepEqual('entity_id', res[0]['itemId']);
        chai.deepEqual('item', res[0]['itemType']);
        done();
      }
    }));
  });
});
