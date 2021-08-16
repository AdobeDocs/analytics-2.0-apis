---
title: Migrating to the 2.0 APIs
description: Learn what steps that you can take to move from previous versions of the Analytics API to 2.0.
---

# Migrating to the 2.0 APIs

This guide is intended to help users of the 1.3/1.4 versions of the Analytics API migrate to the newer and more capable 2.0 APIs. By migrating to the 2.0 APIs, you can take advantage of the following features:

* Faster response times with simpler and more efficient query methods, eliminating the need for polling
* Programmatic capability for queries and dynamic report updates
* More graceful error handling
* Flexible functioning to do to anything you can do in Analysis Workspace
* Consistency and matching of API calls to UI actions
* Access to all Attribution IQ models used in Analysis Workspace
* Access to all Anomaly Detection algorithms used in Analysis Workspace
* Ability to integrate with other Experience Cloud products
* Increased capacity for multiple breakdown reports
* Newest Analytics features availability

## Current limitations

Analytics 2.0 APIs currently do not support the following:

* SAINT Classification
* Data Warehouse
* Data Source
* Data Feed
* Data Insertion
* Real-time data
 
If you rely upon these features, you can still use a hybrid approach of using 1.4 APIs for the above features and 2.0 APIs for everything else.

## How 2.0 APIs work

For the 2.0 APIs, the `reports` endpoint contains the biggest change. It utilizes the same underlying processing pipeline as the Analysis Workspace UI. Each API call matches an action in the UI, so you can test the functionality of an interaction in the UI first to plan your calls. The `/reports` endpoint is a simple REST GET call and no longer requires a queue/get workflow to retrieve data. This simplifies development and maintenance of API clients.

The `/reports` end point is intended to run very small requests quickly. Whereas 1.3/1.4 APIs handle requests that can require 1-2 days to process, the 2.0 APIs require many smaller requests put together in series. The 1.3/1.4 APIs might include requests for data from a large time frame, lots of metrics at once, or many breakdowns. To migrate to the 2.0  `/reports` end point, these large requests will need to be broken down into multiple requests. With this practice, results are much quicker and can be evaluated in a more timely manner. Multiple breakdowns are not requested automatically for you.

## Use case examples

To see how migration affects your reports, consider the following examples for 1.4 APIs and 2.0 APIs.

### Example 1.4 request

```json
{
    "reportDescription": {
        "reportSuiteID":"mainglobalprod",
        "dateFrom":"2015-01-01",
        "dateTo":"2017-12-31",
        "granularity":"day",
        "metrics": [
            {"id":"pageviews"},
            {"id":"visits"},
            {"id":"revenue"},
            {"id":"orders"},
            {"id":"visits"},
        ],
        "elements": [
            {"id":"trackingCode", "top":10},
            {"id":"geocity", "top":100},
            {"id":"page","top":100}
        ]
    }
}
```

This 1.4 report will query ten campaign items. For each of those, it will query one hundred geocity items. Finally, for each city, it will query the top 100 products. This report has the potential to return 10,000,000 records. In addition, it will try to get five metrics for each of those items. Finally, it will try to do that for each day going back a few years.

### Changes for 2.0 request 

Requests to the 2.0 `/reports` endpoint should be smaller and be made in parallel:

1. Request the top ten `trackingCode` values for the given time period.
2. For each of the values returned, request a breakdown of the top 100 `geocity` values.
3. For each of those values, request a breakdown of the top 100 `page` values.
4. Request a separate report for each metric. This means you go through steps 1-4 for `pageviews`, then again for `visits`, and so on.

You can also cache historical data as part of the client application. This means that every day, only the newest day's worth of data would need to be requested.

## Breakdowns

With the 2.0 `/reports` endpoint, you can request as many breakdowns as you like, instead of the limit of four with the 1.4 API. To request a breakdown report, use an `itemId` in the `metricFilter` section of your request. Refer to the 'Breakdown requests' section of the 'Ranked Endpoint User Guide' for more information.

## Metric and dimension names

For 2.0 APIs, metric and dimension names are slightly different. Use the GET `/metrics` and `/dimensions` endpoints to retrieve a full list of available metrics and dimensions for your report suite.

### Real-time and current data

The `"source"="realtime"` and `"currentData"=true` flags in the 1.4 API allow a client to request data that is minutes (possibly seconds) old. The `/reports` endpoint doesn't currently support this functionality. It is currently recommended that use cases that require real-time data continue to use the 1.4 API or LiveStream.
