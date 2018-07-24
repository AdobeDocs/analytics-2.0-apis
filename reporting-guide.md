
## Ranked Endpoint User Guide

The `/ranked` endpoint is the primary endpoint for reporting requests. In order to provide maximum flexibility, many configuration options are available for requests.

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


### Requesting Latitude/Longitude Information

## Segments Endpoint User Guide
The `/segments` endpoint can be used to programmatically manage segments in Adobe Analytics. Segments allow the user to isolate an interesting set of visitors, visits, or hits. Once isolated, a more thorough analysis can be performed, or actions can be taken by sharing it with other Adobe Experience Cloud products.

For information about segments and how they work, please see this documentation:
https://experiencecloud.adobe.com/resources/help/en_US/analytics/segment/seg_workflow.html

### Segment Definition Data Structure
The segment definition data structure is used to communicate segment rules to the API. This data structure defines the raw logic that will be used to isolate the segment data. The segment definition data structure is a hierarchical data structure of containers, functions, and boolean logic that is used to define the segment. The segment tool in the Adobe Analytics UI follows these rules and can be a useful tool for understanding how the data structure looks. Below is an example segment definition for your reference.

### Terms
* Schema - Refers to a report suite's configuration. Identifies which dimensions and metrics are available for use within the segment.
* Attribute - An entity in the schema. For example, `page` or `evar1`.
* Context - Defines the level that the segment logic should operate on. Valid values are `visitors`, `visits`, and `hits`.
* Row - A single record of data in a segment. Depending on the context, this can either be a record containing a visitor (contains all hits in all visits for a visitor), a single visit (contains all hits in a visit), or a single hit.
* Container - A collection of rows
* Container Set - Identifies the relationship between containers using boolean expressions.
* Data Set - A group of collections that comprises all of the data being operated on.

Let's use the following segment example to go in-depth on what each of these terms mean and how they're used.
```json
{
    "definition":{
        "func":"segment",
        "container":{
            "func":"container",
            "context":"hits",
            "pred":{
                "func":"exists",
                "description":"Page",
                "val":{
                    "func":"attr",
                    "name":"variables/page"
                }
            }
        },
        "version":[1,0,0]
    }
}
```

#### Schema
This is a reflection of the Adobe Analytics implementation. In other words, it defines the configuration for the enabled evars, props, events, etc.

#### Attributes
An attribute is an entity from the schema. In the above example, `variables/page` is an attribute.

#### Context
The rules in a segment have a context that tells them at what level to operate at. The context can be `visitors`, `visits` or `hits`.
As an example, let's build a segment rule where revenue is greater than 0 (meaning a purchase took place) and change the context to see how things change.

If the context is set to `visitors`, the segment will include all hits from visitors that have a purchase of some kind during a visit. This could be useful in analyzing customer behavior in visits leading up to a purchase and possibly behavior after a purchase is made.

If the context is set to `visits`, the segment will include all hits from visits where a purchase occurred. This could be useful for seeing the behavior of a visitor in immediate page views leading up to the purchase.

If the context is set to `hit`, the segment will only include hits where a purchase occurred, and no other hits. This could be useful in seeing which products were most popular.

In the above example, the context for the container listed is `hits`. This means that the container will only evaluate data at the hit level, (in contrast to visit or visitor level). The rows it will contain will also be at the hit level.

#### Row
A row is a single record inside of a container. The information stored in a row depends on the context setting for the container. For example, if the context is set to `visitor`, the row in the container will contain all information about the visitor spanning all hits from all visits. To contrast, if the context is set to 'hits', the row will only contain information related to the individual qualifying hits in the segment logic.

In the above example, the container is set to a `hit` context. The container's logic states that it will only include hits that have a `page` variable set. Therefore, the container will only store rows of hit records where a page was set.

#### Container
A container groups the segment logic and context together for use in calculating the rows that will be assigned to the container.

A container has three properties:

* `func`
* `context`
* `pred`

In the above example, the container's context is set to `hits` and a rule that only includes hits where the `page` attribute is set.

#### Container Set
A `container set` groups containers and creates cartesian relationships between them using boolean expressions. For example, you may have a container that groups visitors that have a purchase, and a second container that groups visitors who came to the website via a specific banner ad. The container set could link these two containers with an AND condition. The result would be a segment containing visitors who belong in both containers, i.e., visitors who made a purchase who also came to the website via a specific banner ad. It would not include visitors who came to the website via the banner ad who never purchased anything.

In the above example, there is only one container, so no container set is needed.

#### Data Set
A data set is the collection of all records used across containers and container sets to calculate the population of the segment.

### Schema Functions
**Table 1 - Attribute Function**

|Function|Description|Parameters|
|---|---|---|
| attr | References an attribute in the schema. For example, `evar1`. |`name` contains the name of the attribute in the schema. |


**Table 2 - Event Functions**

|Function|Description|Parameters|
|---|---|---|
|event|References an event from the schema. For example, `event1` or `revenue`. To use this, an aggregation function like 'total' must also be used.|`name` contains the name of the attribute in the schema. |
|total|Sums an event across the context resulting in a value that can be used in comparisons.|`evt` contains the event to be summed. |
|event-exists|Checks for the existence of the event in the context.|`evt` contains the event to be checked.|
|not-event-exists|Checks for the lack of the event in the context.|`evt` contains the event to be checked.|

**Table 3 - Grouping Functions**

|Function|Description|Parameters|
|---|---|---|
|segment |Holds the definition of the segment. It is the top level object.|`version` contains an array of three numbers that describes the version to use. `container` is a child function that contains the definition of the segment.
|container |Identifies the context and defines segment logic.|`context` Contains the context. Valid values are `visitors`, `visits`, `hits`. `pred` Contains the logic for this container.
|and |Groups multiple `container` objects together. |`preds` Contains an array of containers that define the segment logic and performs a boolean `AND` operation on them.
|or |Groups multiple `container` objects together. |`preds` Contains an array of containers that define the segment logic and performs a boolean `OR` operation on them.
|without | Performs a boolean `NOT` on the container provided in the `pred` parameter.|`pred` The container to perform a `NOT` operation on.
|sequence | A group of conditions that must occur in the provided order.|`stream` A list of ordered containers that define conditions for the segment.
|sequence-prefix | A list of conditions that must occur before a certain event.|`stream` A list of container objects defining the logic for this part of the segment. `context`
|sequence-suffix | A list of conditions that must occur after a certain event.|`stream`  A list of container objects defining the logic for this part of the segment. `context`
|sequence-and | A group of unordered conditions that _must all_ occur.|`checkpoints` A list of container objects that define the conditions.
|sequence-or | A group of unordered conditions. Any individual condition (or more) must occur.|`checkpoints` A list of containers that define conditions for the segment.|

### Available Data Comparison Functions
**Table 4 - String Functions**

|Function|Description|Parameters|
|---|---|---|
|streq|Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|not-streq|Not Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|strlt|Less Than|`val` contains a reference to the schema. `str` contains a literal value.|
|strgt|Greater Than|`val` contains a reference to the schema. `str` contains a literal value. |
|strle|Less Than or Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|strge|Greater Than or Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|streq-any-of|Match a string to any of the values in the parameter|`val` contains a reference to the schema. `list` contains an array of literal values.|
|not-streq-any-of|Ensure a string doesn't match any of the values in the parameter|`val` contains a reference to the schema. `list` contains an array of literal values.|
|contains|Ensure a string matches or contains the value in the parameter|`val` contains a reference to the schema. `str` contains a literal value.|
|not-contains|Ensure a string doesn't match or contains the value in the parameter|`val` contains a reference to the schema. `str` contains a literal value.|
|contains-any-of|Ensure a string contains any of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|contains-all-of|Ensure a string contains all of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|not-contains-any-of|Ensure a string doesn't contain at least one of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|not-contains-all-of|Ensure a string doesn't contain any of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|starts-with|Ensure a string starts with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value. |
|ends-with|Ensure a string ends with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
|not-starts-with|Ensure a string doesn't start with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
|not-ends-with|Ensure a string doesn't end with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
|matches|Ensure a string matches the glob parameter. A glob parameter uses a '*' character to match any sequence of characters. A literal '*' is expressed with '\*'.|`val` contains a reference to the schema. `glob` contains a literal value.|
|not-matches|Ensure a string doesn't match the glob parameter. A glob parameter uses a '*' character to match any sequence of characters. A literal '*' is expressed with '\*'.|`val` contains a reference to the schema. `glob` contains a literal value.|

**Table 5 - Numeric Functions**

|Function|Description|Parameters|
|---|---|---|
|eq|Equals|`val` The attribute to compare. `num` The literal number being compared to.|
|not-eq|Not equals|`val` The attribute to compare. `num` The literal number being compared to.|
|gt|Greater than|`val` The attribute to compare. `num` The literal number being compared to.|
|lt|Less than|`val` The attribute to compare. `num` The literal number being compared to.|
|ge|Greater than or equal to|`val` The attribute to compare. `num` The literal number being compared to.|
|le|Less than|`val` The attribute to compare. `num` The literal number being compared to.|
|eq-any-of|Equal to any of the values provided|`val` The attribute to compare. `list` An array of numbers to use in the comparison.|
|not-eq-any-of|Not equal to any of the values provided|`val` The attribute to compare. `list` An array of numbers to use in the comparison.|

**Table 6 - Existence Functions**

|Function|Description|Parameters|
|---|---|---|
|exists|Tests if an attribute has been set to a value.|`val` The attribute to test.|
|not-exists|Tests if an attribute has never been set to a value.|`val` The attribute to test.|

**Table 7 - Temporal Functions**

|Function|Description|Parameters|
|---|---|---|
|time-restriction|Used to determine if a checkpoint occurred within a given time frame.|`limit` Limits the event to a context. Valid values are `after` or `within`. `unit` A unit of time. Valid values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, `year`. `count` The number of temporal units based on the `unit` parameter.|
|container-restriction|Used to determine if checkpoints described in other containers have happened in a specific sequence.|`limit` Limits the event to a context. Valid values are `after` or `within`. `count`  Specifies the number of events (page views, visits, days, months, etc) between two checkpoints.|
|dimension-restriction|Used between checkpoints to specify the activity can exist in sequence between them.|`limit` Limits the checkpoint to a context. Valid values are `after` or `within`. `count` Specifies the number of events (page views, visits, days, months, etc) between two checkpoints.|
|exclude-next-checkpoint|Ensures the next checkpoint doesn't happen between the preceding checkpoint and the subsequent checkpoint. If there is no subsequent checkpoint then the excluded checkpoint must not occur at any point after the preceding checkpoint. If there is no preceding checkpoint then the excluded checkpoint must not have occurred at any point preceding the subsequent checkpoint.|

For more details, see the documentation published here:
https://experiencecloud.adobe.com/resources/help/en_US/analytics/segment/seg_sequential_build.html

### Segment Definition Examples

#### Example 1
Test if an attribute has been set to any value across all of a visitor's activity.
```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "exists",
            "val": {
                "func":"attr","name":"variables/page"
            }
        }
    }
}
```

#### Example 2
Test if an attribute has been set to a specific value across all of a visitor's activity.
```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "streq",
            "val": {
                "func":"attr","name":"variables/page"
            },
            "str": "Main Landing Page"
        }
    }
}
```

#### Example 3
Test if an attribute has been set to a specific value, and then set to a different value.
```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "sequence",
            "stream": [
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Main Landing Page",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                },
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Product Search",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                }
            ]
        }
    }
}
```

#### Example 4
Test that both an attribute has been set to any value, and a different attribute has been set to a specific value.
```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "and",
            "preds": [
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "exists",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                },
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Main Landing Page",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                }
            ]
        }
    }
}
```

#### Example 5
Test that both an attribute has been set to any value, and a different attribute has been set to a specific value within the same month.
```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "sequence",
            "stream": [
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Main Landing Page",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                },
                {
                    "func":"time-restriction",
                    "count":"1",
                    "limit":"within",
                    "unit":"month"
                },
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Product Search",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                }
            ]
        }
    }
}
```

