---
title: Anomaly Detection Report guide
description: Use the Reporting API to create an anomaly detection report.
---

# Anomaly Detection Report

This guide shows an example for detecting anomalous metric behavior over a specified date range. This type of report is helpful in setting up automated alert tools or dashboards to report the same information as the UI. When using this feature, anomalies are reported for values outside the upper or lower bound of the confidence bands. The building model and confidence bands are pre-defined in Analytics by calculated historical norms. You can use the requests and responses in this example to produce similar reports for the following purposes:

* Monitoring unexpected spikes or drops in traffic
* Powering alerting and incident workflows
* Feeding anomaly-aware dashboards
* Exporting anomaly data to BI tools
* Automating investigative reporting

For more information, see the [Anomaly Detection Overview](https://experienceleague.adobe.com/en/docs/analytics/analyze/analysis-workspace/anomaly-detection/anomaly-detection).

Note: Anomaly detection is best suited for [date-trended reports](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/kpi/). While the API allows anomaly detection on some non-time dimensions, results are most reliable and interpretable when using a date-based dimension.


<CodeBlock slots="heading, code" repeat="2" languages="JSON,JSON"/>

## Report APIs provide data, not visualizations

When you design reports via the Report API, you are creating the data foundation used by Analysis Workspace or another intelligence tool. API structures do not specify the presentation layers built on top of the data. You will not see visualization parameters in the JSON request or response.

## Request the anomaly detection data

To request the data:

1. Use the following URI for your POST HTTP call:  
   `POST https://analytics.adobe.io/api/{global-company-id}/reports`  

   To find your Global Company ID, you can use the [Discovery API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/discovery/).

2. Use the example request JSON below as a template. Ensure that anomaly detection is enabled in the `settings` object and that a time-based dimension is used.

Click the **Request** tab in the following example to see a POST request. Click the **Response** tab to see a successful JSON response that includes anomaly detection fields.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

### Example request

```sh
curl -X 'POST' \
  'https://analytics.adobe.io/api/{global-company-id}/reports' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API-key}' \
  -H 'Authorization: {Bearer-token}' \
  -d '{
    "rsid": "examplersid",
    "globalFilters": [
      {
        "type": "dateRange",
        "dateRange": "YYYY-04-16T00:00:00.000/YYYY-04-24T23:59:59.999"
      }
    ],
    "metricContainer": {
      "metrics": [
        {
          "columnId": "0",
          "id": "metrics/pageviews",
          "filters": ["0"]
        }
      ],
      "metricFilters": [
        {
          "id": "0",
          "type": "dateRange",
          "dateRange": "YYYY-04-16T00:00:00.000/YYYY-04-24T23:59:59.999"
        }
      ]
    },
    "dimension": "variables/daterangeday",
    "settings": {
      "dimensionSort": "asc",
      "includeAnomalyDetection": true
    }
  }'
```
### Example response

```
json
Copy code
{
  "totalPages": 1,
  "firstPage": true,
  "lastPage": false,
  "numberOfElements": 9,
  "number": 0,
  "totalElements": 9,
  "columns": {
    "dimension": {
      "id": "variables/daterangeday",
      "type": "time"
    },
    "columnIds": ["0"]
  },
  "rows": [
    {
      "itemId": "1171131",
      "value": "Apr 16, YYYY",
      "data": [794.0],
      "dataExpected": [17395.648628666],
      "dataUpperBound": [17462.569820465],
      "dataLowerBound": [17328.727436868],
      "dataAnomalyDetected": [true]
    }
  ],
  "summaryData": {
    "totals": [104310.0]
  }
}
```
Example request details

The JSON example provides a request for daily page view data with anomaly detection enabled. Note the following details:

* On or near lines 7–12, the `dateRange` defines the analysis window.
* On or near lines 15–30, the `pageviews` metric is specified as column `0`.
* On or near line 34, the `dimension` is specified as `daterangeday`, which is required for time-series anomaly detection.
* On or near line 38, `includeAnomalyDetection` is set to `true`, enabling anomaly-related fields in the response.
* On or near line 37, `dimensionSort` is set to `asc` to return the time series in chronological order.

### Request parameters

The example request includes the following parameters in the payload:

| Parameter                 | Req/Opt  | Type    | Description                                |
| ------------------------- | -------- | ------- | ------------------------------------------ |
| `rsid`                    | required | string  | Report suite ID                            |
| `globalFilters`           | optional | array   | Contains `type` and `dateRange`            |
| `metricContainer`         | required | object  | Contains metric and filter definitions     |
| `metrics`                 | required | array   | Contains `columnId` and metric `id`        |
| `metricFilters`           | optional | array   | Scoped filters for metrics                 |
| `dimension`               | required | string  | Time-based dimension for anomaly detection |
| `settings`                | optional | object  | Report settings                            |
| `includeAnomalyDetection` | optional | boolean | Enables anomaly detection output           |
| `dimensionSort`           | optional | string  | Sort order for time-series results         |

### Example response details

The response includes anomaly detection output for each row and metric column, as follows:

* `data` shows the actual observed metric value as `794.0`.
* `dataExpected` shows the expected baseline value as `17395.648628666`.
* `dataUpperBound` and `dataLowerBound` define the expected range as `17462.569820465` and `17328.727436868`, respectively.
* `dataAnomalyDetected` is `true`, indicating the observed value falls outside the expected range.

Note: Each anomaly-related array aligns with the metric column order defined in columnIds.

### Response parameters

| Parameter                  | Type            | Description                           |
| -------------------------- | --------------- | ------------------------------------- |
| `rows.data`                | number($double) | Actual metric values                  |
| `rows.dataExpected`        | number($double) | Expected baseline values              |
| `rows.dataUpperBound`      | number($double) | Upper confidence bounds               |
| `rows.dataLowerBound`      | number($double) | Lower confidence bounds               |
| `rows.dataAnomalyDetected` | boolean         | Whether an anomaly was detected       |
| `summaryData.totals`       | number($double) | Total metric value for the date range |

## Partial Responses (206 Status Code)

A 206 status code indicates a partial response. This can occur when anomaly detection cannot be calculated for one or more metrics or dimensions. Possible errors include:

* Unexpected Number of Items: Anomaly Detection algorithm returned an unexpected number of values
* Unauthorized Metric
* Metric Not Enabled
* Unauthorized Dimension
* Dimension Not Enabled
* General Service Error

## More help on this topic

For additional reporting examples without anomaly detection, see the Reporting API overview.
