
## Reports Endpoint User Guide

The `/reports` endpoint is the primary endpoint for reporting requests. In order to provide maximum flexibility, many configuration options are available for requests.

### Overview
Using the Adobe Analytics UI can help an analyst or digital marketer answer some key questions. Sometimes though, it makes more sense to _automate_ reporting for executive dashboards, custom reporting platforms, or tight Experience Cloud integrations. The Analytics API strives to make these things possible.

It uses the same reporting API as the Analysis Workspace UI within Adobe Analytics.

### Best Practices
* Multiple smaller requests are preferred and often perform better than a single large request
* Request data once and cache it
* Don't poll for new data faster than a 30 minute interval
* Pull historical data and increment it regularly instead of requesting the entire data set

Discouraged Practices:

* Requesting as much data as possible in a single request
* Requesting one year of data at day granularity everyday - just request the new day and merge it
* Driving a web page with a site performance widget by making an API request every time the web page is loaded
* Requesting a full year of day-level data every day to get a rolling 12-month window

### Time Series Data
Time Series reports are the simplest report that the API can produce. They simply include information about the performance of a metric (or metrics) over a period of time.

Here is a simple 'Page Views' request:
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
   "dimension":"variables/daterangeday",
   "settings":{
      "dimensionSort":"asc"
   }
}
```

This report can be run with a `curl` command on the commandline:
```bash
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" -d '[REQUESTJSON]' "https://analytics.adobe.io/reports?locale=en_US"
```

This request is doing a few things:

* Requesting the Page Views metric for the report suite `adbedocrsid`
* From Dec. 31, 2017 00:00:00.000 - Jan. 06, 2018 23:59:59.999 (using the report suite timezone)
* Using `variables/daterangeday` granularity (there are seven days in this time period, so I'll expect seven numbers)
* Sort by ascending date (i.e., oldest to newest)

Example response:
```json
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

The JSON response is made up of a few sections:

* The `rows` section contains each report record. In the above example, we see seven rows, each with a `value` and `data` array.
* The `value` property contains the dimension value. Since we're requesting a page views total by day, the value of each row will contain a date identifier for the day. For time series data, this identifier will change based on the granularity. For example, if we requested `variables/daterangemonth` instead, each value would contain a month/year identifier.
* The `data` property contains a list of metric counts for each metric requested. Since only one metric was requested, we only have a single total in each row.
* The `summaryData` section contains a total of the metrics in the current report.

A few handy changes:
* Set `dimension` to `variables/daterageday` for day granularity
* Change the `id` property in the `metrics` section to `metrics/visits` to request visits instead

#### Pagination
If we wanted to paginate the results, we would need to add a `limit` and `page` parameter to the `settings` object:

```json
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

#### Anomaly Detection

The API can also produce information about anomalies that occur in a metric for a given time period. This is the same information provided in the UI and is provided by building a model based on historical performance and calculating confidence bands for expected performance. In other words, if the metric value is within the upper and lower bound of the confidence bands, that value is within observed historical norms.

While this information is available from the 1.4 API, a notable difference is the new inclusion of hour-based granularity. This can be very useful for building alerting tools or dashboards.
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
   "dimension":"variables/daterangeday",
   "settings":{
      "dimensionSort":"asc",
      "includeAnomalyDetection":true
   }
}
```

Example Response:

```json
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
      {
         "itemId":"1180001",
         "value":"Jan 1, 2018",
         "data":[
            16558.0
         ],
         "dataExpected":[
            17374.697042688
         ],
         "dataUpperBound":[
            17444.125385086
         ],
         "dataLowerBound":[
            17305.26870029
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


Let's look at one of these records:
```json
      {
         "itemId":"1180004",
         "value":"Jan 4, 2018",
         "data":[
            17442.0
         ],
         "dataExpected":[
            17367.596716078
         ],
         "dataUpperBound":[
            17438.041586498
         ],
         "dataLowerBound":[
            17297.151845658
         ],
         "dataAnomalyDetected":[
            true
         ]
      },
```

There are four properties:

* `dataExpected` - The calculated expected value for the metric
* `dataUpperBound` - The upper limit of the confidence band
* `dataLowerBound` - The lower limit of the confidence band
* `dataAnomalyDetected` - An indicator of whether the metric value is outside of the confidence bands.

### Calculated Metrics


### Trended and Ranked Requests
The above overtime examples could be seen as a 'Ranked' report, in that the `dimension` that was used was the date. With that in mind, let's try replacing the `dimension` with something else.
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

Here, I'm requesting `evar1`. In this example, the evar is simply storing a numeric ID for a campaign. Here is the example output:
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

Let's look in detail at one of the records returned:
```json
{
   "itemId":"743855946",
   "value":"10",
   "data":[
      2032.0
   ]
},
```

* `itemId` - This is the unique ID associated with this particular value - in this case, campaign "10".
* `value` - This contains the value of the evar.
* `data` - This is an array of counts - one for each metric requested.

#### Filters
In the above example, only the top 5 records were requested and there were 8 pages worth of data available -- only 40 records. What if there were thousands of records, and only a handful were being reported on? Filters can be used to only include those few valuable values in the report.

For the next example, let's only request data for campaigns "10" and "11" by using their itemIds.
```json
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

Example response:
```json
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

The search parameter allows many parameters:

* `itemId` - A single ID to include in the report
* `itemIds` - A list of itemIds to include in the report (shown in the example)
* `excludeItemIds` - A list of itemIds to exclude in the report
* `clause` - A search clause to use when filtering dimensions
* `includeSearchTotal` - Includes a special element called 'searchTotals' in the response that contains the total of the filtered items. The default is false.

##### Clause
The search `clause` parameter provides a very powerful tool for filtering data.

* Uses boolean operators `AND`, `OR`, and `NOT`
* Uses operators `MATCH`, `CONTAINS`, `BEGINS-WITH`, `ENDS-WITH`
* Group conditions using parenthesis
* Strings are contained in single quotes.
* Searches are case-insensitive
* If no operator is specified, a 'contains' match is performed
* Valid operators are 'match' and 'contains'
* Glob expressions are evaluated. If a literal `*` is needed, use `\*`

Example Clause Statements:
* Only include results that match the string 'home page': `MATCH 'home page'`
* Include pages that don't contain 'home page': `NOT CONTAINS 'home page'`
* Include pages that don't contain 'home page' or 'about us', but do contain 'contact us': `(NOT CONTAINS 'home page' OR NOT CONTAINS 'about us') AND (CONTAINS 'contact us')`
* Include pages that contain 'home page' or start with 'landing': `CONTAINS 'home page' OR BEGINS-WITH 'landing'`

#### Applying a Segment
You can include a segment in your report by adding it to the `globalFilters` property.
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

#### Breakdown Requests
Breakdowns in the API can be useful when you want to see the cross-product of values from two different dimensions. For example -- see a report containing a list of the top "Internal Search Terms" used by visitors who saw campaign "10".

To request a breakdown report, you'll use the `metricsFilters` and `dimension` parameters to request the additional dimension. In the below example, `evar1` is the marketing campaign and `evar2` is the "Internal Search Terms".
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

Example Response:
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

