
# Analytics API Reports User Guide

The `/reports` endpoint is the primary endpoint for reporting requests. In order to provide maximum flexibility, many configuration options are available for requests.

## Reports Overview

While the Adobe Analytics UI can help an analyst or digital marketer answer key questions, the Analytics API can automate those answers by reporting to executive dashboards, custom reporting platforms, or tight Experience Cloud integrations. Because the `/reports` endpoint uses the same API as the Analytics UI, you can configure it for many options.

## Authentication and Authorization

Before you can use Analytics APIs, you need to obtain authentication and receive authorization. For more information, see the [Getting Started guide](README.md).


## `/reports` Endpoint Description

The `/reports` endpoint description is shown in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). Use the Swagger UI to see endpoint summaries, available methods, parameters, example values, models, and status codes, and to try out the API.

## Best Practices

Please follow these guidelines when using Analytics APIs:

* Make multiple, smaller requests instead of a large, single request.
* Request data once and cache it.
* Do not poll for new data faster than a 30 minute interval.
* Pull historical data and increment it regularly instead of requesting the entire data set.

Discouraged Practices:

* Requesting as much data as possible in a single request
* Requesting one year of data at day granularity everyday - just request the new day and merge it
* Driving a web page with a site performance widget by making an API request every time the web page is loaded
* Requesting a full year of day-level data every day to get a rolling 12-month window

## Example Time Series Report

The Reports API includes **Time Series** reports. These simple reports include information about the performance of a metric (or metrics) over a period of time.

### Example Request

The following request example includes both a JSON message request body and a `curl` request for the **Page Views** metric.

#### JSON Request Message

```json={line-numbers="yes"}
{
   "rsid":"adbedocrsid",
   "globalFilters":[
      {
            "type":"dateRange",
            "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
      }
   ],
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"dateRange",
            "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
         }
      ]
   },
   "dimension":"variables/daterangeday",
   "settings":{
      "dimensionSort":"asc"
   }
}
```
The JSON message requests the following:

* **Page Views** metric for the report suite `adbedocrsid` (lines 12 and 2)

* Time period From Dec. 31, 2017 00:00:00.000 - Jan. 06, 2018 23:59:59.999, using the report suite timezone (line 22)

* `variables/daterangeday` granularity (line 26). With seven days specified in this time period, you can expect seven numbers in the response.

* Sort response by ascending date, i.e. oldest to newest (line 28)

#### `curl` Request

```bash
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/reports \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
  ```

### Example Response

```json={line-numbers="yes"}
{
   "totalPages":1,
   "firstPage":true,
   "lastPage":false,
   "numberOfElements":7,
   "number":0,
   "totalElements":7,
   "columns":{
      "dimension":{
         "id":"variables/daterangeday",
         "type":"time"
      },
      "columnIds":[
         "0"
      ]
   },
   "rows":[
      {
         "itemId":"1171131",
         "value":"Dec 31, 2017",
         "data":[
            794.0
         ]
      },
      {
         "itemId":"1180001",
         "value":"Jan 1, 2018",
         "data":[
            16558.0
         ]
      },
      {
         "itemId":"1180002",
         "value":"Jan 2, 2018",
         "data":[
            17381.0
         ]
      },
      {
         "itemId":"1180003",
         "value":"Jan 3, 2018",
         "data":[
            17384.0
         ]
      },
      {
         "itemId":"1180004",
         "value":"Jan 4, 2018",
         "data":[
            17442.0
         ]
      },
      {
         "itemId":"1180005",
         "value":"Jan 5, 2018",
         "data":[
            17417.0
         ]
      },
      {
         "itemId":"1180006",
         "value":"Jan 6, 2018",
         "data":[
            17334.0
         ]
      }
   ],
   "summaryData":{
      "totals":[
         104310.0
      ]
   }
}
```

The JSON response includes the following information:

* The `rows` section contains each report record. In the above example, you can see seven rows, each with a `value` and `data` array (lines 19-66).

* The `value` property contains the dimension value. Because the request includes a total of page views by day, the value of each row will contain a date identifier for the day (e.g. line 25). For time series data, this identifier changes based on the granularity. For example, if you request `variables/daterangemonth` instead, each value will contain a month/year identifier.

* The `data` property contains a list of metric counts for each metric requested. Since only one metric is requested, only a single total appears in each row (e.g. lines 26-28).

* The `summaryData` section contains a total of the metrics in the current report (lines 72-74).

*You can also easily modify this example to get metrics for visits. Simply change the `id` property in the `metrics` section to `metrics/visits` (line 15).*

## Paginating Reports

To paginate results, add a `limit` and `page` parameter to the `settings` object (lines 29-30 below):

```json={line-numbers="yes"}
{
   "rsid":"adbedocrsid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2017-12-31T00:00:00.000/2018-01-31T23:59:59.999"
      }
   ],
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"dateRange",
            "dateRange":"2017-12-31T00:00:00.000/2018-01-31T23:59:59.999"
         }
      ]
   },
   "dimension":"variables/daterangeday",
   "settings":{
      "dimensionSort":"asc",
      "limit":"10",
      "page":"2"
   }
}
```

## Example Anomaly Detection Report

 The Reports API can also identify anomalies in a metric over a given time period. This can be helpful in setting up automated alert tools or dashboards to report the same information as the UI. When using this feature, anomalies are reported for values outside the upper or lower bound of the confidence bands. The building model and confidence bands are pre-defined in Analytics by calculated historical norms. Although this ability is also available with the Anayltics 1.4 APIs, the Analytics 2.0 APIs now include hour-based granularity.

### Example Request

The following request includes an additional parameter to the `settings` object to turn on anomaly detection (line 29).

```json={line-numbers="yes"}
{
   "rsid":"adbedocrsid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
      }
   ],
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"dateRange",
            "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
         }
      ]
   },
   "dimension":"variables/daterangeday",
   "settings":{
      "dimensionSort":"asc",
      "includeAnomalyDetection":true
   }
}
```

### Example Response

This example response shows an anomaly condition and identifies the following five properties with their corresponding values:

* `data` - The actual detected value for the metric (lines 21 and 40)
* `dataExpected` - The calculated expected value for the metric (lines 23 and 42)
* `dataUpperBound` - The upper limit of the confidence band (lines 26 and 45)
* `dataLowerBound` - The lower limit of the confidence band (lines 29 and 48)
* `dataAnomalyDetected` - An indicator of whether the metric value is outside of the confidence bands, i.e. `True` if detected (lines 33-34 and 52-53).

```json={line-numbers="yes"}
{
   "totalPages":1,
   "firstPage":true,
   "lastPage":false,
   "numberOfElements":7,
   "number":0,
   "totalElements":7,
   "columns":{
      "dimension":{
         "id":"variables/daterangeday",
         "type":"time"
      },
      "columnIds":[
         "0"
      ]
   },
   "rows":[
      {
         "itemId":"1171131",
         "value":"Dec 31, 2017",
         "data":[
            794.0
         ],
         "dataExpected":[
            17395.648628666
         ],
         "dataUpperBound":[
            17462.569820465
         ],
         "dataLowerBound":[
            17328.727436868
         ],
         "dataAnomalyDetected":[
            true
         ]
      },

      ...SNIP...
   ],
   "summaryData":{
      "totals":[
         104310.0
      ]
   }
}
```

## Ranked Report Example

In Analytics, simple time series reports have metrics. If you add a dimension, you can request **Ranked** reports. For example, some of the previous examples above include a date for the dimension so they can be considered **Ranked** reports. If you also include a time range with a metric and a dimension, you can request **Trended** reports.  For more information on report types in Analytics, see [Adobe Report Types help](https://marketing.adobe.com/resources/help/en_US/sc/user/reports.html). In the following examples, a Custom Insight Conversion Variable (evar1) is used as the dimension for the report.

### Example Request

In the following request, `evar1` is simply storing a numeric ID for a campaign (see line 26).

```json
{
   "rsid":"adbedocrsid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
      }
   ],
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"dateRange",
            "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
         }
      ]
   },
   "dimension":"variables/evar1",
   "settings":{
      "dimensionSort":"asc",
      "limit":5
   }
}
```
### Example Response

In the following response, each record returns:

* `itemId` - This is the unique ID associated with this particular value - in this case, campaign "10".
* `value` - This contains the value of the evar.
* `data` - This is an array of counts - one for each metric requested.

```json
{
   "totalPages":8,
   "firstPage":true,
   "lastPage":false,
   "numberOfElements":5,
   "number":0,
   "totalElements":40,
   "columns":{
      "dimension":{
         "id":"variables/evar1",
         "type":"string"
      },
      "columnIds":[
         "0"
      ]
   },
   "rows":[
      {
         "itemId":"0",
         "value":"Unspecified",
         "data":[
            11560.0
         ]
      },
      {
         "itemId":"219343969",
         "value":"15",
         "data":[
            524.0
         ]
      },
      {
         "itemId":"349230650",
         "value":"7",
         "data":[
            4420.0
         ]
      },
      {
         "itemId":"511036305",
         "value":"11",
         "data":[
            1631.0
         ]
      },
      {
         "itemId":"743855946",
         "value":"10",
         "data":[
            2032.0
         ]
      }
   ],
   "summaryData":{
      "totals":[
         104310.0
      ]
   }
}
```

## Filtering Reports

Use filters to limit the data returned so that reports show only the values you need.  For example, if you have thousands of records but only a few have needed reports, you can use filtering to return and find them quickly. Some filters also allow you to include, group, or present data in convenient formats, such as breakdown reports.

This section includes information on the following filtering features:

* Search parameter

* Clause parameter

* Applying Segments

* Breakdown Reports

### Using `search` Parameters

By using the `search` parameter, you can add even more granular parameters to filter your results more narrowly. The `search` parameter includes the following options:

* `itemId` - A single ID to include in the report
* `itemIds` - A list of itemIds to include in the report (shown in the example)
* `excludeItemIds` - A list of itemIds to exclude in the report
* `clause` - A search clause to use when filtering dimensions
* `includeSearchTotal` - Includes a special element called 'searchTotals' in the response that contains the total of the filtered items. The default is `false`.

#### Example `search` Request

The following example requests data only for campaigns "10" and "11" with the `search` parameter by using their itemIds (line 9).

```json={line-numbers="yes"}
{
   "rsid":"adbedocrsid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
      }
   ],
   "search":{
      "itemIds":[743855946,511036305]
   },
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"dateRange",
            "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
         }
      ]
   },
   "dimension":"variables/evar1",
   "settings":{
      "dimensionSort":"asc",
      "limit":5
   }
}
```

#### Example Response

The following response returns the data requested for the `itemId` associated with campaigns 10 and 11 (lines 18-21 and 25-28).

```json={line-numbers="yes"}
{
   "totalPages":1,
   "firstPage":true,
   "lastPage":true,
   "numberOfElements":2,
   "number":0,
   "totalElements":2,
   "columns":{
      "dimension":{
         "id":"variables/evar1",
         "type":"string"
      },
      "columnIds":[
         "0"
      ]
   },
   "rows":[
      {
         "itemId":"511036305",
         "value":"11",
         "data":[
            1631.0
         ]
      },
      {
         "itemId":"743855946",
         "value":"10",
         "data":[
            2032.0
         ]
      }
   ],
   "summaryData":{
      "totals":[
         104310.0
      ]
   }
}
```

### Using `clause` Parameters

As noted above, the `search` parameter also includes the `clause` option. The `clause` parameter provides a powerful tool for filtering data. To use it, follow these rules:

* It uses boolean operators `AND`, `OR`, and `NOT`.
* It uses operators `MATCH`, `CONTAINS`, `BEGINS-WITH`, and `ENDS-WITH`.
* It uses group conditions with parenthesis.
* Strings are contained in single quotes.
* Searches are case-insensitive.
* If no operator is specified, a 'contains' match is performed.
* Valid operators are 'match' and 'contains'.
* Glob expressions are evaluated. If a literal `*` is needed, use `\*`.

#### Example Clause Statements

* Only include results that match the string 'home page': `MATCH 'home page'`
* Include pages that do not contain 'home page': `NOT CONTAINS 'home page'`
* Include pages that do not contain 'home page' or 'about us', but do contain 'contact us': `(NOT CONTAINS 'home page' OR NOT CONTAINS 'about us') AND (CONTAINS 'contact us')`
* Include pages that contain 'home page' or start with 'landing': `CONTAINS 'home page' OR BEGINS-WITH 'landing'`

### Applying Segments

You can include a segment in your report by adding it to the `globalFilters` property.

#### Example Request

The following example shows a segment requested as part of the `globalFilters` property:

```json
   ...
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2014-06-01T00:00/2014-06-21T00:00"
      },
      {
         "type":"segment",
         "segmentId":"53adb46be4b0a2a175bf38c4"
      }
   ],
   ...
```

### Breakdown Reports

Breakdowns in the API are useful when you want to see the cross-product of values from two different dimensions. When requesting a breakdown report, use the `metricsFilters` and `dimension` parameters to request the additional dimension.

#### Example Request

The following example requests a breakdown report containing a list of the top five "Internal Search Terms" used by visitors who saw campaign 10. Within the `metricsFilters` parameter, the type is set to `breakdown` (line 21), and `evar1` is the marketing campaign (line 22). Within the `dimensions` parameter, `evar2` is the "Internal Search Terms" (line 27).

```json={line-numbers="yes"}
{
   "rsid":"adbedocrsid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
      }
   ],
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"breakdown",
            "dateRange":"evar1",
            "itemId":"743855946"
         }
      ]
   },
   "dimension":"variables/evar2",
   "settings":{
      "dimensionSort":"asc",
      "limit":5
   }
}
```

#### Example Response

The following example shows that the top search terms for Campaign 10 are "red t-shirt", "digital watches", "sport socks", "gps watch", and "running shoes."

```json
{
      "totalPages":2,
      "firstPage":true,
      "lastPage":false,
      "numberOfElements":5,
      "number":0,
      "totalElements":7,
      "columns":{
         "dimension":{
            "id":"variables/evar2",
            "type":"string"
         },
         "columnIds":[
            "0"
         ]
      },
      "rows":[
         {
            "itemId":"1132341824",
            "value":"red t-shirt",
            "data":[
               1515.0
            ]
         },
         {
            "itemId":"2400044733",
            "value":"digital watches",
            "data":[
               1.0
            ]
         },
         {
            "itemId":"3351316813",
            "value":"sport socks",
            "data":[
               11.0
            ]
         },
         {
            "itemId":"3440395251",
            "value":"gps watch",
            "data":[
               95.0
            ]
         },
         {
            "itemId":"3614317595",
            "value":"running shoes",
            "data":[
               16.0
            ]
         }
      ],
      "summaryData":{
         "totals":[
            2032.0
         ]
      }
   }
```

#### Multi-level Breakdown Example

For a more in-depth example of breakdowns see the following guide: [Reporting with Multiple Breakdowns](reporting-multiple-breakdowns.md)
