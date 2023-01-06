/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('CreatePropertyBasedSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('creates property based segmentation', (done) => {
    let req, req2, resp;
    req = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property',{'title': 'Test Segmentation','description': 'For test purposes'});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property',{'title': 'Test Segmentation','description': 'For test purposes'});
        env.client.send(req,((err,res) => {
          if(err) {
            chai.equal(err.name, 'ResponseError');
            chai.equal(err.statusCode, 409);
            done();
          }
          else {
            chai.fail();
          }
        }));
      }
    }));
  });
});
