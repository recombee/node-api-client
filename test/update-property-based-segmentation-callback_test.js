/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('UpdatePropertyBasedSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('updates property based segmentation', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property');
    env.client.send(req2,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.UpdatePropertyBasedSegmentation('seg1',{'title': 'New title','propertyName': 'str_property','description': 'Updated'});
        env.client.send(req,((err,res) => {
          if(err) {
            chai.fail();
          }
          else {
            done();
          }
        }));
      }
    }));
  });
});
