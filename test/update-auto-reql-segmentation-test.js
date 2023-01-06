/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('UpdateAutoReqlSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('updates auto ReQL segmentation', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreateAutoReqlSegmentation('seg1','items','{\'str_property\'}',{'title': 'Test Segmentation','description': 'For test purposes'});
    env.client.send(req2)
    .then((res) => {
      req = new rqs.UpdateAutoReqlSegmentation('seg1',{'title': 'New title','expression': '{\'str_property\' + \'str_property\'}','description': 'Updated'});
      env.client.send(req)
      .then((res) => {
        done();
      });
    });
  });
});
