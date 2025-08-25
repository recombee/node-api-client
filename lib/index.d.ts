declare module "recombee-api-client" {
  namespace requests {
    /**
     * Base class for all the requests
     */
    export class Request {
      /**
       * @param method - GET/PUT/POST/DELETE.
       * @param path - Path to the endpoint.
       * @param timeout - Timeout in milliseconds.
       * @param ensureHttps - If true, always use HTTPS.
       */
      constructor(
        method: "GET" | "PUT" | "POST" | "DELETE",
        path: string,
        timeout: number,
        ensureHttps: boolean
      );

      method: "GET" | "PUT" | "POST" | "DELETE";
      path: string;
      timeout: number;
      ensureHttps: boolean;

      protected __response_type: any;
    }

    export class SetValuesOptions {
      cascadeCreate?: boolean;
    }

    export class SetValues extends requests.Request {
      /**
       * @param values - The values for the individual properties.
       * ```json
       * {
       *   "product_description": "4K TV with 3D feature",
       *   "categories": ["Electronics", "Televisions"],
       *   "price_usd": 342,
       *   "in_stock_from": "2016-11-16T08:00Z"
       * }
       * ```
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        path: string,
        values: { [key: string]: unknown },
        optional?: SetValuesOptions
      );

      protected __response_type: string;

      /**
       * Get body parameters
       * 
       * @returns The values of body parameters (name of parameter: value of the parameter).
       */
      bodyParameters(): { [key: string]: unknown };
      queryParameters(): { [key: string]: unknown };
    }

    export class SetUserValues extends SetValues {
      /**
       * @param userId - ID of the user which will be modified.
       * @param values - The values for the individual properties.
       * ```json
       * {
       *   "country": "US",
       *   "sex": "F"
       * }
       * ```
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        values: { [key: string]: unknown },
        optional?: SetValuesOptions
      );
    }

    export class SetItemValues extends SetValues {
      /**
       * @param itemId - ID of the item which will be modified.
       * @param values - The values for the individual properties.
       * ```json
       * {
       *   "product_description": "4K TV with 3D feature",
       *   "categories": ["Electronics", "Televisions"],
       *   "price_usd": 342,
       *   "in_stock_from": "2016-11-16T08:00Z"
       * }
       * ```
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        itemId: string,
        values: { [key: string]: unknown },
        optional?: SetValuesOptions
      );
    }

    /**
   * In many cases, it may be desirable to execute multiple requests at once. For example, when synchronizing the catalog of items in a periodical manner, you would have to execute a sequence of thousands of separate POST requests, which is very ineffective and may take a very long time to complete. Most notably, network latencies can make execution of such sequence very slow and even if executed in multiple parallel threads, there will still be unreasonable overhead caused by the HTTP(s). To avoid the mentioned problems, batch processing may be used, encapsulating a sequence of requests into a single HTTPS request.
   * Batch processing allows you to submit arbitrary sequence of requests and the batch may combine different types of requests arbitrarily as well.
   * Note that the status code of the batch request itself is 200 even if the individual requests result in error – you have to inspect the code values in the resulting array.
    */
    export class Batch extends requests.Request {
      /**
       * @param requests - Array containing the requests.
       * @param optional - Optional parameters given as an object (allowed parameters: distinctRecomms).
       */
      constructor(
        requests: Request[],
        optional?: {
          distinctRecomms?: boolean
        }
      );

      protected __response_type: BatchResponse;

      /**
       * Get body parameters
       * 
       * @returns The values of body parameters (name of parameter: value of the parameter).
       */
      bodyParameters(): {
        requests: BatchedRequest[];
        distinctRecomms?: boolean;
      }

      _request_to_batch_object(
        req: Request
      ): BatchedRequest

      /**
       * Get query parameters
       * 
       * @returns The values of query parameters (name of parameter: value of the parameter).
       */
      queryParameters(): { [key: string]: unknown };
    }
  }

  namespace errors {
    /**
     * Base class for errors that occur because of errors in requests reported by API or because of a timeout
     */
    export class ApiError extends Error {
      /**
       * @param message - Message of the exception.
       */
      constructor(
        message: string
      );
    }

    /**
     * Error thrown when a request did not succeed (did not return 200 or 201)
     */
    export class ResponseError extends errors.ApiError {
      /**
       * @param request - Request which caused the exception.
       * @param statusCode - The returned status code.
       * @param message - Error message from the API.
       */
      constructor(
        request: Request,
        statusCode: number,
        message: string
      );
    }

    /**
     * Error thrown when a request is not processed within the timeout
     */
    export class TimeoutError extends errors.ApiError {
      /**
       * @param request - Request which caused the exception.
       * @param innerException - Exception from underlying HTTP library.
       */
      constructor(
        request: Request,
        innerException: object
      );
    }
  }

  export type BatchedRequest = {
    method: string;
    path: string;
    params?: { [key: string]: unknown };
  }

  export type ApiClientOptions = {
    protocol?: string;
    agent?: object;
  } & (
    | {
        baseUri?: string;
      }
    | {
        region?: string;
      }
  )

  export type BatchResponse = {
    code: number;
    json: any;
  }[]

  /**
   * Mapping of Item/User property types to their corresponding TypeScript types.
   */
  export type EntityProperty =
    | StringProperty
    | IntProperty
    | DoubleProperty
    | BooleanProperty
    | TimestampProperty
    | SetProperty
    | ImageProperty
    | ImageListProperty
    | null;
    
  type StringProperty = string;
  type IntProperty = number;
  type DoubleProperty = number;
  type BooleanProperty = boolean;
  /** Unix timestamp in seconds */
  type TimestampProperty = number;
  /** Unordered set of strings */
  type SetProperty = string[];
  /** URL of the image */
  type ImageProperty = string;
  /** Array of image URLs */
  type ImageListProperty = string[];

  /**
    * Client for sending requests to Recombee and getting replies
    */
  export class ApiClient {
    /**
     * @param databaseId - ID of your database.
     * @param token - Corresponding public token.
     * @param options - Other custom options.
     */
    constructor(
      databaseId: string,
      token: string,
      options?: ApiClientOptions
    );

    _getRegionalBaseUri(
      region: string
    ): string;

    _buildRequestUrl(
      request: Request
    ): string;

    _getBaseUri(): string;
    _encodeRequestQueryParams(request: requests.Request): string;
    _rfc3986EncodeURIComponent(str: string): string;
    _formatQueryParameterValue(): string;
    _split_requests(
      requests: requests.Request[],
      chunk_size: number
    ): requests.Request[][];
    _concat_multipart_results(
      responses: Response[][]
    ): Promise<Response[]>
    _send_batch_part_rec(requests: requests.Request[], results: Response[]): Promise<Response[]>;
    _send_multipart_batch(batch: requests.Request, callback?: (error: errors.ResponseError | null, response?: Response) => void): Promise<Response>;

    /**
     * Send the request to Recombee
     * 
     * @param request - Request to be sent.
     * @param callback - Optional callback.
     * @returns Promise if callback is omitted, otherwise void.
     */
    send<TRequest extends requests.Request>(
      request: TRequest, // @ts-expect-error
      callback?: (error: errors.ResponseError | null, response?: TRequest["__response_type"]) => void // @ts-expect-error
    ): Promise<TRequest["__response_type"]>;

    _signUrl(
      req_part: string
    ): string
  }

  export type Item = {
    itemId: string;
    values?: Record<string, EntityProperty>;
  }

  export type PropertyInfo = {
    name: string;
    type: string;
  }

  export type UpdateMoreItemsResponse = {
    count: number;
    itemIds: string[];
  }

  export type DeleteMoreItemsResponse = {
    count: number;
    itemIds: string[];
  }

  export type Series = {
    seriesId: string;
  }

  export type SeriesItem = {
    itemType: string;
    itemId: string;
    time: number;
    cascadeCreate?: boolean;
  }

  export type User = {
    userId: string;
    values?: Record<string, EntityProperty>;
  }

  export type DetailView = {
    userId: string;
    itemId: string;
    timestamp?: string | number;
    duration?: number;
    cascadeCreate?: boolean;
    recommId?: string;
    additionalData?: Record<string, unknown>;
  }

  export type Purchase = {
    userId: string;
    itemId: string;
    timestamp?: string | number;
    cascadeCreate?: boolean;
    amount?: number;
    price?: number;
    profit?: number;
    recommId?: string;
    additionalData?: Record<string, unknown>;
  }

  export type Rating = {
    userId: string;
    itemId: string;
    timestamp?: string | number;
    rating: number;
    cascadeCreate?: boolean;
    recommId?: string;
    additionalData?: Record<string, unknown>;
  }

  export type CartAddition = {
    userId: string;
    itemId: string;
    timestamp?: string | number;
    cascadeCreate?: boolean;
    amount?: number;
    price?: number;
    recommId?: string;
    additionalData?: Record<string, unknown>;
  }

  export type Bookmark = {
    userId: string;
    itemId: string;
    timestamp?: string | number;
    cascadeCreate?: boolean;
    recommId?: string;
    additionalData?: Record<string, unknown>;
  }

  export type ViewPortion = {
    userId: string;
    itemId: string;
    portion: number;
    sessionId?: string;
    timestamp?: string | number;
    cascadeCreate?: boolean;
    recommId?: string;
    additionalData?: Record<string, unknown>;
  }

  export type Recommendation = {
    id: string;
    values?: Record<string, EntityProperty>;
  }

  export type RecommendationResponse = {
    recommId: string;
    recomms: Recommendation[];
    numberNextRecommsCalls?: number;
    abGroup?: string;
  }

  export type SearchResponse = {
    recommId: string;
    recomms: Recommendation[];
    numberNextRecommsCalls?: number;
    abGroup?: string;
  }

  export type SearchSynonym = {
    id: string;
    term: string;
    synonym: string;
    oneWay: boolean;
  }

  export type ListSearchSynonymsResponse = {
    synonyms: SearchSynonym[];
  }

  export type ListSegmentationsResponse = {
    segmentations: Segmentation[];
  }

  export type Segmentation = {
    segmentationId: string;
    sourceType: string;
    segmentationType: string;
    title?: string;
    description?: string;
  }

  export type Scenario = {
    id: string;
    endpoint: string;
  }

  namespace requests {
    /**
     * Adds new item of the given `itemId` to the items catalog.
     * All the item properties for the newly created items are set to null.
     */
    export class AddItem extends requests.Request {
      /**
       * @param itemId - ID of the item to be created.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes an item of the given `itemId` from the catalog.
     * If there are any *purchases*, *ratings*, *bookmarks*, *cart additions*, or *detail views* of the item present in the database, they will be deleted in cascade as well. Also, if the item is present in some *series*, it will be removed from all the *series* where present.
     * If an item becomes obsolete/no longer available, it is meaningful to keep it in the catalog (along with all the interaction data, which are very useful), and **only exclude the item from recommendations**. In such a case, use [ReQL filter](https://docs.recombee.com/reql) instead of deleting the item completely.
     */
    export class DeleteItem extends requests.Request {
      /**
       * @param itemId - ID of the item to be deleted.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets all the current property values of the given item.
     */
    export class GetItemValues extends requests.Request {
      /**
       * @param itemId - ID of the item whose properties are to be obtained.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: Record<string, EntityProperty>;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets a list of IDs of items currently present in the catalog.
     */
    export class ListItems extends requests.Request {
      /**
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        optional?: {
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter items to be listed. Only the items for which the expression is *true* will be returned. */
          filter?: string;
          /** The number of items to be listed. */
          count?: number;
          /** Specifies the number of items to skip (ordered by `itemId`). */
          offset?: number;
          /** With `returnProperties=true`, property values of the listed items are returned along with their IDs in a JSON dictionary.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
        }
      );

      filter?: string;
      count?: number;
      offset?: number;
      returnProperties?: boolean;
      includedProperties?: string[];
      protected __response_type: Item[];

      bodyParameters(): {
      };

      queryParameters(): {
        filter?: string;
        count?: number;
        offset?: number;
        returnProperties?: boolean;
        includedProperties?: string[];
      };
    }

    /**
     * Adding an item property is somewhat equivalent to adding a column to the table of items. The items may be characterized by various properties of different types.
     */
    export class AddItemProperty extends requests.Request {
      /**
       * @param propertyName - Name of the item property to be created. Currently, the following names are reserved: `id`, `itemid`, case-insensitively. Also, the length of the property name must not exceed 63 characters.
       * @param type - Value type of the item property to be created. One of: `int`, `double`, `string`, `boolean`, `timestamp`, `set`, `image` or `imageList`.
       * * `int`- Signed integer number.
       * * `double` - Floating point number. It uses 64-bit base-2 format (IEEE 754 standard).
       * * `string` - UTF-8 string.
       * * `boolean` - *true* / *false*
       * * `timestamp` - Value representing date and time.
       * * `set` - Set of strings.
       * * `image` - URL of an image (`jpeg`, `png` or `gif`).
       * * `imageList` - List of URLs that refer to images. 
       */
      constructor(
        propertyName: string,
        type: string,
      );

      propertyName: string;
      type: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        type: string;
      };
    }

    /**
     * Deleting an item property is roughly equivalent to removing a column from the table of items.
     */
    export class DeleteItemProperty extends requests.Request {
      /**
       * @param propertyName - Name of the property to be deleted.
       */
      constructor(
        propertyName: string,
      );

      propertyName: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets information about specified item property.
     */
    export class GetItemPropertyInfo extends requests.Request {
      /**
       * @param propertyName - Name of the property about which the information is to be retrieved.
       */
      constructor(
        propertyName: string,
      );

      propertyName: string;
      protected __response_type: PropertyInfo;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets the list of all the item properties in your database.
     */
    export class ListItemProperties extends requests.Request {
      /**

       */
      constructor(
      );

      protected __response_type: PropertyInfo[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Updates (some) property values of all the items that pass the filter.
     * Example: *Setting all the items that are older than a week as unavailable*
     *   ```json
     *     {
     *       "filter": "'releaseDate' < now() - 7*24*3600",
     *       "changes": {"available": false}
     *     }
     *   ```
     */
    export class UpdateMoreItems extends requests.Request {
      /**
       * @param filter - A [ReQL](https://docs.recombee.com/reql) expression, which returns `true` for the items that shall be updated.
       * @param changes - A dictionary where the keys are properties that shall be updated.
       */
      constructor(
        filter: string,
        changes: { [key: string]: unknown },
      );

      filter: string;
      changes: { [key: string]: unknown };
      protected __response_type: UpdateMoreItemsResponse;

      bodyParameters(): {
        filter: string;
        changes: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes all the items that pass the filter.
     * If an item becomes obsolete/no longer available, it is meaningful to **keep it in the catalog** (along with all the interaction data, which are very useful) and **only exclude the item from recommendations**. In such a case, use [ReQL filter](https://docs.recombee.com/reql) instead of deleting the item completely.
     */
    export class DeleteMoreItems extends requests.Request {
      /**
       * @param filter - A [ReQL](https://docs.recombee.com/reql) expression, which returns `true` for the items that shall be updated.
       */
      constructor(
        filter: string,
      );

      filter: string;
      protected __response_type: DeleteMoreItemsResponse;

      bodyParameters(): {
        filter: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Creates a new series in the database.
     */
    export class AddSeries extends requests.Request {
      /**
       * @param seriesId - ID of the series to be created.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        seriesId: string,
        optional?: {
          /** If set to `true`, the item will be created with the same ID as the series. Default is `true`. */
          cascadeCreate?: boolean;
        }
      );

      seriesId: string;
      cascadeCreate?: boolean;
      protected __response_type: string;

      bodyParameters(): {
        cascadeCreate?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes the series of the given `seriesId` from the database.
     * Deleting a series will only delete assignment of items to it, not the items themselves!
     */
    export class DeleteSeries extends requests.Request {
      /**
       * @param seriesId - ID of the series to be deleted.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        seriesId: string,
        optional?: {
          /** If set to `true`, item with the same ID as seriesId will be also deleted. Default is `false`. */
          cascadeDelete?: boolean;
        }
      );

      seriesId: string;
      cascadeDelete?: boolean;
      protected __response_type: string;

      bodyParameters(): {
        cascadeDelete?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Gets the list of all the series currently present in the database.
     */
    export class ListSeries extends requests.Request {
      /**

       */
      constructor(
      );

      protected __response_type: Series[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the items present in the given series, sorted according to their time index values.
     */
    export class ListSeriesItems extends requests.Request {
      /**
       * @param seriesId - ID of the series whose items are to be listed.
       */
      constructor(
        seriesId: string,
      );

      seriesId: string;
      protected __response_type: SeriesItem[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Inserts an existing item/series into a series of the given seriesId at a position determined by time.
     */
    export class InsertToSeries extends requests.Request {
      /**
       * @param seriesId - ID of the series to be inserted into.
       * @param itemType - `item` iff the regular item from the catalog is to be inserted, `series` iff series is inserted as the item.
       * @param itemId - ID of the item iff `itemType` is `item`. ID of the series iff `itemType` is `series`.
       * @param time - Time index used for sorting items in the series. According to time, items are sorted within series in ascending order. In the example of TV show episodes, the episode number is a natural choice to be passed as time.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        seriesId: string,
        itemType: string,
        itemId: string,
        time: number,
        optional?: {
          /** Indicates that any non-existing entity specified within the request should be created (as if corresponding PUT requests were invoked). This concerns both the `seriesId` and the `itemId`. If `cascadeCreate` is set to true, the behavior also depends on the `itemType`. In case of `item`, an item is created, in case of `series` a series + corresponding item with the same ID is created. */
          cascadeCreate?: boolean;
        }
      );

      seriesId: string;
      itemType: string;
      itemId: string;
      time: number;
      cascadeCreate?: boolean;
      protected __response_type: string;

      bodyParameters(): {
        itemType: string;
        itemId: string;
        time: number;
        cascadeCreate?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Removes an existing series item from the series.
     */
    export class RemoveFromSeries extends requests.Request {
      /**
       * @param seriesId - ID of the series from which a series item is to be removed.
       * @param itemType - Type of the item to be removed.
       * @param itemId - ID of the item iff `itemType` is `item`. ID of the series iff `itemType` is `series`.
       */
      constructor(
        seriesId: string,
        itemType: string,
        itemId: string,
      );

      seriesId: string;
      itemType: string;
      itemId: string;
      protected __response_type: string;

      bodyParameters(): {
        itemType: string;
        itemId: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a new user to the database.
     */
    export class AddUser extends requests.Request {
      /**
       * @param userId - ID of the user to be added.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes a user of the given *userId* from the database.
     * If there are any purchases, ratings, bookmarks, cart additions or detail views made by the user present in the database, they will be deleted in cascade as well.
     */
    export class DeleteUser extends requests.Request {
      /**
       * @param userId - ID of the user to be deleted.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets all the current property values of the given user.
     */
    export class GetUserValues extends requests.Request {
      /**
       * @param userId - ID of the user whose properties are to be obtained.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: Record<string, EntityProperty>;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Merges interactions (purchases, ratings, bookmarks, detail views ...) of two different users under a single user ID. This is especially useful for online e-commerce applications working with anonymous users identified by unique tokens such as the session ID. In such applications, it may often happen that a user owns a persistent account, yet accesses the system anonymously while, e.g., putting items into a shopping cart. At some point in time, such as when the user wishes to confirm the purchase, (s)he logs into the system using his/her username and password. The interactions made under anonymous session ID then become connected with the persistent account, and merging these two becomes desirable.
     * Merging happens between two users referred to as the *target* and the *source*. After the merge, all the interactions of the source user are attributed to the target user, and the source user is **deleted**.
     * By default, the *Merge Users* request is only available from server-side integrations for security reasons, to prevent potential abuse.
     * If you need to call this request from a client-side environment (such as a web or mobile app), please contact our support and request access to enable this feature for your database.
     */
    export class MergeUsers extends requests.Request {
      /**
       * @param targetUserId - ID of the target user.
       * @param sourceUserId - ID of the source user.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        targetUserId: string,
        sourceUserId: string,
        optional?: {
          /** Sets whether the user *targetUserId* should be created if not present in the database. */
          cascadeCreate?: boolean;
        }
      );

      targetUserId: string;
      sourceUserId: string;
      cascadeCreate?: boolean;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        cascadeCreate?: boolean;
      };
    }

    /**
     * Gets a list of IDs of users currently present in the catalog.
     */
    export class ListUsers extends requests.Request {
      /**
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        optional?: {
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter users to be listed. Only the users for which the expression is *true* will be returned. */
          filter?: string;
          /** The number of users to be listed. */
          count?: number;
          /** Specifies the number of users to skip (ordered by `userId`). */
          offset?: number;
          /** With `returnProperties=true`, property values of the listed users are returned along with their IDs in a JSON dictionary.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
        }
      );

      filter?: string;
      count?: number;
      offset?: number;
      returnProperties?: boolean;
      includedProperties?: string[];
      protected __response_type: User[];

      bodyParameters(): {
      };

      queryParameters(): {
        filter?: string;
        count?: number;
        offset?: number;
        returnProperties?: boolean;
        includedProperties?: string[];
      };
    }

    /**
     * Adding a user property is somewhat equivalent to adding a column to the table of users. The users may be characterized by various properties of different types.
     */
    export class AddUserProperty extends requests.Request {
      /**
       * @param propertyName - Name of the user property to be created. Currently, the following names are reserved: `id`, `userid`, case-insensitively. Also, the length of the property name must not exceed 63 characters.
       * @param type - Value type of the user property to be created. One of: `int`, `double`, `string`, `boolean`, `timestamp`, `set`.
       * * `int` - Signed integer number.
       * * `double` - Floating point number. It uses 64-bit base-2 format (IEEE 754 standard).
       * * `string` - UTF-8 string.
       * * `boolean` - *true* / *false*
       * * `timestamp` - Value representing date and time.
       * * `set` - Set of strings.
       */
      constructor(
        propertyName: string,
        type: string,
      );

      propertyName: string;
      type: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        type: string;
      };
    }

    /**
     * Deleting a user property is roughly equivalent to removing a column from the table of users.
     */
    export class DeleteUserProperty extends requests.Request {
      /**
       * @param propertyName - Name of the property to be deleted.
       */
      constructor(
        propertyName: string,
      );

      propertyName: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets information about specified user property.
     */
    export class GetUserPropertyInfo extends requests.Request {
      /**
       * @param propertyName - Name of the property about which the information is to be retrieved.
       */
      constructor(
        propertyName: string,
      );

      propertyName: string;
      protected __response_type: PropertyInfo;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Gets the list of all the user properties in your database.
     */
    export class ListUserProperties extends requests.Request {
      /**

       */
      constructor(
      );

      protected __response_type: PropertyInfo[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a detail view of the given item made by the given user.
     */
    export class AddDetailView extends requests.Request {
      /**
       * @param userId - User who viewed the item
       * @param itemId - Viewed item
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** UTC timestamp of the view as ISO8601-1 pattern or UTC epoch time. The default value is the current time. */
          timestamp?: string | number;
          /** Duration of the view */
          duration?: number;
          /** Sets whether the given user/item should be created if not present in the database. */
          cascadeCreate?: boolean;
          /** If this detail view is based on a recommendation request, `recommId` is the id of the clicked recommendation. */
          recommId?: string;
          /** A dictionary of additional data for the interaction. */
          additionalData?: { [key: string]: unknown };
        }
      );

      userId: string;
      itemId: string;
      timestamp?: string | number;
      duration?: number;
      cascadeCreate?: boolean;
      recommId?: string;
      additionalData?: { [key: string]: unknown };
      protected __response_type: string;

      bodyParameters(): {
        userId: string;
        itemId: string;
        timestamp?: string | number;
        duration?: number;
        cascadeCreate?: boolean;
        recommId?: string;
        additionalData?: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes an existing detail view uniquely specified by (`userId`, `itemId`, and `timestamp`) or all the detail views with the given `userId` and `itemId` if `timestamp` is omitted.
     */
    export class DeleteDetailView extends requests.Request {
      /**
       * @param userId - ID of the user who made the detail view.
       * @param itemId - ID of the item whose details were viewed.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** Unix timestamp of the detail view. If the `timestamp` is omitted, then all the detail views with the given `userId` and `itemId` are deleted. */
          timestamp?: number;
        }
      );

      userId: string;
      itemId: string;
      timestamp?: number;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        userId: string;
        itemId: string;
        timestamp?: number;
      };
    }

    /**
     * Lists all the detail views of the given item ever made by different users.
     */
    export class ListItemDetailViews extends requests.Request {
      /**
       * @param itemId - ID of the item whose detail views are to be listed.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: DetailView[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the detail views of different items ever made by the given user.
     */
    export class ListUserDetailViews extends requests.Request {
      /**
       * @param userId - ID of the user whose detail views are to be listed.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: DetailView[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a purchase of the given item made by the given user.
     */
    export class AddPurchase extends requests.Request {
      /**
       * @param userId - User who purchased the item
       * @param itemId - Purchased item
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** UTC timestamp of the purchase as ISO8601-1 pattern or UTC epoch time. The default value is the current time. */
          timestamp?: string | number;
          /** Sets whether the given user/item should be created if not present in the database. */
          cascadeCreate?: boolean;
          /** Amount (number) of purchased items. The default is 1. For example, if `user-x` purchases two `item-y` during a single order (session...), the `amount` should equal 2. */
          amount?: number;
          /** Price paid by the user for the item. If `amount` is greater than 1, the sum of prices of all the items should be given. */
          price?: number;
          /** Your profit from the purchased item. The profit is natural in the e-commerce domain (for example, if `user-x` purchases `item-y` for $100 and the gross margin is 30 %, then the profit is $30) but is also applicable in other domains (for example, at a news company it may be income from a displayed advertisement on article page). If `amount` is greater than 1, the sum of profit of all the items should be given. */
          profit?: number;
          /** If this purchase is based on a recommendation request, `recommId` is the id of the clicked recommendation. */
          recommId?: string;
          /** A dictionary of additional data for the interaction. */
          additionalData?: { [key: string]: unknown };
        }
      );

      userId: string;
      itemId: string;
      timestamp?: string | number;
      cascadeCreate?: boolean;
      amount?: number;
      price?: number;
      profit?: number;
      recommId?: string;
      additionalData?: { [key: string]: unknown };
      protected __response_type: string;

      bodyParameters(): {
        userId: string;
        itemId: string;
        timestamp?: string | number;
        cascadeCreate?: boolean;
        amount?: number;
        price?: number;
        profit?: number;
        recommId?: string;
        additionalData?: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes an existing purchase uniquely specified by `userId`, `itemId`, and `timestamp` or all the purchases with the given `userId` and `itemId` if `timestamp` is omitted.
     */
    export class DeletePurchase extends requests.Request {
      /**
       * @param userId - ID of the user who made the purchase.
       * @param itemId - ID of the item which was purchased.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** Unix timestamp of the purchase. If the `timestamp` is omitted, then all the purchases with the given `userId` and `itemId` are deleted. */
          timestamp?: number;
        }
      );

      userId: string;
      itemId: string;
      timestamp?: number;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        userId: string;
        itemId: string;
        timestamp?: number;
      };
    }

    /**
     * Lists all the ever-made purchases of the given item.
     */
    export class ListItemPurchases extends requests.Request {
      /**
       * @param itemId - ID of the item whose purchases are to be listed.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: Purchase[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the purchases ever made by the given user.
     */
    export class ListUserPurchases extends requests.Request {
      /**
       * @param userId - ID of the user whose purchases are to be listed.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: Purchase[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a rating of the given item made by the given user.
     */
    export class AddRating extends requests.Request {
      /**
       * @param userId - User who submitted the rating
       * @param itemId - Rated item
       * @param rating - Rating rescaled to interval [-1.0,1.0], where -1.0 means the worst rating possible, 0.0 means neutral, and 1.0 means absolutely positive rating. For example, in the case of 5-star evaluations, rating = (numStars-3)/2 formula may be used for the conversion.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        rating: number,
        optional?: {
          /** UTC timestamp of the rating as ISO8601-1 pattern or UTC epoch time. The default value is the current time. */
          timestamp?: string | number;
          /** Sets whether the given user/item should be created if not present in the database. */
          cascadeCreate?: boolean;
          /** If this rating is based on a recommendation request, `recommId` is the id of the clicked recommendation. */
          recommId?: string;
          /** A dictionary of additional data for the interaction. */
          additionalData?: { [key: string]: unknown };
        }
      );

      userId: string;
      itemId: string;
      rating: number;
      timestamp?: string | number;
      cascadeCreate?: boolean;
      recommId?: string;
      additionalData?: { [key: string]: unknown };
      protected __response_type: string;

      bodyParameters(): {
        userId: string;
        itemId: string;
        rating: number;
        timestamp?: string | number;
        cascadeCreate?: boolean;
        recommId?: string;
        additionalData?: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes an existing rating specified by (`userId`, `itemId`, `timestamp`) from the database or all the ratings with the given `userId` and `itemId` if `timestamp` is omitted.
     */
    export class DeleteRating extends requests.Request {
      /**
       * @param userId - ID of the user who rated the item.
       * @param itemId - ID of the item which was rated.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** Unix timestamp of the rating. If the `timestamp` is omitted, then all the ratings with the given `userId` and `itemId` are deleted. */
          timestamp?: number;
        }
      );

      userId: string;
      itemId: string;
      timestamp?: number;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        userId: string;
        itemId: string;
        timestamp?: number;
      };
    }

    /**
     * Lists all the ratings of an item ever submitted by different users.
     */
    export class ListItemRatings extends requests.Request {
      /**
       * @param itemId - ID of the item whose ratings are to be listed.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: Rating[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the ratings ever submitted by the given user.
     */
    export class ListUserRatings extends requests.Request {
      /**
       * @param userId - ID of the user whose ratings are to be listed.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: Rating[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a cart addition of the given item made by the given user.
     */
    export class AddCartAddition extends requests.Request {
      /**
       * @param userId - User who added the item to the cart
       * @param itemId - Item added to the cart
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** UTC timestamp of the cart addition as ISO8601-1 pattern or UTC epoch time. The default value is the current time. */
          timestamp?: string | number;
          /** Sets whether the given user/item should be created if not present in the database. */
          cascadeCreate?: boolean;
          /** Amount (number) added to cart. The default is 1. For example, if `user-x` adds two `item-y` during a single order (session...), the `amount` should equal 2. */
          amount?: number;
          /** Price of the added item. If `amount` is greater than 1, the sum of prices of all the items should be given. */
          price?: number;
          /** If this cart addition is based on a recommendation request, `recommId` is the id of the clicked recommendation. */
          recommId?: string;
          /** A dictionary of additional data for the interaction. */
          additionalData?: { [key: string]: unknown };
        }
      );

      userId: string;
      itemId: string;
      timestamp?: string | number;
      cascadeCreate?: boolean;
      amount?: number;
      price?: number;
      recommId?: string;
      additionalData?: { [key: string]: unknown };
      protected __response_type: string;

      bodyParameters(): {
        userId: string;
        itemId: string;
        timestamp?: string | number;
        cascadeCreate?: boolean;
        amount?: number;
        price?: number;
        recommId?: string;
        additionalData?: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes an existing cart addition uniquely specified by `userId`, `itemId`, and `timestamp` or all the cart additions with the given `userId` and `itemId` if `timestamp` is omitted.
     */
    export class DeleteCartAddition extends requests.Request {
      /**
       * @param userId - ID of the user who made the cart addition.
       * @param itemId - ID of the item which was added to the cart.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** Unix timestamp of the cart addition. If the `timestamp` is omitted, then all the cart additions with the given `userId` and `itemId` are deleted. */
          timestamp?: number;
        }
      );

      userId: string;
      itemId: string;
      timestamp?: number;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        userId: string;
        itemId: string;
        timestamp?: number;
      };
    }

    /**
     * Lists all the ever-made cart additions of the given item.
     */
    export class ListItemCartAdditions extends requests.Request {
      /**
       * @param itemId - ID of the item whose cart additions are to be listed.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: CartAddition[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the cart additions ever made by the given user.
     */
    export class ListUserCartAdditions extends requests.Request {
      /**
       * @param userId - ID of the user whose cart additions are to be listed.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: CartAddition[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a bookmark of the given item made by the given user.
     */
    export class AddBookmark extends requests.Request {
      /**
       * @param userId - User who bookmarked the item
       * @param itemId - Bookmarked item
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** UTC timestamp of the bookmark as ISO8601-1 pattern or UTC epoch time. The default value is the current time. */
          timestamp?: string | number;
          /** Sets whether the given user/item should be created if not present in the database. */
          cascadeCreate?: boolean;
          /** If this bookmark is based on a recommendation request, `recommId` is the id of the clicked recommendation. */
          recommId?: string;
          /** A dictionary of additional data for the interaction. */
          additionalData?: { [key: string]: unknown };
        }
      );

      userId: string;
      itemId: string;
      timestamp?: string | number;
      cascadeCreate?: boolean;
      recommId?: string;
      additionalData?: { [key: string]: unknown };
      protected __response_type: string;

      bodyParameters(): {
        userId: string;
        itemId: string;
        timestamp?: string | number;
        cascadeCreate?: boolean;
        recommId?: string;
        additionalData?: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes a bookmark uniquely specified by `userId`, `itemId`, and `timestamp` or all the bookmarks with the given `userId` and `itemId` if `timestamp` is omitted.
     */
    export class DeleteBookmark extends requests.Request {
      /**
       * @param userId - ID of the user who made the bookmark.
       * @param itemId - ID of the item which was bookmarked.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** Unix timestamp of the bookmark. If the `timestamp` is omitted, then all the bookmarks with the given `userId` and `itemId` are deleted. */
          timestamp?: number;
        }
      );

      userId: string;
      itemId: string;
      timestamp?: number;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        userId: string;
        itemId: string;
        timestamp?: number;
      };
    }

    /**
     * Lists all the ever-made bookmarks of the given item.
     */
    export class ListItemBookmarks extends requests.Request {
      /**
       * @param itemId - ID of the item whose bookmarks are to be listed.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: Bookmark[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the bookmarks ever made by the given user.
     */
    export class ListUserBookmarks extends requests.Request {
      /**
       * @param userId - ID of the user whose bookmarks are to be listed.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: Bookmark[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Sets viewed portion of an item (for example a video or article) by a user (at a session).
     * If you send a new request with the same (`userId`, `itemId`, `sessionId`), the portion gets updated.
     */
    export class SetViewPortion extends requests.Request {
      /**
       * @param userId - User who viewed a portion of the item
       * @param itemId - Viewed item
       * @param portion - Viewed portion of the item (number between 0.0 (viewed nothing) and 1.0 (viewed full item) ). It should be the actual viewed part of the item, no matter the seeking. For example, if the user seeked immediately to half of the item and then viewed 10% of the item, the `portion` should still be `0.1`.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        portion: number,
        optional?: {
          /** ID of the session in which the user viewed the item. Default is `null` (`None`, `nil`, `NULL` etc., depending on the language). */
          sessionId?: string;
          /** UTC timestamp of the view portion as ISO8601-1 pattern or UTC epoch time. The default value is the current time. */
          timestamp?: string | number;
          /** Sets whether the given user/item should be created if not present in the database. */
          cascadeCreate?: boolean;
          /** If this view portion is based on a recommendation request, `recommId` is the id of the clicked recommendation. */
          recommId?: string;
          /** A dictionary of additional data for the interaction. */
          additionalData?: { [key: string]: unknown };
        }
      );

      userId: string;
      itemId: string;
      portion: number;
      sessionId?: string;
      timestamp?: string | number;
      cascadeCreate?: boolean;
      recommId?: string;
      additionalData?: { [key: string]: unknown };
      protected __response_type: string;

      bodyParameters(): {
        userId: string;
        itemId: string;
        portion: number;
        sessionId?: string;
        timestamp?: string | number;
        cascadeCreate?: boolean;
        recommId?: string;
        additionalData?: { [key: string]: unknown };
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes an existing view portion specified by (`userId`, `itemId`, `sessionId`) from the database.
     */
    export class DeleteViewPortion extends requests.Request {
      /**
       * @param userId - ID of the user who rated the item.
       * @param itemId - ID of the item which was rated.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        itemId: string,
        optional?: {
          /** Identifier of a session. */
          sessionId?: string;
        }
      );

      userId: string;
      itemId: string;
      sessionId?: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
        userId: string;
        itemId: string;
        sessionId?: string;
      };
    }

    /**
     * Lists all the view portions of an item ever submitted by different users.
     */
    export class ListItemViewPortions extends requests.Request {
      /**
       * @param itemId - ID of the item whose view portions are to be listed.
       */
      constructor(
        itemId: string,
      );

      itemId: string;
      protected __response_type: ViewPortion[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Lists all the view portions ever submitted by the given user.
     */
    export class ListUserViewPortions extends requests.Request {
      /**
       * @param userId - ID of the user whose view portions are to be listed.
       */
      constructor(
        userId: string,
      );

      userId: string;
      protected __response_type: ViewPortion[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Based on the user's past interactions (purchases, ratings, etc.) with the items, recommends top-N items that are most likely to be of high value for the given user.
     * The most typical use cases are recommendations on the homepage, in some "Picked just for you" section, or in email.
     * The returned items are sorted by relevance (the first item being the most relevant).
     * Besides the recommended items, also a unique `recommId` is returned in the response. It can be used to:
     * - Let Recombee know that this recommendation was successful (e.g., user clicked one of the recommended items). See [Reported metrics](https://docs.recombee.com/admin_ui#reported-metrics).
     * - Get subsequent recommended items when the user scrolls down (*infinite scroll*) or goes to the next page. See [Recommend Next Items](https://docs.recombee.com/api#recommend-next-items).
     * It is also possible to use POST HTTP method (for example in the case of a very long ReQL filter) - query parameters then become body parameters.
     */
    export class RecommendItemsToUser extends requests.Request {
      /**
       * @param userId - ID of the user for whom personalized recommendations are to be generated.
       * @param count - Number of items to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** With `returnProperties=true`, property values of the recommended items are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended items to the user.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended items based on the values of their attributes. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some items based on the values of their attributes. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** **Expert option:** Real number from [0.0, 1.0], which determines how mutually dissimilar the recommended items should be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification. */
          diversity?: number;
          /** **Expert option:** Specifies the threshold of how relevant must the recommended items be to the user. Possible values one of: "low", "medium", "high". The default value is "low", meaning that the system attempts to recommend a number of items equal to *count* at any cost. If there is not enough data (such as interactions or item properties), this may even lead to bestseller-based recommendations to be appended to reach the full *count*. This behavior may be suppressed by using "medium" or "high" values. In such a case, the system only recommends items of at least the requested relevance and may return less than *count* items when there is not enough data to fulfill it. */
          minRelevance?: string;
          /** **Expert option:** If your users browse the system in real-time, it may easily happen that you wish to offer them recommendations multiple times. Here comes the question: how much should the recommendations change? Should they remain the same, or should they rotate? Recombee API allows you to control this per request in a backward fashion. You may penalize an item for being recommended in the near past. For the specific user, `rotationRate=1` means maximal rotation, `rotationRate=0` means absolutely no rotation. You may also use, for example, `rotationRate=0.2` for only slight rotation of recommended items. Default: `0`. */
          rotationRate?: number;
          /** **Expert option:** Taking *rotationRate* into account, specifies how long it takes for an item to recover from the penalization. For example, `rotationTime=7200.0` means that items recommended less than 2 hours ago are penalized. Default: `7200.0`. */
          rotationTime?: number;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      userId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      returnProperties?: boolean;
      includedProperties?: string[];
      filter?: string;
      booster?: string;
      logic?: string | object;
      diversity?: number;
      minRelevance?: string;
      rotationRate?: number;
      rotationTime?: number;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        returnProperties?: boolean;
        includedProperties?: string[];
        filter?: string;
        booster?: string;
        logic?: string | object;
        diversity?: number;
        minRelevance?: string;
        rotationRate?: number;
        rotationTime?: number;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Recommends a set of items that are somehow related to one given item, *X*. A typical scenario is when the user *A* is viewing *X*. Then you may display items to the user that he might also be interested in. Recommend items to item request gives you Top-N such items, optionally taking the target user *A* into account.
     * The returned items are sorted by relevance (the first item being the most relevant).
     * Besides the recommended items, also a unique `recommId` is returned in the response. It can be used to:
     * - Let Recombee know that this recommendation was successful (e.g., user clicked one of the recommended items). See [Reported metrics](https://docs.recombee.com/admin_ui#reported-metrics).
     * - Get subsequent recommended items when the user scrolls down (*infinite scroll*) or goes to the next page. See [Recommend Next Items](https://docs.recombee.com/api#recommend-next-items).
     * It is also possible to use POST HTTP method (for example in the case of a very long ReQL filter) - query parameters then become body parameters.
     */
    export class RecommendItemsToItem extends requests.Request {
      /**
       * @param itemId - ID of the item for which the recommendations are to be generated.
       * @param targetUserId - ID of the user who will see the recommendations.
       * Specifying the *targetUserId* is beneficial because:
       * * It makes the recommendations personalized
       * * Allows the calculation of Actions and Conversions
       *   in the graphical user interface,
       *   as Recombee can pair the user who got recommendations
       *   and who afterward viewed/purchased an item.
       * If you insist on not specifying the user, pass `null`
       * (`None`, `nil`, `NULL` etc., depending on the language) to *targetUserId*.
       * Do not create some special dummy user for getting recommendations,
       * as it could mislead the recommendation models,
       * and result in wrong recommendations.
       * For anonymous/unregistered users, it is possible to use, for example, their session ID.
       * @param count - Number of items to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        itemId: string,
        targetUserId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If an item of the given *itemId* or user of the given *targetUserId* doesn't exist in the database, it creates the missing entity/entities and returns some (non-personalized) recommendations. This allows, for example, rotations in the following recommendations for the user of the given *targetUserId*, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** With `returnProperties=true`, property values of the recommended items are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended items to the user.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended items based on the values of their attributes. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some items based on the values of their attributes. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** **Expert option:** If *targetUserId* parameter is present, the recommendations are biased towards the given user. Using *userImpact*, you may control this bias. For an extreme case of `userImpact=0.0`, the interactions made by the user are not taken into account at all (with the exception of history-based blacklisting), for `userImpact=1.0`, you'll get a user-based recommendation. The default value is `0`. */
          userImpact?: number;
          /** **Expert option:** Real number from [0.0, 1.0], which determines how mutually dissimilar the recommended items should be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification. */
          diversity?: number;
          /** **Expert option:** If the *targetUserId* is provided:  Specifies the threshold of how relevant must the recommended items be to the user. Possible values one of: "low", "medium", "high". The default value is "low", meaning that the system attempts to recommend a number of items equal to *count* at any cost. If there is not enough data (such as interactions or item properties), this may even lead to bestseller-based recommendations being appended to reach the full *count*. This behavior may be suppressed by using "medium" or "high" values. In such case, the system only recommends items of at least the requested relevance and may return less than *count* items when there is not enough data to fulfill it. */
          minRelevance?: string;
          /** **Expert option:** If the *targetUserId* is provided: If your users browse the system in real-time, it may easily happen that you wish to offer them recommendations multiple times. Here comes the question: how much should the recommendations change? Should they remain the same, or should they rotate? Recombee API allows you to control this per request in a backward fashion. You may penalize an item for being recommended in the near past. For the specific user, `rotationRate=1` means maximal rotation, `rotationRate=0` means absolutely no rotation. You may also use, for example, `rotationRate=0.2` for only slight rotation of recommended items. */
          rotationRate?: number;
          /** **Expert option:** If the *targetUserId* is provided: Taking *rotationRate* into account, specifies how long it takes for an item to recover from the penalization. For example, `rotationTime=7200.0` means that items recommended less than 2 hours ago are penalized. */
          rotationTime?: number;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      itemId: string;
      targetUserId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      returnProperties?: boolean;
      includedProperties?: string[];
      filter?: string;
      booster?: string;
      logic?: string | object;
      userImpact?: number;
      diversity?: number;
      minRelevance?: string;
      rotationRate?: number;
      rotationTime?: number;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        targetUserId: string;
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        returnProperties?: boolean;
        includedProperties?: string[];
        filter?: string;
        booster?: string;
        logic?: string | object;
        userImpact?: number;
        diversity?: number;
        minRelevance?: string;
        rotationRate?: number;
        rotationTime?: number;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Recommends Items that are the most relevant to a particular Segment from a context [Segmentation](https://docs.recombee.com/segmentations).
     * Based on the used Segmentation, this endpoint can be used for example for:
     * - Recommending articles related to a particular topic
     * - Recommending songs belonging to a particular genre
     * - Recommending products produced by a particular brand
     * You need to set the used context Segmentation in the Admin UI in the [Scenario settings](https://docs.recombee.com/scenarios) prior to using this endpoint.
     * The returned items are sorted by relevance (the first item being the most relevant).
     * It is also possible to use the POST HTTP method (for example, in the case of a very long ReQL filter) — query parameters then become body parameters.
     */
    export class RecommendItemsToItemSegment extends requests.Request {
      /**
       * @param contextSegmentId - ID of the segment from `contextSegmentationId` for which the recommendations are to be generated.
       * @param targetUserId - ID of the user who will see the recommendations.
       * Specifying the *targetUserId* is beneficial because:
       * * It makes the recommendations personalized
       * * Allows the calculation of Actions and Conversions
       *   in the graphical user interface,
       *   as Recombee can pair the user who got recommendations
       *   and who afterward viewed/purchased an item.
       * If you insist on not specifying the user, pass `null`
       * (`None`, `nil`, `NULL` etc., depending on the language) to *targetUserId*.
       * Do not create some special dummy user for getting recommendations,
       * as it could mislead the recommendation models,
       * and result in wrong recommendations.
       * For anonymous/unregistered users, it is possible to use, for example, their session ID.
       * @param count - Number of items to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        contextSegmentId: string,
        targetUserId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If a user of the given *targetUserId* doesn't exist in the database, it creates this user and returns some (non-personalized) recommendations. This allows, for example, rotations in the following recommendations for the user of the given *targetUserId*, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** With `returnProperties=true`, property values of the recommended items are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended items to the user.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended items based on the values of their attributes. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some items based on the values of their attributes. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** **Expert option:** If the *targetUserId* is provided:  Specifies the threshold of how relevant must the recommended items be to the user. Possible values one of: "low", "medium", "high". The default value is "low", meaning that the system attempts to recommend a number of items equal to *count* at any cost. If there is not enough data (such as interactions or item properties), this may even lead to bestseller-based recommendations being appended to reach the full *count*. This behavior may be suppressed by using "medium" or "high" values. In such case, the system only recommends items of at least the requested relevance and may return less than *count* items when there is not enough data to fulfill it. */
          minRelevance?: string;
          /** **Expert option:** If the *targetUserId* is provided: If your users browse the system in real-time, it may easily happen that you wish to offer them recommendations multiple times. Here comes the question: how much should the recommendations change? Should they remain the same, or should they rotate? Recombee API allows you to control this per request in a backward fashion. You may penalize an item for being recommended in the near past. For the specific user, `rotationRate=1` means maximal rotation, `rotationRate=0` means absolutely no rotation. You may also use, for example, `rotationRate=0.2` for only slight rotation of recommended items. */
          rotationRate?: number;
          /** **Expert option:** If the *targetUserId* is provided: Taking *rotationRate* into account, specifies how long it takes for an item to recover from the penalization. For example, `rotationTime=7200.0` means that items recommended less than 2 hours ago are penalized. */
          rotationTime?: number;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      contextSegmentId: string;
      targetUserId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      returnProperties?: boolean;
      includedProperties?: string[];
      filter?: string;
      booster?: string;
      logic?: string | object;
      minRelevance?: string;
      rotationRate?: number;
      rotationTime?: number;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        contextSegmentId: string;
        targetUserId: string;
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        returnProperties?: boolean;
        includedProperties?: string[];
        filter?: string;
        booster?: string;
        logic?: string | object;
        minRelevance?: string;
        rotationRate?: number;
        rotationTime?: number;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Returns items that shall be shown to a user as next recommendations when the user e.g. scrolls the page down (*infinite scroll*) or goes to the next page.
     * It accepts `recommId` of a base recommendation request (e.g., request from the first page) and the number of items that shall be returned (`count`).
     * The base request can be one of:
     *   - [Recommend Items to Item](https://docs.recombee.com/api#recommend-items-to-item)
     *   - [Recommend Items to User](https://docs.recombee.com/api#recommend-items-to-user)
     *   - [Recommend Items to Item Segment](https://docs.recombee.com/api#recommend-items-to-item-segment)
     *   - [Search Items](https://docs.recombee.com/api#search-items)
     * All the other parameters are inherited from the base request.
     * *Recommend next items* can be called many times for a single `recommId` and each call returns different (previously not recommended) items.
     * The number of *Recommend next items* calls performed so far is returned in the `numberNextRecommsCalls` field.
     * *Recommend next items* can be requested up to 30 minutes after the base request or a previous *Recommend next items* call.
     * For billing purposes, each call to *Recommend next items* is counted as a separate recommendation request.
     */
    export class RecommendNextItems extends requests.Request {
      /**
       * @param recommId - ID of the base recommendation request for which next recommendations should be returned
       * @param count - Number of items to be recommended
       */
      constructor(
        recommId: string,
        count: number,
      );

      recommId: string;
      count: number;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        count: number;
      };

      queryParameters(): {
      };
    }

    /**
     * Gets users similar to the given user, based on the user's past interactions (purchases, ratings, etc.) and values of properties.
     * It is also possible to use POST HTTP method (for example in the case of a very long ReQL filter) - query parameters then become body parameters.
     * The returned users are sorted by similarity (the first user being the most similar).
     */
    export class RecommendUsersToUser extends requests.Request {
      /**
       * @param userId - User to whom we find similar users
       * @param count - Number of users to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** With `returnProperties=true`, property values of the recommended users are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended users.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended users based on the values of their attributes. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some users based on the values of their attributes. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** **Expert option:** Real number from [0.0, 1.0], which determines how mutually dissimilar the recommended users should be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification. */
          diversity?: number;
          /** **Expert option:** Specifies the threshold of how relevant must the recommended users be. Possible values one of: "low", "medium", "high". */
          minRelevance?: string;
          /** **Expert option:** If your users browse the system in real-time, it may easily happen that you wish to offer them recommendations multiple times. Here comes the question: how much should the recommendations change? Should they remain the same, or should they rotate? Recombee API allows you to control this per request in a backward fashion. You may penalize a user for being recommended in the near past. For the specific user, `rotationRate=1` means maximal rotation, `rotationRate=0` means absolutely no rotation. You may also use, for example, `rotationRate=0.2` for only slight rotation of recommended users. */
          rotationRate?: number;
          /** **Expert option:** Taking *rotationRate* into account, specifies how long it takes for a user to recover from the penalization. For example, `rotationTime=7200.0` means that users recommended less than 2 hours ago are penalized. */
          rotationTime?: number;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      userId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      returnProperties?: boolean;
      includedProperties?: string[];
      filter?: string;
      booster?: string;
      logic?: string | object;
      diversity?: number;
      minRelevance?: string;
      rotationRate?: number;
      rotationTime?: number;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        returnProperties?: boolean;
        includedProperties?: string[];
        filter?: string;
        booster?: string;
        logic?: string | object;
        diversity?: number;
        minRelevance?: string;
        rotationRate?: number;
        rotationTime?: number;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Recommends users that are likely to be interested in the given item.
     * It is also possible to use POST HTTP method (for example in the case of a very long ReQL filter) - query parameters then become body parameters.
     * The returned users are sorted by predicted interest in the item (the first user being the most interested).
     */
    export class RecommendUsersToItem extends requests.Request {
      /**
       * @param itemId - ID of the item for which the recommendations are to be generated.
       * @param count - Number of users to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        itemId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If an item of the given *itemId* doesn't exist in the database, it creates the missing item. */
          cascadeCreate?: boolean;
          /** With `returnProperties=true`, property values of the recommended users are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended users.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended users based on the values of their attributes. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some users based on the values of their attributes. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** **Expert option:** Real number from [0.0, 1.0], which determines how mutually dissimilar the recommended users should be. The default value is 0.0, i.e., no diversification. Value 1.0 means maximal diversification. */
          diversity?: number;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      itemId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      returnProperties?: boolean;
      includedProperties?: string[];
      filter?: string;
      booster?: string;
      logic?: string | object;
      diversity?: number;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        returnProperties?: boolean;
        includedProperties?: string[];
        filter?: string;
        booster?: string;
        logic?: string | object;
        diversity?: number;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Recommends the top Segments from a [Segmentation](https://docs.recombee.com/segmentations) for a particular user, based on the user's past interactions.
     * Based on the used Segmentation, this endpoint can be used for example for:
     *   - Recommending the top categories for the user
     *   - Recommending the top genres for the user
     *   - Recommending the top brands for the user
     *   - Recommending the top artists for the user
     * You need to set the used Segmentation the Admin UI in the [Scenario settings](https://docs.recombee.com/scenarios) prior to using this endpoint.
     * The returned segments are sorted by relevance (first segment being the most relevant).
     * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
     */
    export class RecommendItemSegmentsToUser extends requests.Request {
      /**
       * @param userId - ID of the user for whom personalized recommendations are to be generated.
       * @param count - Number of item segments to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to filter recommended segments based on the `segmentationId`. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to boost recommendation rate of some segments based on the `segmentationId`. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      userId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      filter?: string;
      booster?: string;
      logic?: string | object;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        filter?: string;
        booster?: string;
        logic?: string | object;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Recommends Segments from a [Segmentation](https://docs.recombee.com/segmentations) that are the most relevant to a particular item.
     * Based on the used Segmentation, this endpoint can be used for example for:
     *   - Recommending the related categories
     *   - Recommending the related genres
     *   - Recommending the related brands
     *   - Recommending the related artists
     * You need to set the used Segmentation the Admin UI in the [Scenario settings](https://docs.recombee.com/scenarios) prior to using this endpoint.
     * The returned segments are sorted by relevance (first segment being the most relevant).
     * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
     */
    export class RecommendItemSegmentsToItem extends requests.Request {
      /**
       * @param itemId - ID of the item for which the recommendations are to be generated.
       * @param targetUserId - ID of the user who will see the recommendations.
       * Specifying the *targetUserId* is beneficial because:
       * * It makes the recommendations personalized
       * * Allows the calculation of Actions and Conversions
       *   in the graphical user interface,
       *   as Recombee can pair the user who got recommendations
       *   and who afterward viewed/purchased an item.
       * If you insist on not specifying the user, pass `null`
       * (`None`, `nil`, `NULL` etc., depending on the language) to *targetUserId*.
       * Do not create some special dummy user for getting recommendations,
       * as it could mislead the recommendation models,
       * and result in wrong recommendations.
       * For anonymous/unregistered users, it is possible to use, for example, their session ID.
       * @param count - Number of item segments to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        itemId: string,
        targetUserId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to filter recommended segments based on the `segmentationId`. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to boost recommendation rate of some segments based on the `segmentationId`. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      itemId: string;
      targetUserId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      filter?: string;
      booster?: string;
      logic?: string | object;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        targetUserId: string;
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        filter?: string;
        booster?: string;
        logic?: string | object;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Recommends Segments from a result [Segmentation](https://docs.recombee.com/segmentations) that are the most relevant to a particular Segment from a context Segmentation.
     * Based on the used Segmentations, this endpoint can be used for example for:
     *   - Recommending the related brands to particular brand
     *   - Recommending the related brands to particular category
     *   - Recommending the related artists to a particular genre (assuming songs are the Items)
     * You need to set the used context and result Segmentation the Admin UI in the [Scenario settings](https://docs.recombee.com/scenarios) prior to using this endpoint.
     * The returned segments are sorted by relevance (first segment being the most relevant).
     * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
     */
    export class RecommendItemSegmentsToItemSegment extends requests.Request {
      /**
       * @param contextSegmentId - ID of the segment from `contextSegmentationId` for which the recommendations are to be generated.
       * @param targetUserId - ID of the user who will see the recommendations.
       * Specifying the *targetUserId* is beneficial because:
       * * It makes the recommendations personalized
       * * Allows the calculation of Actions and Conversions
       *   in the graphical user interface,
       *   as Recombee can pair the user who got recommendations
       *   and who afterward viewed/purchased an item.
       * If you insist on not specifying the user, pass `null`
       * (`None`, `nil`, `NULL` etc., depending on the language) to *targetUserId*.
       * Do not create some special dummy user for getting recommendations,
       * as it could mislead the recommendation models,
       * and result in wrong recommendations.
       * For anonymous/unregistered users, it is possible to use, for example, their session ID.
       * @param count - Number of item segments to be recommended (N for the top-N recommendation).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        contextSegmentId: string,
        targetUserId: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to filter recommended segments based on the `segmentationId`. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to boost recommendation rate of some segments based on the `segmentationId`. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      contextSegmentId: string;
      targetUserId: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      filter?: string;
      booster?: string;
      logic?: string | object;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: RecommendationResponse;

      bodyParameters(): {
        contextSegmentId: string;
        targetUserId: string;
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        filter?: string;
        booster?: string;
        logic?: string | object;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Full-text personalized search. The results are based on the provided `searchQuery` and also on the user's past interactions (purchases, ratings, etc.) with the items (items more suitable for the user are preferred in the results).
     * All the string and set item properties are indexed by the search engine.
     * This endpoint should be used in a search box on your website/app. It can be called multiple times as the user is typing the query in order to get the most viable suggestions based on the current state of the query, or once after submitting the whole query. 
     * The returned items are sorted by relevance (the first item being the most relevant).
     * Besides the recommended items, also a unique `recommId` is returned in the response. It can be used to:
     * - Let Recombee know that this search was successful (e.g., user clicked one of the recommended items). See [Reported metrics](https://docs.recombee.com/admin_ui#reported-metrics).
     * - Get subsequent search results when the user scrolls down or goes to the next page. See [Recommend Next Items](https://docs.recombee.com/api#recommend-next-items).
     * It is also possible to use POST HTTP method (for example in the case of a very long ReQL filter) - query parameters then become body parameters.
     */
    export class SearchItems extends requests.Request {
      /**
       * @param userId - ID of the user for whom personalized search will be performed.
       * @param searchQuery - Search query provided by the user. It is used for the full-text search.
       * @param count - Number of items to be returned (N for the top-N results).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        searchQuery: string,
        count: number,
        optional?: {
          /** Scenario defines a particular search field in your user interface. */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized search results and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** With `returnProperties=true`, property values of the recommended items are returned along with their IDs in a JSON dictionary. The acquired property values can be used to easily display the recommended items to the user.  */
          returnProperties?: boolean;
          /** Allows specifying which properties should be returned when `returnProperties=true` is set. The properties are given as a comma-separated list. */
          includedProperties?: string[];
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to filter recommended items based on the values of their attributes. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression, which allows you to boost the recommendation rate of some items based on the values of their attributes. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      userId: string;
      searchQuery: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      returnProperties?: boolean;
      includedProperties?: string[];
      filter?: string;
      booster?: string;
      logic?: string | object;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: SearchResponse;

      bodyParameters(): {
        searchQuery: string;
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        returnProperties?: boolean;
        includedProperties?: string[];
        filter?: string;
        booster?: string;
        logic?: string | object;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Full-text personalized search that returns Segments from a Segmentation. The results are based on the provided `searchQuery` and also on the user's past interactions (purchases, ratings, etc.).
     * Based on the used Segmentation, this endpoint can be used for example for:
     *   - Searching within categories or brands
     *   - Searching within genres or artists
     * For example if the user is searching for "iPhone" this endpoint can return "cell phones" category.
     * You need to set the used Segmentation the Admin UI in the Scenario settings prior to using this endpoint.
     * The returned segments are sorted by relevance (first segment being the most relevant).
     * It is also possible to use POST HTTP method (for example in case of very long ReQL filter) - query parameters then become body parameters.
     */
    export class SearchItemSegments extends requests.Request {
      /**
       * @param userId - ID of the user for whom personalized search will be performed.
       * @param searchQuery - Search query provided by the user. It is used for the full-text search.
       * @param count - Number of segments to be returned (N for the top-N results).
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        userId: string,
        searchQuery: string,
        count: number,
        optional?: {
          /** Scenario defines a particular application of recommendations. It can be, for example, "homepage", "cart", or "emailing". */
          scenario?: string;
          /** If the user does not exist in the database, returns a list of non-personalized recommendations and creates the user in the database. This allows, for example, rotations in the following recommendations for that user, as the user will be already known to the system. */
          cascadeCreate?: boolean;
          /** Boolean-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to filter recommended segments based on the `segmentationId`. */
          filter?: string;
          /** Number-returning [ReQL](https://docs.recombee.com/reql) expression which allows you to boost recommendation rate of some segments based on the `segmentationId`. */
          booster?: string;
          /** Logic specifies the particular behavior of the recommendation models. You can pick tailored logic for your domain and use case. */
          logic?: string | object;
          /** Dictionary of custom options. */
          expertSettings?: { [key: string]: unknown };
          /** If there is a custom AB-testing running, return the name of the group to which the request belongs. */
          returnAbGroup?: boolean;
        }
      );

      userId: string;
      searchQuery: string;
      count: number;
      scenario?: string;
      cascadeCreate?: boolean;
      filter?: string;
      booster?: string;
      logic?: string | object;
      expertSettings?: { [key: string]: unknown };
      returnAbGroup?: boolean;
      protected __response_type: SearchResponse;

      bodyParameters(): {
        searchQuery: string;
        count: number;
        scenario?: string;
        cascadeCreate?: boolean;
        filter?: string;
        booster?: string;
        logic?: string | object;
        expertSettings?: { [key: string]: unknown };
        returnAbGroup?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a new synonym for the [Search items](https://docs.recombee.com/api#search-items).
     * When the `term` is used in the search query, the `synonym` is also used for the full-text search.
     * Unless `oneWay=true`, it works also in the opposite way (`synonym` -> `term`).
     * An example of a synonym can be `science fiction` for the term `sci-fi`.
     */
    export class AddSearchSynonym extends requests.Request {
      /**
       * @param term - A word to which the `synonym` is specified.
       * @param synonym - A word that should be considered equal to the `term` by the full-text search engine.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        term: string,
        synonym: string,
        optional?: {
          /** If set to `true`, only `term` -> `synonym` is considered. If set to `false`, also `synonym` -> `term` works. */
          oneWay?: boolean;
        }
      );

      term: string;
      synonym: string;
      oneWay?: boolean;
      protected __response_type: SearchSynonym;

      bodyParameters(): {
        term: string;
        synonym: string;
        oneWay?: boolean;
      };

      queryParameters(): {
      };
    }

    /**
     * Gives the list of synonyms defined in the database.
     */
    export class ListSearchSynonyms extends requests.Request {
      /**
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        optional?: {
          /** The number of synonyms to be listed. */
          count?: number;
          /** Specifies the number of synonyms to skip (ordered by `term`). */
          offset?: number;
        }
      );

      count?: number;
      offset?: number;
      protected __response_type: ListSearchSynonymsResponse;

      bodyParameters(): {
      };

      queryParameters(): {
        count?: number;
        offset?: number;
      };
    }

    /**
     * Deletes all synonyms defined in the database.
     */
    export class DeleteAllSearchSynonyms extends requests.Request {
      /**

       */
      constructor(
      );

      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Deletes synonym of the given `id`. This synonym is no longer taken into account in the [Search items](https://docs.recombee.com/api#search-items).
     */
    export class DeleteSearchSynonym extends requests.Request {
      /**
       * @param id - ID of the synonym that should be deleted.
       */
      constructor(
        id: string,
      );

      id: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Creates a Segmentation that splits the items into segments based on values of a particular item property.
     * A segment is created for each unique value of the property.
     * In case of `set` properties, a segment is created for each value in the set. Item belongs to all these segments.
     */
    export class CreatePropertyBasedSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the newly created Segmentation
       * @param sourceType - What type of data should be segmented. Currently only `items` are supported.
       * @param propertyName - Name of the property on which the Segmentation should be based
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        sourceType: string,
        propertyName: string,
        optional?: {
          /** Human-readable name that is shown in the Recombee Admin UI. */
          title?: string;
          /** Description that is shown in the Recombee Admin UI. */
          description?: string;
        }
      );

      segmentationId: string;
      sourceType: string;
      propertyName: string;
      title?: string;
      description?: string;
      protected __response_type: string;

      bodyParameters(): {
        sourceType: string;
        propertyName: string;
        title?: string;
        description?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Updates a Property Based Segmentation
     */
    export class UpdatePropertyBasedSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the updated Segmentation
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        optional?: {
          /** Name of the property on which the Segmentation should be based */
          propertyName?: string;
          /** Human-readable name that is shown in the Recombee Admin UI. */
          title?: string;
          /** Description that is shown in the Recombee Admin UI. */
          description?: string;
        }
      );

      segmentationId: string;
      propertyName?: string;
      title?: string;
      description?: string;
      protected __response_type: string;

      bodyParameters(): {
        propertyName?: string;
        title?: string;
        description?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Segment the items using a [ReQL](https://docs.recombee.com/reql) expression.
     * For each item, the expression should return a set that contains IDs of segments to which the item belongs to.
     */
    export class CreateAutoReqlSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the newly created Segmentation
       * @param sourceType - What type of data should be segmented. Currently only `items` are supported.
       * @param expression - ReQL expression that returns for each item a set with IDs of segments to which the item belongs
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        sourceType: string,
        expression: string,
        optional?: {
          /** Human-readable name that is shown in the Recombee Admin UI. */
          title?: string;
          /** Description that is shown in the Recombee Admin UI. */
          description?: string;
        }
      );

      segmentationId: string;
      sourceType: string;
      expression: string;
      title?: string;
      description?: string;
      protected __response_type: string;

      bodyParameters(): {
        sourceType: string;
        expression: string;
        title?: string;
        description?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Update an existing Segmentation.
     */
    export class UpdateAutoReqlSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the updated Segmentation
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        optional?: {
          /** ReQL expression that returns for each item a set with IDs of segments to which the item belongs */
          expression?: string;
          /** Human-readable name that is shown in the Recombee Admin UI. */
          title?: string;
          /** Description that is shown in the Recombee Admin UI. */
          description?: string;
        }
      );

      segmentationId: string;
      expression?: string;
      title?: string;
      description?: string;
      protected __response_type: string;

      bodyParameters(): {
        expression?: string;
        title?: string;
        description?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Segment the items using multiple [ReQL](https://docs.recombee.com/reql) filters.
     * Use the Add Manual ReQL Items Segment endpoint to create the individual segments.
     */
    export class CreateManualReqlSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the newly created Segmentation
       * @param sourceType - What type of data should be segmented. Currently only `items` are supported.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        sourceType: string,
        optional?: {
          /** Human-readable name that is shown in the Recombee Admin UI. */
          title?: string;
          /** Description that is shown in the Recombee Admin UI. */
          description?: string;
        }
      );

      segmentationId: string;
      sourceType: string;
      title?: string;
      description?: string;
      protected __response_type: string;

      bodyParameters(): {
        sourceType: string;
        title?: string;
        description?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Update an existing Segmentation.
     */
    export class UpdateManualReqlSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the updated Segmentation
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        optional?: {
          /** Human-readable name that is shown in the Recombee Admin UI. */
          title?: string;
          /** Description that is shown in the Recombee Admin UI. */
          description?: string;
        }
      );

      segmentationId: string;
      title?: string;
      description?: string;
      protected __response_type: string;

      bodyParameters(): {
        title?: string;
        description?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Adds a new Segment into a Manual ReQL Segmentation.
     * The new Segment is defined by a [ReQL](https://docs.recombee.com/reql) filter that returns `true` for an item in case that this item belongs to the segment.
     */
    export class AddManualReqlSegment extends requests.Request {
      /**
       * @param segmentationId - ID of the Segmentation to which the new Segment should be added
       * @param segmentId - ID of the newly created Segment
       * @param filter - ReQL filter that returns `true` for items that belong to this Segment. Otherwise returns `false`.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        segmentId: string,
        filter: string,
        optional?: {
          /** Human-readable name of the Segment that is shown in the Recombee Admin UI. */
          title?: string;
        }
      );

      segmentationId: string;
      segmentId: string;
      filter: string;
      title?: string;
      protected __response_type: string;

      bodyParameters(): {
        filter: string;
        title?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Update definition of the Segment.
     */
    export class UpdateManualReqlSegment extends requests.Request {
      /**
       * @param segmentationId - ID of the Segmentation to which the updated Segment belongs
       * @param segmentId - ID of the Segment that will be updated
       * @param filter - ReQL filter that returns `true` for items that belong to this Segment. Otherwise returns `false`.
       * @param optional - Optional parameters given as an object.
       */
      constructor(
        segmentationId: string,
        segmentId: string,
        filter: string,
        optional?: {
          /** Human-readable name of the Segment that is shown in the Recombee Admin UI. */
          title?: string;
        }
      );

      segmentationId: string;
      segmentId: string;
      filter: string;
      title?: string;
      protected __response_type: string;

      bodyParameters(): {
        filter: string;
        title?: string;
      };

      queryParameters(): {
      };
    }

    /**
     * Delete a Segment from a Manual ReQL Segmentation.
     */
    export class DeleteManualReqlSegment extends requests.Request {
      /**
       * @param segmentationId - ID of the Segmentation from which the Segment should be deleted
       * @param segmentId - ID of the Segment that should be deleted
       */
      constructor(
        segmentationId: string,
        segmentId: string,
      );

      segmentationId: string;
      segmentId: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Return all existing items Segmentations.
     */
    export class ListSegmentations extends requests.Request {
      /**
       * @param sourceType - List Segmentations based on a particular type of data. Currently only `items` are supported.
       */
      constructor(
        sourceType: string,
      );

      sourceType: string;
      protected __response_type: ListSegmentationsResponse;

      bodyParameters(): {
      };

      queryParameters(): {
        sourceType: string;
      };
    }

    /**
     * Get existing Segmentation.
     */
    export class GetSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the Segmentation that should be returned
       */
      constructor(
        segmentationId: string,
      );

      segmentationId: string;
      protected __response_type: Segmentation;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Delete existing Segmentation.
     */
    export class DeleteSegmentation extends requests.Request {
      /**
       * @param segmentationId - ID of the Segmentation that should be deleted
       */
      constructor(
        segmentationId: string,
      );

      segmentationId: string;
      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Get all [Scenarios](https://docs.recombee.com/scenarios) of the given database.
     */
    export class ListScenarios extends requests.Request {
      /**

       */
      constructor(
      );

      protected __response_type: Scenario[];

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }

    /**
     * Completely erases all your data, including items, item properties, series, user database, purchases, ratings, detail views, and bookmarks. Make sure the request is never executed in the production environment! Resetting your database is irreversible.
     */
    export class ResetDatabase extends requests.Request {
      /**

       */
      constructor(
      );

      protected __response_type: string;

      bodyParameters(): {
      };

      queryParameters(): {
      };
    }
  }
}
