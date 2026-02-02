





## Example Anomaly Detection Report

You can use the API to identify anomalies in a metric over a given time period. This type of report is helpful in setting up automated alert tools or dashboards to report the same information as the UI. When using this feature, anomalies are reported for values outside the upper or lower bound of the confidence bands. The building model and confidence bands are pre-defined in Analytics by calculated historical norms.

The response shows an anomaly condition and identifies the following five properties with their corresponding values:

* `data` - The actual detected value for the metric (lines 21 and 40)
* `dataExpected` - The calculated expected value for the metric (lines 23 and 42)
* `dataUpperBound` - The upper limit of the confidence band (lines 26 and 45)
* `dataLowerBound` - The lower limit of the confidence band (lines 29 and 48)
* `dataAnomalyDetected` - An indicator of whether the metric value is outside of the confidence bands, i.e. `True` if detected (lines 33-34 and 52-53).

<CodeBlock slots="heading, code" repeat="2" languages="JSON,JSON"/>

#### Request body

```json
{
   "rsid":"examplersid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"YYYY-04-16T00:00:00.000/YYYY-04-24T23:59:59.999"
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
            "dateRange":"YYYY-04-16T00:00:00.000/YYYY-04-24T23:59:59.999"
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

#### Response

```json
{
   "totalPages":1,
   "firstPage":true,
   "lastPage":false,
   "numberOfElements":9,
   "number":0,
   "totalElements":9,
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
         "value":"Apr 16, YYYY",
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
