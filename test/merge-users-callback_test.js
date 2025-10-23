/*
 This file is auto-generated, do not edit
*/

'use strict'
var assert = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('MergeUsers', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      done();
     });
  });
  
  it ('does not fail with existing users', (done) => {
    let req, req2, resp;
    req2 = new rqs.AddUser('target');
    env.client.send(req2,((err,res) => {
      if(err) {
        assert.fail();
      }
      else {
        req = new rqs.MergeUsers('target','entity_id');
        env.client.send(req,((err,res) => {
          if(err) {
            assert.fail();
          }
          else {
            done();
          }
        }));
      }
    }));
  });
  
  it ('fails with nonexisting user', (done) => {
    let req, req2, resp;
    req = new rqs.MergeUsers('nonex_id','entity_id');
    env.client.send(req,((err,res) => {
      if(err) {
        assert.equal(err.name, 'ResponseError');
        assert.equal(err.statusCode, 404);
        done();
      }
      else {
        assert.fail();
      }
    }));
  });
});
