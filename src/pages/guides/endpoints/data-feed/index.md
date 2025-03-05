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
  -d "{
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
}
```
#### Response

A successful response shows a `200 OK` status code.

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## GET datafeed by ID

Use this endpoint to retrieve datafeeds by a datafeed ID. To obtain a datafeed ID, use the CJA Cloud Location API.

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
  -d "{
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
}
```

#### Response

A successful response shows a `200 OK` status code.

### Request and response parameters

For a full list of parameters, see the [Data Feed API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Feed%20APIs).

## POST datafeed requests search











## GET datafeed requests


## POST datafeed search


## PUT datafeed{feedId} status


## GET datafeed{feedId}{requestId} redo


## GET datafeed{feedId}{requestId} reprocess


## GET datafeed{feedId}{requestId} resend


## POST columnPreset


## GET columnNames all


## GET columnPreset{presetId}


## GET columnPresets
---------
## GET datafeed

Use this endpoint to get datafeeds for a report suite.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## POST datafeed

Use this endpoint to create a datafeed.

POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## GET datafeed{feedId}

Use this endpoint to retrieve a datafeed by ID.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed{feedId}

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## PUT datafeed{feedId}

Use this endpoint to update a datafeed.

PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed{feedId}

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## GET datafeed requests

Use this endpoint to retrieve datafeed requests for a report suite and feed ID.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed/requests

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## GET datafeed suite{rsid}

Use this endpoint to retrieve datafeeds for a report suite.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed/suite{rsid}

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## POST datafeed search

Use this endpoint to retrieve datafeeds for multiple report suites.

POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed/search

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## PUT datafeed{feedId} status

Use this endpoint to update the status of a datafeed.

PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed{feedId}/status

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## GET datafeed{feedId}{requestId} redo

Use this endpoint to redo a datafeed request (checks if resend is possible, otherwise reprocesses).

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed{feedId}/{requestId}/redo

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## POST columnPreset

Use this endpoint to create a new column preset.

POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/columnPreset

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## GET columnNames all

Use this endpoint to retrieve all available column names.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/columnNames/all

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

## GET columnPreset{presetId}

Use this endpoint to retrieve a column preset by ID.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/columnPreset{presetId}

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
| ---- | -------- | ---- | ----------- |

---

## **Next Steps**














------------


## GET datafeed

Use this endpoint to get datafeeds for a report suite.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for that request.

#### Request example details

#### Response example details

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
|------|----------|------|-------------|

### Response parameters

This endpoint includes the following response parameters:

| NAME | TYPE | DESCRIPTION |
|------|------|-------------|

---

## POST datafeed

Use this endpoint to create a datafeed.

POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for that request.

#### Request example details

#### Response example details

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
|------|----------|------|-------------|

### Response parameters

This endpoint includes the following response parameters:

| NAME | TYPE | DESCRIPTION |
|------|------|-------------|

---

## GET datafeed{feedId}

Use this endpoint to retrieve a datafeed by ID.

GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed{feedId}

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for that request.

#### Request example details

#### Response example details

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
|------|----------|------|-------------|

### Response parameters

This endpoint includes the following response parameters:

| NAME | TYPE | DESCRIPTION |
|------|------|-------------|

---

## PUT datafeed{feedId}

Use this endpoint to update a datafeed.

PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed{feedId}

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for that request.

#### Request example details

#### Response example details

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
|------|----------|------|-------------|

### Response parameters

This endpoint includes the following response parameters:

| NAME | TYPE | DESCRIPTION |
|------|------|-------------|

---

## POST datafeed requests search

Use this endpoint to search for datafeed requests.

POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datafeed/requests/search

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for that request.

#### Request example details

#### Response example details

### Request parameters

This endpoint includes the following request parameters:

| NAME | REQUIRED | TYPE | DESCRIPTION |
|------|----------|------|-------------|

### Response parameters

This endpoint includes the following response parameters:

| NAME | TYPE | DESCRIPTION |
|------|------|-------------|

---

(Repeat this structure for all endpoints)

---

This Markdown is structured for **each endpoint**, ensuring that the **request and response parameter tables** are in place and ready to be filled in. 🚀 

Would you like me to **update your project document** with these changes, or do you want to copy and paste manually?





