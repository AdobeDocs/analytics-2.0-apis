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

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_feed/datafeed/examplersid" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```
