'use strict'

var recombee = require('./../index.js');
var rqs = recombee.requests;
var errs = recombee.errors;

var client = new recombee.ApiClient('client-test', 'jGGQ6ZKa8rQ1zTAyxTc0EMn55YPF7FJLUtaMLhbsGxmvwxgTwXYqmUk5xVZFw98L');

var _setEnvironmentData = (() => {
  let requests = new rqs.Batch([

      new rqs.AddItem('entity_id'),
      new rqs.AddUser('entity_id'),
      new rqs.AddSeries('entity_id'),
      new rqs.AddGroup('entity_id'),
      new rqs.InsertToGroup('entity_id', 'item', 'entity_id'),
      new rqs.InsertToSeries('entity_id', 'item', 'entity_id', 1),
      new rqs.AddItemProperty('int_property', 'int'),
      new rqs.AddItemProperty('str_property', 'string'),
      new rqs.SetItemValues('entity_id', {'int_property': 42, 'str_property': 'hello'}),
      new rqs.AddUserProperty('int_property', 'int'),
      new rqs.AddUserProperty('str_property', 'string'),
      new rqs.SetUserValues('entity_id', {'int_property': 42, 'str_property': 'hello'})        
  ]);

  return client.send(requests);
});

var _delay = ((t, v) => {
   return new Promise(function(resolve) { 
       setTimeout(resolve.bind(null, v), t)
   })
});

var _checkDbErased = (() => {
  return client.send(new rqs.ListItems())
  .then((resp) => {
    return _setEnvironmentData();
  })
  .catch(errs.ResponseError,
    (err) => {
      // Wait until DB is erased
      return _delay(2000).then(() => {
        return _checkDbErased();
      })
  })
});

var setEnvironment = (() => {
  return client.send(new rqs.ResetDatabase())
  .then((resp) => {
    return _checkDbErased();
  })
});

var setInteractions = (() => {

  let requests = new rqs.Batch([
      new rqs.AddUser('user'),
      new rqs.AddItem('item'),
      new rqs.AddDetailView('user', 'item', {'timestamp': 0}),
      new rqs.AddPurchase('user', 'item', {'timestamp': 0}),
      new rqs.AddRating('user', 'item', -1, {'timestamp': 0}),
      new rqs.AddCartAddition('user', 'item', {'timestamp': 0}),
      new rqs.AddBookmark('user', 'item', {'timestamp': 0}),
      new rqs.SetViewPortion('user', 'item',1, {'timestamp': 0})
  ]);

  return client.send(requests);
});

var setRecommEntities = (() => {

  const NUM = 100
  const PROBABILITY_PURCHASED = 0.1

  let users = Array.apply(0, Array(NUM)).map(function (_, i) { 
          return `user-${i}`;
      });

  let items = Array.apply(0, Array(NUM)).map(function (_, i) { 
          return `item-${i}`;
      });

  let purchases = [];

  users.forEach((user) => {
    let p = items.filter(() => Math.random() < PROBABILITY_PURCHASED);
    p.forEach((item) => {purchases.push(new rqs.AddPurchase(user, item))});
  });

  return client.send(new rqs.Batch(users.map((u) => {return new rqs.AddUser(u)})))
  .then(() => {
    return client.send(new rqs.Batch([
      new rqs.AddItemProperty('answer', 'int'),
      new rqs.AddItemProperty('id2', 'string'),
      new rqs.AddItemProperty('empty', 'string')]));
  })
  .then(() => {
    return client.send(new rqs.Batch(items.map((itemId) => {
      return new rqs.SetItemValues(itemId, {'answer': 42, 'id2': itemId}, {'cascadeCreate': true})})));
  })
  .then(() => {
    return client.send(new rqs.Batch(purchases));
  });
});

exports.client = client;
exports.setEnvironment = setEnvironment;
exports.setInteractions = setInteractions;
exports.setRecommEntities = setRecommEntities;