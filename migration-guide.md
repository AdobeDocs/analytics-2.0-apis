
## Migrating to the New API

This guide is intended to help users of the 1.3/1.4 versions of the Analytics API migrate to the newer and more capable `/ranked` API.

If you've used the Analytics APIs in the past, you'll find some commonalities with that API, but will also notice some stark differences. The biggest difference you'll notice is that breakdowns aren't automatically requested for you. Requests need to be chained together retrieve breakdown data.

The `/ranked` endpoint utilizes the same underlying processing pipeline as the Analysis Workspace UI. Gone are the days of seeing different numbers in the API and the UI.

Unifying the processing back-ends also ensures that as features are released in the UI, they will become available quickly within the API as well.

Finally, the `/ranked` endpoint is a simple REST GET call and no longer requires a queue/get workflow to retrieve data. This will greatly simplify development and maintenance of API clients.

### Use Case Differences
The `/ranked` end point is intended to quickly run very small requests. To contrast, the 1.3/1.4 APIs could handle requests that required 1-2 days to run!

Requests of this nature usually use a small granularity like `hour` or `day`, request a large time frame, request lots of metrics at once, and request many breakdowns. To make it worse, sometimes they include classifications as well. All of these features stack up to make reports run very slowly.

To migrate to the `/ranked` end point, these large requests will need to be broken down into many smaller requests. The results will then need to be stitched together.

For example, consider the following 1.4 request:
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

This report will query ten campaign items. For each of those, it will query one hundred geocity items. Finally, for each city, it will query the top 100 products. This report has the potential to return 10,000,000 records. In addition, it will try to get five metrics for each of those items! Finally, it will try to do that for each day going back a few years.

When making requests to the `/ranked` endpoint, smaller requests are better. The above example could be reduced into the following requests that can be made in parallel:

1. Request the top ten `trackingCode` values for the given time period.
2. For each of the values returned, request a breakdown of the top 100 `geocity` values
3. For each of those values, request a breakdown of the top 100 `page` values
4. Finally, a separate report for each metric. This means you go through steps 1-4 for `pageviews`, then again for `visits`, and so on.

One could also make the argument that historical data could be cached as part of the client application. This means that every day, only the newest day's worth of data would need to be requested.

### Breakdowns
One of the advantages of using the `/ranked` end point is the ability to request as many breakdowns as you'd like. To contrast, the 1.4 API was limited to four.

To request a breakdown report, you'll want to use an `itemId` in the `metricFilter` section of your request. Refer to the 'Breakdown requests' section of the 'Ranked Endpoint User Guide' for more information.

### Metric and Dimension Names
Metric and dimension names have changed slightly. Use the GET `/metrics` and `/dimensions` endpoints to retrieve a full list of available metrics and dimensions for your report suite.

### Real-time and Current Data
The `"source"="realtime"` and `"currentData"=true` flags in the 1.4 API allow a client to request data that is minutes (possibly seconds) old. The `/ranked` endpoint doesn't currently support this functionality. It is currently recommended that use cases that require real-time data continue to use the 1.4 API or LiveStream.

