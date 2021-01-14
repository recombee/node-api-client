/*
 This file is auto-generated, do not edit
*/

'use strict'
var chai = require('chai').assert;
var recombee = require('./../index.js');
var rqs = recombee.requests;

var env = require('./set-environment.js');

describe('RecommendNextItems', function(){
  this.timeout(150000);

  before(function(done){

    env.setEnvironment()
    .then(env.setRecommEntities)
    .then(()=> {
      done();
     });
  });
  
  it ('recommends', (done) => {
    let req, req2, resp;
    req2 = new rqs.RecommendItemsToUser('entity_id',3,{'returnProperties': true});
    env.client.send(req2,((err,res) => {
      if(err) {
        chai.fail();
      }
      else {
        req = new rqs.RecommendNextItems(res['recommId'],3);
        env.client.send(req,((err,res) => {
          if(err) {
            chai.fail();
          }
          else {
            chai.equal(res['recomms'].length, 3);
            req = new rqs.RecommendNextItems(res['recommId'],3);
            env.client.send(req,((err,res) => {
              if(err) {
                chai.fail();
              }
              else {
                chai.equal(res['recomms'].length, 3);
                done();
              }
            }));
          }
        }));
      }
    }));
  });
});
