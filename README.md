# Recombee API Client

A Node.js client (SDK) for easy use of the [Recombee](https://www.recombee.com/) recommendation API.
If you don't have an account at Recombee yet, you can create a free account [here](https://www.recombee.com/).

Documentation of the API can be found at [docs.recombee.com](https://docs.recombee.com/).

For client side (browser, mobile apps ...) .js library please see [this repository](https://github.com/recombee/js-api-client).

## Installation

```sh
npm install recombee-api-client
# or
yarn add recombee-api-client
# or
pnpm add recombee-api-client
# or
bun add recombee-api-client
```

The library ships with types, so you should get autocomplete in your IDE out of the box.
If you're using TypeScript, it should recognize these correctly and warn you about any type errors.

## Examples

### Basic examples

```javascript
import { ApiClient, requests } from "recombee-api-client";

const client = new ApiClient(
	"[RECOMBEE_DATABASE_ID]",
	"[RECOMBEE_DATABASE_PRIVATE_TOKEN]",
	{ region: "us-west" }
);

const request = new requests.ListUsers({ count: 10 });

client
	.send(request)
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error(error);
	});
```

```javascript
import { ApiClient, requests } from "recombee-api-client";

const client = new ApiClient(
	"[RECOMBEE_DATABASE_ID]",
	"[RECOMBEE_DATABASE_PRIVATE_TOKEN]",
	{ region: "us-west" }
);

async function example() {
	// Prepare some userIDs and itemIDs
	const NUM = 100;
	const userIds = Array.from({ length: NUM }).map((_, i) => {
		return `user-${i}`;
	});
	const itemIds = Array.from({ length: NUM }).map((_, i) => {
		return `item-${i}`;
	});

	// Generate some random purchases of items by users
	const PROBABILITY_PURCHASED = 0.1;
	const purchases = [];
	userIds.forEach((userId) => {
		const purchased = itemIds.filter(
			() => Math.random() < PROBABILITY_PURCHASED
		);
		purchased.forEach((itemId) => {
			purchases.push(
				new requests.AddPurchase(userId, itemId, {
					cascadeCreate: true,
				})
			);
		});
	});

	// Send the data to Recombee, use Batch for faster processing of larger data
	await client.send(new requests.Batch(purchases));

	//Get 5 recommended items for user 'user-25'
	const response = await client.send(
		new requests.RecommendItemsToUser("user-25", 5)
	);
	console.log("Recommended items for user-25: %j", response.recomms);
	// User scrolled down - get next 3 recommended items
	const response2 = await client.send(
		new requests.RecommendNextItems(response.recommId, 3)
	);
	console.log("Next recommended items for user-25: %j", response2.recomms);
}

example();
```

### Using property values

```javascript
const recombee = require("recombee-api-client");
const rqs = recombee.requests;

const client = new recombee.ApiClient(
	"--my-database-id--",
	"--db-private-token--",
	{ region: "ap-se" }
);
const NUM = 100;

// We will use computers as items in this example
// Computers have four properties
//   - price (floating point number)
//   - number of processor cores (integer number)
//   - description (string)
//   - image (url of computer's photo)

// Add properties of items
client
	.send(
		new rqs.Batch([
			new rqs.AddItemProperty("price", "double"),
			new rqs.AddItemProperty("num-cores", "int"),
			new rqs.AddItemProperty("description", "string"),
			new rqs.AddItemProperty("time", "timestamp"),
			new rqs.AddItemProperty("image", "image"),
		])
	)
	.then((responses) => {
		//Prepare requests for setting a catalog of computers

		var requests = Array.apply(0, Array(NUM)).map((_, i) => {
			return new rqs.SetItemValues(
				`computer-${i}`, //itemId
				//values:
				{
					price: 600 + 400 * Math.random(),
					"num-cores": Math.floor(Math.random() * 8) + 1,
					description: "Great computer",
					time: new Date().toISOString(),
					image: `http://examplesite.com/products/computer-${i}.jpg`,
				},
				//optional parameters:
				{
					cascadeCreate: true, // Use cascadeCreate for creating item
					// with given itemId, if it doesn't exist
				}
			);
		});
		//Send catalog to the recommender system
		return client.send(new rqs.Batch(requests));
	})
	.then((responses) => {
		// Generate some random purchases of items by users
		const userIds = Array.apply(0, Array(NUM)).map((_, i) => {
			return `user-${i}`;
		});
		const itemIds = Array.apply(0, Array(NUM)).map((_, i) => {
			return `computer-${i}`;
		});

		// Generate some random purchases of items by users
		const PROBABILITY_PURCHASED = 0.1;
		const purchases = [];
		userIds.forEach((userId) => {
			const purchased = itemIds.filter(
				() => Math.random() < PROBABILITY_PURCHASED
			);
			purchased.forEach((itemId) => {
				purchases.push(
					new rqs.AddPurchase(userId, itemId, { cascadeCreate: true })
				);
			});
		});
		// Send purchases to the recommender system
		return client.send(new rqs.Batch(purchases));
	})
	.then((responses) => {
		// Get 5 recommendations for user-42, who is currently viewing computer-6
		// Recommend only computers that have at least 3 cores
		return client.send(
			new rqs.RecommendItemsToItem("computer-6", "user-42", 5, {
				filter: "'num-cores' >= 3",
			})
		);
	})
	.then((recommended) => {
		console.log(
			"Recommended items with at least 3 processor cores: %j",
			recommended
		);

		// Recommend only items that are more expensive then currently viewed item (up-sell)
		return client.send(
			new rqs.RecommendItemsToItem("computer-6", "user-42", 5, {
				filter: " 'price' > context_item[\"price\"] ",
				returnProperties: true,
			})
		);
	})
	.then((recommended) => {
		console.log("Recommended up-sell items: %j", recommended);

		// Filters, boosters and other settings can be set also in the Admin UI (admin.recombee.com)
		// when scenario is specified
		return client.send(
			new rqs.RecommendItemsToItem("computer-6", "user-42", 5, {
				scenario: "product_detail",
			})
		);
	})
	.then((recommended) => {
		// Perform personalized full-text search with a user's search query (e.g. "computers")
		return client.send(
			new rqs.SearchItems("user-42", "computers", 5, {
				scenario: "search_top",
			})
		);
	})
	.then((matched) => {
		console.log("Matched items: %j", matched);
	})
	.catch((error) => {
		console.error(error);
		// Use fallback
	});
```

## Promises / callbacks

The SDK supports both Promises and callbacks, so you can choose the way which suits your coding style and conventions of your project:

```javascript
// Using Promises
await client.send(new ListUsers());
// or
client
	.send(new ListUsers())
	.then((response) => {
		// handle response
	})
	.catch((error) => {
		// handle error
	});

// Using callbacks
client.send(new ListUsers(), (error, response) => {
	// handle result
});
```

## Errors handling

Various errors can occur while processing request, for example because of adding an already existing item or submitting interaction of nonexistent user without _cascadeCreate_ set to true. These errors lead to the _ResponseError_, which is thrown or put to callback function by the _send_ method of the client (depending on using Promises or callbacks). Another reason for errorneous request is a timeout. _ApiError_ is the base class of both _ResponseError_ and _TimeoutError_.

We are doing our best to provide the fastest and most reliable service, but production-level applications must implement a fallback solution since problems can always happen. The fallback might be, for example, showing the most popular items from the current category, or not displaying recommendations at all.
