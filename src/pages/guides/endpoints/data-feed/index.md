---
title: Data Feed API
description: Use Analytics Data Feed API to create, retrieve, and manage data feeds.
---

# Data Feed API

The Analytics 2.0 Data Feed API endpoints provide methods for you to create, retrieve, and manage data feeds. It also provides methods for working with column presets associated with report suites. See the [Data Feed overview](https://experienceleague.adobe.com/en/docs/analytics/export/analytics-data-feed/data-feed-overview) for more information regarding Data Feeds. For a full list of Data Feed API parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

**Datafeed API**

Use the Datafeed API to create, update, or retrieve data feeds and data feed requests. This includes the following endpoints:

* GET datafeed: Gets datafeeds for a report suite
* POST datafeed: Creates a datafeed
* GET datafeed: Retrieves a datafeed by ID
* PUT datafeed: Updates a datafeed
* POST datafeed requests search: Searches for datafeed requests
* GET datafeed requests: Retrieves datafeed requests for a report suite and feed ID
* POST datafeed search: Retrieves datafeeds for multiple report suites
* PUT datafeed status: Updates the status of a datafeed

**Manage Datafeeds API**

Use the Manage Datafeeds API to resend or reprocess datafeed requests. This includes the following endpoints:

* GET datafeed redo: Redoes a datafeed request (checks if resend is possible, otherwise reprocesses)
* GET datafeed reprocess: Reprocesses a datafeed request by request ID
* GET datafeed resend: Resends a datafeed request by request ID

**Column Preset API**

Use the Column Preset API to create or retrieve the column presets used in datafeeds. This includes the following endpoints:
  
* POST columnPreset: Creates a new column preset
* GET columnNames all: Retrieves all available column names
* GET columnPreset by ID: Retrieves a column preset by ID
* GET columnPresets by rsid: Retrieves all column presets accessible by a given report suite ID


## GET datafeed

Use this endpoint to get datafeeds for a report suite.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{REPORT_SUITE_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>
 
#### Request

```curl
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/examplersid" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "data": [
    {
      "feedName": "Example-DF-1",
      "rsid": "example.examplersid",
      "columnPreset": 13280,
      "notes": "default note",
      "dynamicLookups": true,
      "replaceEscapedChars": false,
      "customerVisible": true,
      "metadata": {
        "feedId": 5555,
        "feedType": "standard",
        "feedState": "canceled",
        "timeZone": "US/Mountain",
        "createdBy": "user@example.com",
        "creationDate": "YYYY-MM-DDT18:33:11Z",
        "modifiedBy": "examplename",
        "modificationDate": "YYYY-MM-DDT07:38:08Z"
      },
      "schedule": {
        "startDate": "YYYY-MM-DDT07:00:00Z",
        "endDate": null,
        "interval": "daily",
        "delay": null
      },
      "packaging": {
        "type": "flat",
        "chunkSize": 1024,
        "compression": "gzip",
        "manifest": "manifest-file",
        "noDataManifest": false
      },
      "delivery": {
        "cloudLocationUUID": "99999999-f444-4547-9b8d-899be1111",
        "notificationEmail": [
          "user@example.com"
        ]
      },
      "lateHits": {
        "enabled": false,
        "lookback": null
      }
    },
    {
      "feedName": "DataFeed- Daily",
      "rsid": "example.examplersid",
      "columnPreset": 20235,
      "notes": "default note",
      "dynamicLookups": false,
      "replaceEscapedChars": false,
      "metadata": {
        "feedId": 8556,
        "feedState": "canceled",
        "timeZone": "US/Mountain",
        "createdBy": "user@example.com",
        "creationDate": "YYYY-MM-DDT18:33:11Z",
        "modifiedBy": "user@example.com",
        "modificationDate": "YYYY-MM-DDT18:33:11Z"
      },
      "schedule": {
        "startDate": "YYYY-MM-DDT18:33:11Z",
        "endDate": null,
        "interval": "hourly",
        "delay": null
      },
      "packaging": {
        "type": "flat",
        "chunkSize": 1024,
        "compression": "zip",
        "manifest": "fin-file",
        "noDataManifest": false
      },
      "delivery": {
        "cloudLocationUUID": null,
        "notificationEmail": [
          "user@example.com"
        ]
      },
      "lateHits": {
        "enabled": false,
        "lookback": null
      }
    }
  ]
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## POST datafeed

Use this endpoint to create a datafeed.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
  "feedName": "example-feed-For-Doc2",
  "rsid": "examplersid",
  "columnPreset": 1,
  "dynamicLookups": false,
  "replaceEscapedChars": false,
  "customerVisible": true,
  "metadata": {
    "feedId": 11111,
    "feedType": "df2",
    "feedState": "active",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-MM-DDT18:33:11Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-MM-DDT18:33:11Z"
  },
  "schedule": {
    "startDate": "YYYY-MM-DDT18:33:11Z",
    "endDate": "YYYY-MM-DDT18:33:11Z",
    "interval": "hourly",
    "delay": 100
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 4096,
    "compression": "gzip",
    "manifest": "manifest-file",
    "noDataManifest": true
  },
  "delivery": {
    "cloudLocationUUID": "xxxxxxxx-d8a5-4771-98ca-2bfcxxxxxxxx",
    "notificationEmail": [
      "test@example.com"
    ]
  },
  "lateHits": {
    "enabled": true,
    "lookback": 1000
  }
}'
```

#### Response

A successful request returns the `200 OK` response.

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## GET datafeed by ID

Use this endpoint to retrieve datafeeds with a specified datafeed ID. To obtain a datafeed ID, use the CJA Cloud Location API.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATAFEED_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>
 
#### Request

```curl
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATAFEED_ID}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "feedName": "example-feed-For-Doc2",
  "rsid": "examplersid",
  "columnPreset": 1,
  "dynamicLookups": true,
  "replaceEscapedChars": true,
  "customerVisible": true,
  "metadata": {
    "feedId": 16876,
    "feedType": "df2",
    "feedState": "active",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-MM-DDT18:33:11Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-MM-DDT18:33:11Z"
  },
  "schedule": {
    "startDate": "YYYY-MM-DDT18:33:11Z",
    "endDate": "YYYY-MM-DDT18:33:11Z",
    "interval": "hourly",
    "delay": 0
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 4096,
    "compression": "gzip",
    "manifest": "no-file",
    "noDataManifest": true
  },
  "delivery": {
    "cloudLocationUUID": "e7afbd0xxxxxx-4771-98ca-2bxxxxxxxxxx",
    "notificationEmail": [
      "test@example.com"
    ]
  },
  "lateHits": {
    "enabled": true,
    "lookback": 1000
  }
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## PUT datafeed by ID

Use this endpoint to update a datafeed.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATAFEED_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATAFEED_ID}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
  "feedName": "example-feed-For-Doc2",
  "rsid": "examplersid",
  "columnPreset": 1,
  "dynamicLookups": true,
  "replaceEscapedChars": true,
  "customerVisible": true,
  "metadata": {
    "feedId": 16876,
    "feedType": "df2",
    "feedState": "active",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-MM-DDT07:00:00Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-MM-DDT07:00:00Z"
  },
  "schedule": {
    "startDate": "YYYY-MM-DDT07:00:00Z",
    "endDate": "YYYY-MM-DDT07:00:00Z",
    "interval": "hourly",
    "delay": 0
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 4096,
    "compression": "gzip",
    "manifest": "no-file",
    "noDataManifest": true
  },
  "delivery": {
    "cloudLocationUUID": "e7xxxxxx-d8a5-4771-98ca-2bfcxxxxxxxx",
    "notificationEmail": [
      "test@example.com"
    ]
  },
  "lateHits": {
    "enabled": true,
    "lookback": 1000
  }
}'
```

#### Response

A successful request returns the `200 OK` response.

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## POST datafeed requests search

Use this endpoint to retrieve datafeed requests. This retrieval endpoint utilizes a **POST** method to improve processing effectiveness.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/requests/search`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/requests/search" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
      "rsid": "exammplersid",
      "feedId": 16756,
      "limit": 2,
      "offset": 0,
      "sortOrder": desc,
      "orderBy": "req_period_begin_utc",
      "minRequestPeriodStartDate": "YYYY-02-22T00:00:00Z",
      "maxRequestPeriodStart": "YYYY-02-28T00:00:00Z"
      }'
```

#### Response

```json
    {
    "limit": 5,
    "offset": 0,
    "data": [
      {
        "rsid": "example.exammplersid",
        "feedId": 16756,
        "feedName": "Dfeed example",
        "requestId": 20000001,
        "submittedDate": "YYYY-MM-DDT07:00:00Z",
        "runCount": 1,
        "runAttempt": "YYYY-MM-DDT07:00:00Z",
        "completeDate": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodBegin": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodEnd": "YYYY-MM-DDT07:00:00Z",
        "requestState": "error",
        "errorCode": 300,
        "errorMsg": "Delivery Error",
        "timezone": "US/Mountain"
      },
      {
        "rsid": "example.examplersid",
        "feedId": 16756,
        "feedName": "Dfeed example",
        "requestId": 20000002,
        "submittedDate": "YYYY-MM-DDT07:00:00Z",
        "runCount": 1,
        "runAttempt": "YYYY-MM-DDT07:00:00Z",
        "completeDate": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodBegin": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodEnd": "YYYY-MM-DDT07:00:00Z",
        "requestState": "error",
        "errorCode": 300,
        "errorMsg": "Delivery Error",
        "timezone": "US/Mountain"
      }
    ]
  }
```


### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## GET datafeed requests

Use this endpoint to retrieves datafeed requests with a specified report suite ID and datafeed ID. If no dates are specified with this request, it returns the most recent.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/requests/{REPORT_SUITE_ID}/{DATA_FEED_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/requests?rsid=examplersid&feedId=16756&minRequestPeriodStartDate=YYYY-02-22T00%3A00%3A00Z&maxRequestPeriodStartDate=YYYY-02-28T00%3A00%3A00Z&limit=2&offset=0" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

  ```json
  {
  "limit": 2,
  "offset": 0,
  "data": [
    {
      "rsid": "examplersid",
      "feedId": 16756,
      "feedName": "DF2 feed",
      "requestId": 20055555,
      "submittedDate": "YYYY-02-25T22:05:23Z",
      "runCount": 1,
      "runAttempt": "YYYY-02-25T22:05:23Z",
      "completeDate": "YYYY-02-25T22:17:38Z",
      "requestPeriodBegin": "YYYY-02-25T21:00:00Z",
      "requestPeriodEnd": "YYYY-02-25T22:00:00Z",
      "requestState": "error",
      "errorCode": 300,
      "errorMsg": "Delivery Error",
      "timezone": "US/Mountain"
    },
    {
      "rsid": "examplersid",
      "feedId": 16756,
      "feedName": "DF2 feed",
      "requestId": 20055556,
      "submittedDate": "YYYY-02-25T21:05:23Z",
      "runCount": 1,
      "runAttempt": "YYYY-02-25T21:05:23Z",
      "completeDate": "YYYY-02-25T21:17:34Z",
      "requestPeriodBegin": "YYYY-02-25T20:00:00Z",
      "requestPeriodEnd": "YYYY-02-25T21:00:00Z",
      "requestState": "error",
      "errorCode": 300,
      "errorMsg": "Delivery Error",
      "timezone": "US/Mountain"
    }
  ]
}
```


## Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).


## POST datafeed search

Use this endpoint to retrieve datafeed requests for an array of report suites.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/search`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/search" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
      "rsid": ["exammplersid1", "examplersid2"]
      "feedId": 16756,
      "limit": 2,
      "offset": 0,
      "sortOrder": desc,
      "orderBy": "req_period_begin_utc",
      "minRequestPeriodStartDate": "YYYY-02-22T00:00:00Z",
      "maxRequestPeriodStart": "YYYY-02-28T00:00:00Z"
      }'
  ```

#### Response

```json
    {
    "limit": 5,
    "offset": 0,
    "data": [
      {
        "rsid": "exammplersid1",
        "feedId": 16756,
        "feedName": "Dfeed example",
        "requestId": 20000001,
        "submittedDate": "YYYY-MM-DDT07:00:00Z",
        "runCount": 1,
        "runAttempt": "YYYY-MM-DDT07:00:00Z",
        "completeDate": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodBegin": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodEnd": "YYYY-MM-DDT07:00:00Z",
        "requestState": "error",
        "errorCode": 300,
        "errorMsg": "Delivery Error",
        "timezone": "US/Mountain"
      },
      {
        "rsid": "example.examplersid2",
        "feedId": 16756,
        "feedName": "Dfeed example",
        "requestId": 20000002,
        "submittedDate": "YYYY-MM-DDT07:00:00Z",
        "runCount": 1,
        "runAttempt": "YYYY-MM-DDT07:00:00Z",
        "completeDate": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodBegin": "YYYY-MM-DDT07:00:00Z",
        "requestPeriodEnd": "YYYY-MM-DDT07:00:00Z",
        "requestState": "error",
        "errorCode": 300,
        "errorMsg": "Delivery Error",
        "timezone": "US/Mountain"
      }
    ]
  }
```

## Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).


## PUT datafeed status by datafeed ID

Use this endpoint to update a datafeed status. Valid `status` values include `active`, `canceled`, or `hold`.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATA_FEED_ID}/{STATUS}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/16756/status?status=hold&loginId=444444" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  ```

#### Response

```json
{
  "feedName": "DF2 feed",
  "rsid": "examplersid",
  "columnPreset": 13280,
  "notes": "DF2 feed for test",
  "dynamicLookups": false,
  "replaceEscapedChars": false,
  "metadata": {
    "feedId": 16756,
    "feedState": "hold",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-11-06T18:05:34Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-12-05T16:20:31Z"
  },
  "schedule": {
    "startDate": "YYYY-01-01T00:00:00Z",
    "endDate": null,
    "interval": "hourly",
    "delay": null
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 2048,
    "compression": "gzip",
    "manifest": "manifest-file",
    "noDataManifest": false
  },
  "delivery": {
    "cloudLocationUUID": "b21a89e3-ee92-4a67-af34-4a21711cc36b",
    "notificationEmail": [
      "user@example.com"
    ]
  },
  "lateHits": {
    "enabled": false,
    "lookback": null
  }
}
```

## Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## PUT datafeed redo

Use this endpoint to resend or reprocess a datafeed request by specifying a datafeed ID and a datafeed request ID.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATA_FEED_ID}/{REQUEST_ID}/redo`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/16756/20055556/redo" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  ```

#### Response

```json
{
  "feedName": "DF2 feed",
  "rsid": "examplersid",
  "columnPreset": 13280,
  "notes": "DF2 feed",
  "dynamicLookups": false,
  "replaceEscapedChars": false,
  "metadata": {
    "feedId": 16756,
    "feedState": "active",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-11-06T18:05:34Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-12-05T16:20:31Z"
  },
  "schedule": {
    "startDate": "YYYY-01-01T00:00:00Z",
    "endDate": null,
    "interval": "hourly",
    "delay": null
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 2048,
    "compression": "gzip",
    "manifest": "manifest-file",
    "noDataManifest": false
  },
  "delivery": {
    "cloudLocationUUID": "b2666666-ee92-4444-af22-4a2188888888",
    "notificationEmail": [
      "user@example.com"
    ]
  },
  "lateHits": {
    "enabled": false,
    "lookback": null
  }
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).


## PUT datafeed reprocess

Use this endpoint to reprocess a datafeed request by specifying a datafeed ID and a datafeed request ID.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATA_FEED_ID}/{REQUEST_ID}/reprocess`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/16756/20055556/reprocess" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  ```

#### Response

```json
{
  "feedName": "DF2 feed",
  "rsid": "examplersid",
  "columnPreset": 13280,
  "notes": "DF2 feed",
  "dynamicLookups": false,
  "replaceEscapedChars": false,
  "metadata": {
    "feedId": 16756,
    "feedState": "active",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-11-06T18:05:34Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-12-05T16:20:31Z"
  },
  "schedule": {
    "startDate": "YYYY-01-01T00:00:00Z",
    "endDate": null,
    "interval": "hourly",
    "delay": null
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 2048,
    "compression": "gzip",
    "manifest": "manifest-file",
    "noDataManifest": false
  },
  "delivery": {
    "cloudLocationUUID": "b2666666-ee92-4444-af22-4a2188888888",
    "notificationEmail": [
      "user@example.com"
    ]
  },
  "lateHits": {
    "enabled": false,
    "lookback": null
  }
}
```

## Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## PUT datafeed resend

Use this endpoint to resend a datafeed request by specifying a datafeed ID and a datafeed request ID.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATA_FEED_ID}/{REQUEST_ID}/resend`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/16756/20055556/resend" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  ```


#### Response

```json
{
  "feedName": "DF2 feed",
  "rsid": "examplersid",
  "columnPreset": 13280,
  "notes": "DF2 feed",
  "dynamicLookups": false,
  "replaceEscapedChars": false,
  "metadata": {
    "feedId": 16756,
    "feedState": "active",
    "timeZone": "US/Mountain",
    "createdBy": "datafeeds",
    "creationDate": "YYYY-11-06T18:05:34Z",
    "modifiedBy": "datafeeds",
    "modificationDate": "YYYY-12-05T16:20:31Z"
  },
  "schedule": {
    "startDate": "YYYY-01-01T00:00:00Z",
    "endDate": null,
    "interval": "hourly",
    "delay": null
  },
  "packaging": {
    "type": "chunked",
    "chunkSize": 2048,
    "compression": "gzip",
    "manifest": "manifest-file",
    "noDataManifest": false
  },
  "delivery": {
    "cloudLocationUUID": "b2666666-ee92-4444-af22-4a2188888888",
    "notificationEmail": [
      "user@example.com"
    ]
  },
  "lateHits": {
    "enabled": false,
    "lookback": null
  }
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## POST columnPreset

Use this endpoint to create a column preset for a datafeed. This feature defines the names and number of columns for the specified datafeed. 

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnPreset`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnPreset/?rsid=examplersid" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
      "name":"Example-preset",
      "columnNames":[
        {"name":"post_sociallatlong"},
        {"name":"browser"},
        {"name":"channel"}]
      }'
```

#### Response

```json
{
  "columnPresetId": 22566,
  "name": "Example-preset",
  "columnNames": [
    {
      "name": "post_sociallatlong"
    },
    {
      "name": "browser"
    },
    {
      "name": "channel"
    }
  ]
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).


## GET all column names

Use this endpoint to retrieve all column names. 

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnNames/all`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnNames/all" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "data": [
    "accept_language",
    "adclassificationcreative",
    "adload",
    "aemassetid",
    "aemassetsource",
    "aemclickedassetid",
    "amo_cid",
    "amo_ef_id",
    "browser",
    "browser_height",
    "browser_width",
    "campaign",
    "carrier",
    "channel",
    "ch_hdr",
    "visid_new",
    "visid_timestamp",
    "visid_type",
    "visit_keywords",
    "visit_num",
    "visit_page_num",
    "visit_referrer",
    "visit_ref_domain",
    "visit_ref_type",
    "visit_search_engine",
    "visit_start_pagename",
    "visit_start_page_url",
    "visit_start_time_gmt",
    "weekly_visitor",
    "yearly_visitor",
    "zip"
  ]
}
```

## Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## GET column preset by preset ID

Use this endpoint to retrieve a column preset by preset ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnPreset/{COLUMN_PRESET_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnPreset/22566
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "columnPresetId": 22566,
  "name": "Example-preset",
  "columnNames": [
    {
      "name": "post_sociallatlong"
    },
    {
      "name": "browser"
    },
    {
      "name": "channel"
    }
  ]
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).


## GET column presets by report suite ID

Use this endpoint to retrieve a column preset by report suite ID. The report suite ID is passed as a query parameter.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnPresets/{REPORT_SUITE_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/columnPresets?rsid=examplersid
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "total": 1103,
  "columnPresets": [
    {
      "columnPresetId": 6,
      "name": "All Columns (July 20XX)"
    },
    {
      "columnPresetId": 351,
      "name": "All Columns (Oct 20XX)"
    },
    {
      "columnPresetId": 13280,
      "name": "All Columns Premium (August 20XX)"
    }
  ]
}
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

| HTTP code | Meaning | Description |
| --- | --- | --- |
| 200 | Success | The request is successful. |
| 400 | Bad Request | The request was improperly constructed, missing key information, and/or contained incorrect syntax. This error code could indicate a problem such as a missing required parameter or the supplied data did not pass validation. |
| 401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. Similarly, you may have attempted to access an object that requires administrator permissions. |
| 403 | Forbidden | The resource was found, but you do not have the right credentials to view it. You may not have the required permissions to access or edit the resource for reasons not applicable to status code 401. |
| 404 | Not found | The requested resource could not be found on the server. The resource may have been deleted, or the requested path was entered incorrectly. |
| 500 | Internal server errors | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. Try your request again in a few minutes, and contact your administrator if the problem persists. |

