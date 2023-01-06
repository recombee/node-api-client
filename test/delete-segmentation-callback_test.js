/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('DeleteSegmentation', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('deletes segmentation', (done) => {
    let req, req2, resp;
    req2 = new rqs.CreatePropertyBasedSegmentation('seg1','items','str_property');
    env.client.send(req2,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.DeleteSegmentation('seg1');
        env.client.send(req,((err,res) => {
          if(err) {
            chai.fail();
          }
          else {
            req = new rqs.DeleteSegmentation('seg1');
            env.client.send(req,((err,res) => {
              if(err) {
                chai.equal(err.name, 'ResponseError');
                chai.equal(err.statusCode, 404);
                done();
              }
              else {
                chai.fail();
              }
            }));
          }
        }));
      }
    }));
  });
});
