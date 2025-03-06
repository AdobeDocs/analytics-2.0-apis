---
title: Data Feed API
description: Use Analytics Data Feed API to create, retrieve, and manage data feeds.
---

# Data Feed API

The Analytics 2.0 Data Feed API endpoints provide methods for you to create, retreive, and manage data feeds. It also provides methods for working with column presets associated with report suites. See the [Data Feed overview](https://experienceleague.adobe.com/en/docs/analytics/export/analytics-data-feed/data-feed-overview) for more information regarding Data Feeds. For a full list of Data Feed API parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

This guide provides instructions for the following endpoints:

**Datafeed API**

* GET datafeed: Gets datafeeds for a report suite
* POST datafeed: Creates a datafeed
* GET datafeed: Retrieves a datafeed by ID
* PUT datafeed: Updates a datafeed
* POST datafeed requests search: Searches for datafeed requests
* GET datafeed requests: Retrieves datafeed requests for a report suite and feed ID
* POST datafeed search: Retrieves datafeeds for multiple report suites
* PUT datafeed status: Updates the status of a datafeed

**Manage Datafeeds API**

* GET datafeed redo: Redoes a datafeed request (checks if resend is possible, otherwise reprocesses)
* GET datafeed reprocess: Reprocesses a datafeed request by request ID
* GET datafeed resend: Resends a datafeed request by request ID

**Column Preset API**
  
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

```sh
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

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
  "feedName": "example-feed-For-Doc2",
  "rsid": "example.examplersid",
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

```json
200 OK
```

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## GET datafeed by ID

Use this endpoint to retrieve datafeeds with a specified datafeed ID. To obtain a datafeed ID, use the CJA Cloud Location API.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATAFEED_ID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>
 
 #### Request

```sh
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
  "rsid": "example.examplersid",
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

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/{DATAFEED_ID}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
  "feedName": "example-feed-For-Doc2",
  "rsid": "example.examplersid",
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

A successful response shows a `200 OK` status code.

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## POST datafeed requests search

Use this endpoint to retrieve datafeed requests. This retrieval endpoint utilizes a **POST** method to improve processing effectiveness.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/requests/search`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
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

```sh
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

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/search" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -d '{
      "rsid": "exammplersid1", "examplersid2"
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

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/16756/status?status=hold&loginId=444444"" \
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





## GET datafeed{feedId}{requestId} redo


## GET datafeed{feedId}{requestId} reprocess


## GET datafeed{feedId}{requestId} resend


## POST columnPreset


## GET columnNames all


## GET columnPreset{presetId}


## GET columnPresets
