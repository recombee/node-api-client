'use strict';

var recombee = require('./../index.js');
var rqs = recombee.requests;
var errs = recombee.errors;

// Read credentials from environment variables
const DB_ID = process.env.DB_ID;
const PRIVATE_TOKEN = process.env.PRIVATE_TOKEN;

if (!DB_ID || !PRIVATE_TOKEN) {
    throw new Error('Environment variables DB_ID and PRIVATE_TOKEN must be set.');
}

var client = new recombee.ApiClient(DB_ID, PRIVATE_TOKEN, { region: 'eu-west' });

var _setEnvironmentData = (() => {
    let requests = new rqs.Batch([
        new rqs.AddItem('entity_id'),
        new rqs.AddUser('entity_id'),
        new rqs.AddSeries('entity_id'),
        new rqs.InsertToSeries('entity_id', 'item', 'entity_id', 1),
        new rqs.AddItemProperty('int_property', 'int'),
        new rqs.AddItemProperty('str_property', 'string'),
        new rqs.SetItemValues('entity_id', { 'int_property': 42, 'str_property': 'hello' }),
        new rqs.AddUserProperty('int_property', 'int'),
        new rqs.AddUserProperty('str_property', 'string'),
        new rqs.SetUserValues('entity_id', { 'int_property': 42, 'str_property': 'hello' })
    ]);

    return client.send(requests);
});

var _delay = ((t, v) => {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t);
    });
});

var _checkDbErased = (() => {
    return client.send(new rqs.ListItems())
        .then((resp) => {
            return _setEnvironmentData();
        })
        .catch((err) => {
            if (err instanceof errs.ResponseError && err.statusCode === 422) {
                // Wait until DB is erased
                return _delay(2000).then(() => {
                    return _checkDbErased();
                });
            }
            throw err;
        });
});

var setEnvironment = (() => {
    return _checkDbErased() // Ensure DB is in a clean state before resetting
        .then(() => {
            return client.send(new rqs.ResetDatabase());
        })
        .then((resp) => {
            return _checkDbErased(); // Ensure DB is ready after resetting
        });
});

var setInteractions = (() => {
    let requests = new rqs.Batch([
        new rqs.AddUser('user'),
        new rqs.AddItem('item'),
        new rqs.AddDetailView('user', 'item', { 'timestamp': 0 }),
        new rqs.AddPurchase('user', 'item', { 'timestamp': 0 }),
        new rqs.AddRating('user', 'item', -1, { 'timestamp': 0 }),
        new rqs.AddCartAddition('user', 'item', { 'timestamp': 0 }),
        new rqs.AddBookmark('user', 'item', { 'timestamp': 0 }),
        new rqs.SetViewPortion('user', 'item', 1, { 'timestamp': 0 })
    ]);

    return client.send(requests);
});

var setRecommEntities = (() => {
    const NUM = 100;
    const PROBABILITY_PURCHASED = 0.1;

    let users = Array.from({ length: NUM }, (_, i) => `user-${i}`);
    let items = Array.from({ length: NUM }, (_, i) => `item-${i}`);

    let purchases = [];

    users.forEach((user) => {
        let p = items.filter(() => Math.random() < PROBABILITY_PURCHASED);
        p.forEach((item) => { purchases.push(new rqs.AddPurchase(user, item)); });
    });

    return client.send(new rqs.Batch(users.map((u) => new rqs.AddUser(u))))
        .then(() => {
            return client.send(new rqs.Batch([
                new rqs.AddItemProperty('answer', 'int'),
                new rqs.AddItemProperty('id2', 'string'),
                new rqs.AddItemProperty('empty', 'string')
            ]));
        })
        .then(() => {
            return client.send(new rqs.Batch(items.map((itemId) => {
                return new rqs.SetItemValues(itemId, { 'answer': 42, 'id2': itemId }, { 'cascadeCreate': true });
            })));
        })
        .then(() => {
            return client.send(new rqs.Batch(purchases));
        });
});

exports.client = client;
exports.setEnvironment = setEnvironment;
exports.setInteractions = setInteractions;
exports.setRecommEntities = setRecommEntities;
