/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('AddSearchSynonym', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('adds search synonym', (done) => {
    let req, req2, resp;
    req = new rqs.AddSearchSynonym('sci-fi','science fiction',{'oneWay': true});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        chai.deepEqual('sci-fi', res['term']);
        chai.deepEqual('science fiction', res['synonym']);
        req = new rqs.AddSearchSynonym('sci-fi','science fiction',{'oneWay': true});
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
