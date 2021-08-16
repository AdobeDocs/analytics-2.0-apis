---
title: Example Reporting API calls
description: View example Reporting API calls and their responses.
---

# Example Reporting API calls

Use the following examples to help supplement the creation of API calls in your own organization. You can also use the [Debugger](debugger.md) within Analysis Workspace to view API calls tailored to your organization.

## Ranked report example

A basic report that uses a dimension and a metric. This example retrieves the top 5 eVar1 dimension values, sorted by the most page views.

```json
{
   "rsid":"examplersid",
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
### Response

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

## Example trended report

These reports include information about the performance of a metric (or metrics) over a period of time. This example retrieves the number of visits for each day over a week period.

```json
{
   "rsid":"examplersid",
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

### Response

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

## Example Anomaly Detection Report

You can use the API to identify anomalies in a metric over a given time period. This type of report is helpful in setting up automated alert tools or dashboards to report the same information as the UI. When using this feature, anomalies are reported for values outside the upper or lower bound of the confidence bands. The building model and confidence bands are pre-defined in Analytics by calculated historical norms.

```json
{
   "rsid":"examplersid",
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

### Response

This example response shows an anomaly condition and identifies the following five properties with their corresponding values:

* `data` - The actual detected value for the metric (lines 21 and 40)
* `dataExpected` - The calculated expected value for the metric (lines 23 and 42)
* `dataUpperBound` - The upper limit of the confidence band (lines 26 and 45)
* `dataLowerBound` - The lower limit of the confidence band (lines 29 and 48)
* `dataAnomalyDetected` - An indicator of whether the metric value is outside of the confidence bands, i.e. `True` if detected (lines 33-34 and 52-53).

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

      ...SNIP...
   ],
   "summaryData":{
      "totals":[
         104310.0
      ]
   }
}
```

## Media Concurrent Viewers report example

Media concurrent viewers report is a time series report with two specialized metrics. 

* `metrics/concurrent_viewers_visitors` counts the number of unique visitors.
* `metrics/concurrent_viewers_occurrences` counts the number of active sessions.

These metrics can be rolled up to different granularity based on the dimension. For example unique visitors per minute or unique visitors per day etc.
These are different dimensions available for media concurrent viewers report.

* `variables/daterangeminute` 
* `variables/daterangehour`
* `variables/daterangeday`
* `variables/daterangeweek`
* `variables/daterangemonth`
* `variables/daterangequarter`
* `variables/daterangeyear`

The following request example includes both a JSON message request body to request number of unique visitors.

```json
{
    "rsid": "examplersid",
    "locale": "en_US",
    "dimension": "variables/daterangeminute",
    "globalFilters": [
        {
            "dateRange": "2019-08-01T00:00/2019-08-01T00:05",
            "type": "dateRange"
        }
    ],
    "metricContainer": {
        "metrics": [
            {
                "columnId": "column1",
                "id": "metrics/concurrent_viewers_visitors"
            }
        ]
    },
    "settings": {
        "dimensionSort": "asc",
        "limit": "100",
        "page": 0
  } 
}
```

### Response

```json
{
    "totalPages": 1,
    "firstPage": true,
    "lastPage": true,
    "numberOfElements": 5,
    "number": 0,
    "totalElements": 5,
    "columns": {
        "dimension": {
            "id": "variables/daterangeminute",
            "type": "time"
        },
        "columnIds": [
            "column1"
        ]
    },
    "rows": [
        {
            "itemId": "11907010000",
            "value": "00:00 2019-08-01",
            "data": [
                326.0
            ]
        },
        {
            "itemId": "11907010001",
            "value": "00:01 2019-08-01",
            "data": [
                258.0
            ]
        },
        {
            "itemId": "11907010002",
            "value": "00:02 2019-08-01",
            "data": [
                202.0
            ]
        },
        {
            "itemId": "11907010003",
            "value": "00:03 2019-08-01",
            "data": [
                148.0
            ]
        },
        {
            "itemId": "11907010004",
            "value": "00:04 2019-08-01",
            "data": [
                79.0
            ]
        }
    ],
    "summaryData": {
        "filteredTotals": [
            1285.0
        ],
        "totals": [
            22346.0
        ]
    }
}
```
