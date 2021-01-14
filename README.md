# Recombee API Client

A Node.js client (SDK) for easy use of the [Recombee](https://www.recombee.com/) recommendation API.
If you don't have an account at Recombee yet, you can create a free account [here](https://www.recombee.com/).

Documentation of the API can be found at [docs.recombee.com](https://docs.recombee.com/).

For client side (browser, mobile apps ...) .js library please see [this repository](https://github.com/recombee/js-api-client).

## Installation

```
npm i recombee-api-client --save
```

## Promises / callbacks

The SDK supports both Promises and callbacks, so you can choose the way which suits your coding style and conventions of your project:

```javascript
//Using Promise
client.send(new AddDetailView)
.then((response) => {
    //handle response
})
.catch((error) => {
    //handle error
});

//Using callback
client.send(new AddDetailView,
  (error, response) => {
    //handle result
  }
);
```


## Examples

### Basic example

```javascript
var recombee = require('recombee-api-client');
var rqs = recombee.requests;

var client = new recombee.ApiClient('--my-database-id--', '--db-private-token--');

// Prepare some userIDs and itemIDs
const NUM = 100;
var userIds = Array.apply(0, Array(NUM)).map((_, i) => {
  return `user-${i}`;
});

var itemIds = Array.apply(0, Array(NUM)).map((_, i) => {
  return `item-${i}`;
});


// Generate some random purchases of items by users
const PROBABILITY_PURCHASED = 0.1;
var purchases = [];
userIds.forEach((userId) => {
  var purchased = itemIds.filter(() => Math.random() < PROBABILITY_PURCHASED);
  purchased.forEach((itemId) => {

    purchases.push(new rqs.AddPurchase(userId, itemId, {'cascadeCreate': true}))

  });
});

// Send the data to Recombee, use Batch for faster processing of larger data
client.send(new rqs.Batch(purchases))
.then(() => {
  //Get 5 recommended items for user 'user-25'
  return client.send(new rqs.RecommendItemsToUser('user-25', 5));
})
.then((response) => {
  console.log("Recommended items for user-25: %j", response.recomms);

  // User scrolled down - get next 3 recommended items
  return client.send(new rqs.RecommendNextItems(response.recommId, 3));
})
.then((response) => {
  console.log("Next recommended items for user-25: %j", response.recomms);
})
.catch((error) => {
  console.error(error);
  // Use fallback
});
```

### Using property values

```javascript
var recombee = require('recombee-api-client');
var rqs = recombee.requests;

var client = new recombee.ApiClient('--my-database-id--', '--db-private-token--');
const NUM = 100;

// We will use computers as items in this example
// Computers have four properties 
//   - price (floating point number)
//   - number of processor cores (integer number)
//   - description (string)
//   - image (url of computer's photo)

// Add properties of items
client.send(new rqs.Batch([
    new rqs.AddItemProperty('price', 'double'),
    new rqs.AddItemProperty('num-cores', 'int'),
    new rqs.AddItemProperty('description', 'string'),
    new rqs.AddItemProperty('time', 'timestamp'),
    new rqs.AddItemProperty('image', 'image')
  ]))
  .then((responses) => {
    //Prepare requests for setting a catalog of computers

    var requests = Array.apply(0, Array(NUM)).map((_, i) => {
      return new rqs.SetItemValues(
        `computer-${i}`, //itemId
        //values:
        {
          'price': 600 + 400 * Math.random(),
          'num-cores': Math.floor(Math.random() * 8) + 1,
          'description': 'Great computer',
          'time': new Date().toISOString(),
          'image': `http://examplesite.com/products/computer-${i}.jpg`
        },
        //optional parameters:
        {
          'cascadeCreate': true // Use cascadeCreate for creating item
          // with given itemId, if it doesn't exist
        }
      );
    });
    //Send catalog to the recommender system
    return client.send(new rqs.Batch(requests));
  })
  .then((responses) => {
    // Generate some random purchases of items by users
    var userIds = Array.apply(0, Array(NUM)).map((_, i) => {
      return `user-${i}`;
    });
    var itemIds = Array.apply(0, Array(NUM)).map((_, i) => {
      return `computer-${i}`;
    });

    // Generate some random purchases of items by users
    const PROBABILITY_PURCHASED = 0.1;
    var purchases = [];
    userIds.forEach((userId) => {
      var purchased = itemIds.filter(() => Math.random() < PROBABILITY_PURCHASED);
      purchased.forEach((itemId) => {
        purchases.push(new rqs.AddPurchase(userId, itemId, {'cascadeCreate': true}))
      });
    });
    // Send purchases to the recommender system
    return client.send(new rqs.Batch(purchases));
  })
  .then((responses) => {
    // Get 5 recommendations for user-42, who is currently viewing computer-6
    // Recommend only computers that have at least 3 cores
    return client.send(new rqs.RecommendItemsToItem('computer-6', 'user-42', 5, 
                                                      {'filter': "'num-cores' >= 3"}
                                                    ));
  })
  .then((recommended) => {
    console.log("Recommended items with at least 3 processor cores: %j", recommended);

    // Recommend only items that are more expensive then currently viewed item (up-sell)
    return client.send(new rqs.RecommendItemsToItem('computer-6', 'user-42', 5, 
                                          {'filter': " 'price' > context_item[\"price\"] ",
                                           'returnProperties': true}
                                          ));
  })
  .then((recommended) => {
    console.log("Recommended up-sell items: %j", recommended)

    // Filters, boosters and other settings can be set also in the Admin UI (admin.recombee.com)
    // when scenario is specified
    return client.send(new rqs.RecommendItemsToItem('computer-6', 'user-42', 5, 
                                                      {'scenario': "product_detail"}
                                                    ));
  })
  .then((recommended) => {
    // Perform personalized full-text search with a user's search query (e.g. "computers")
    return client.send(new rqs.SearchItems('user-42', 'computers', 5, {'scenario': "search_top"}));
  })
  .then((matched) => {
    console.log("Matched items: %j", matched)
  })
  .catch((error) => {
    console.error(error);
    // Use fallback
  });
```

## Errors handling

Various errors can occur while processing request, for example because of adding an already existing item or submitting interaction of nonexistent user without *cascadeCreate* set to true. These errors lead to the *ResponseError*, which is thrown or put to callback function by the *send* method of the client (depending on using Promises or callbacks). Another reason for errorneous request is a timeout. *ApiError* is the base class of both *ResponseError* and *TimeoutError*.

We are doing our best to provide the fastest and most reliable service, but production-level applications must implement a fallback solution since problems can always happen. The fallback might be, for example, showing the most popular items from the current category, or not displaying recommendations at all.