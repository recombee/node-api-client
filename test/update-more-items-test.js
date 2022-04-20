/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('UpdateMoreItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('updates more items', (done) => {
    let req, req2, resp;
    req = new rqs.UpdateMoreItems('\'int_property\' == 42',{'int_property': 77});
    env.client.send(req)
    .then((res) => {
      chai.equal(res['itemIds'].length, 1);
      chai.deepEqual(1, res['count']);
      done();
    });
  });
});
