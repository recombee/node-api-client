/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('InsertToSeries', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(()=> {
      setTimeout(done, 20000);
     });
  });
  
  it ('does not fail when inserting existing item into existing set', (done) => {
    let req, req2, resp;
    req2 = new rqs.AddItem('new_item');
    env.client.send(req2,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.InsertToSeries('entity_id','item','new_item',3);
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
  
  it ('does not fail when cascadeCreate is used', (done) => {
    let req, req2, resp;
    req = new rqs.InsertToSeries('new_set','item','new_item2',1,{'cascadeCreate': true});
    env.client.send(req,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        done();
      }
    }));
  });
  
  it ('really inserts item to the set', (done) => {
    let req, req2, resp;
    req2 = new rqs.AddItem('new_item3');
    env.client.send(req2,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.InsertToSeries('entity_id','item','new_item3',2);
        env.client.send(req,((err,res) => {
          if(err) {
            chai.fail();
          }
          else {
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
      }
    }));
  });
});
