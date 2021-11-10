---
title: Reporting API
description: Use the Reporting API to retrieve data from a report suite.
---

# Reporting API

The `/reports` endpoint is the primary endpoint for reporting requests. While Analysis Workspace can help an analyst or digital marketer answer key questions, the Analytics API can automate those answers by reporting to executive dashboards, custom reporting platforms, or tight Experience Cloud integrations. Because the `/reports` endpoint uses the same API as the Analytics UI, you can configure it for many options.

See the [API reference](/src/pages/apis/index.md) for all calls that you can make to this endpoint.

## Partial Responses (206 Status Code)

A 206 status code indicates a partial response. This status code means that there were some columns in the reporting response that have errors. These errors can include any of the following:

* **Unauthorized Metric**: User does not have access to the requested metric
* **Metric Not Enabled**: The requested metric is not enabled in this report suite
* **Unauthorized Dimension**: User does not have access to the requested dimension
* **Dimension Not Enabled**: The requested dimension is not enabled in this report suite
* **Unauthorized Global Dimension**: User does not have access to the global dimension for this request
* **Global Dimension Not Enabled**: The global dimension for this request is not enabled in this report suite
* **Unexpected Number of Items**: Anomaly Detection algorithm returned an unexpected number of anomalies
* **General Service Error**: General Anomaly Detection service error

## Paginating Reports

To paginate results, add a `limit` and `page` parameter to the `settings` object:

```json
{
   "rsid":"examplersid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"YYYY-12-31T00:00:00.000/YYYY-01-31T23:59:59.999"
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
            "dateRange":"YYYY-12-31T00:00:00.000/YYYY-01-31T23:59:59.999"
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
