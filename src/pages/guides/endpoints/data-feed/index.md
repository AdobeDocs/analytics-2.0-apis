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