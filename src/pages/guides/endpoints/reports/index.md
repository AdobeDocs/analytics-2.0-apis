---
title: Reporting API
description: Use the Reporting API to retrieve data from a report suite.
---

# Reporting API

The Analytics Reports API includes the primary endpoint for reporting requests. While Analysis Workspace can help an analyst or digital marketer answer key questions, the Analytics API can automate those answers by reporting to executive dashboards, custom reporting platforms, or tight Experience Cloud integrations. Because the reports endpoint uses the same API as the Analytics UI, you can configure it for many options.

This guide does not include descriptions for all request and response parameters for the reports endpoint. For more information on parameters included with this endpoint, see the [API reference](/src/pages/apis/index.md). Also, you can copy API JSON request payloads and responses associated with any visualization directly from Analysis Workspace with the [Oberon debugger tool](https://developer.adobe.com/cja-apis/docs/endpoints/reporting/debugger/). This can be a helpful aid in structuring any API reporting request from Analysis Workspace visualizations.

## Request reporting data 

This guide includes API instructions that correspond to an example free-form table visualization in Analysis Workspace with the `page` dimension and the following metrics:

* `pageviews`
* `visits`
* `visitors`

This example, appears in Analysis Workspaces similar to the following graphic: 

sample table screen shot

To make the request, use the following URI for your POST HTTP method:

POST `https://analytics.adobe.io/api/{global-company-id}/reports`

Click the **Request** tab in the following example to see a a request for the data shown in the visualization above, limited to the top ten values.
Click the **Response** tab to see a successful JSON response for the request. 

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

### Example request

```sh
curl -X 'POST' \
  'https://analytics.adobe.io/api/{global-company-id}/reports' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API-key}' \
  -H 'Authorization: Bearer {Bearer-token}
  -d '{REQUESTJSON}
{
    "rsid": "examplersid",
    "globalFilters": [
        {
            "type": "dateRange",
            "dateRange": "2023-07-01T00:00:00.000/2023-08-01T00:00:00.000",
            "dateRangeId": "thisMonth"
        }
    ],
    "metricContainer": {
        "metrics": [
            {
                "columnId": "0",
                "id": "metrics/pageviews"
            },
            {
                "columnId": "1",
                "id": "metrics/visits",
                "sort": "desc"
            },
            {
                "columnId": "2",
                "id": "metrics/visitors"
            }
        ]
    },
    "dimension": "variables/page",
    "settings": {
        "countRepeatInstances": true,
        "includeAnnotations": true,
        "limit": 10,
        "page": 0,
        "nonesBehavior": "exclude-nones"
    },
    "statistics": {
        "functions": [
            "col-max",
            "col-min"
        ]
    },
    "capacityMetadata": {
        "associations": [
            {
                "name": "applicationName",
                "value": "Analysis Workspace UI"
            },
            {
                "name": "projectId",
                "value": "undefined"
            },
            {
                "name": "projectName",
                "value": "New project"
            },
            {
                "name": "panelName",
                "value": "Freeform table"
            }
        ]
    }
}
```

## Example response

```json
{
    "totalPages": 877,
    "firstPage": true,
    "lastPage": false,
    "numberOfElements": 10,
    "number": 0,
    "totalElements": 8768,
    "columns": {
        "dimension": {
            "id": "variables/page",
            "type": "string"
        },
        "columnIds": [
            "0",
            "1",
            "2"
        ]
    },
    "rows": [
        {
            "itemId": "3306266643",
            "value": "home",
            "data": [
                219567,
                151478,
                151478
            ]
        },
        {
            "itemId": "2796092754",
            "value": "category 5",
            "data": [
                90943,
                71248,
                71248
            ]
        },
        {
            "itemId": "1738577623",
            "value": "category 2",
            "data": [
                84192,
                69067,
                69067
            ]
        },
        {
            "itemId": "3553521723",
            "value": "category 4",
            "data": [
                83645,
                67272,
                67272
            ]
        },
        {
            "itemId": "3455114909",
            "value": "category 3",
            "data": [
                80090,
                66950,
                66950
            ]
        },
        {
            "itemId": "545858230",
            "value": "articles",
            "data": [
                84854,
                61158,
                61158
            ]
        },
        {
            "itemId": "894732499",
            "value": "app: launch",
            "data": [
                109829,
                59618,
                59618
            ]
        },
        {
            "itemId": "338857740",
            "value": "category 1",
            "data": [
                66972,
                58834,
                58834
            ]
        },
        {
            "itemId": "1284838141",
            "value": "forum",
            "data": [
                82860,
                56420,
                56420
            ]
        },
        {
            "itemId": "773465109",
            "value": "lead form: step 1",
            "data": [
                78256,
                55995,
                55995
            ]
        }
    ],
    "summaryData": {
        "filteredTotals": [
            3080619,
            357996,
            357996
        ],
        "annotations": [],
        "totals": [
            3080619,
            424407,
            424407
        ],
        "annotationExceptions": [],
        "col-max": [
            219567,
            151478,
            151478
        ],
        "col-min": [
            1,
            1,
            1
        ]
    }
}
```

### Example request details

In addition to the metrics described above, the JSON body requests the following:

* Time period From July 1, 2023 00:00:00.000 - August 1, 2023 00:00:00.000, using the report suite timezone

* Sort response `visits` by descending `value`, i.e. highest to lowest

#### Request parameters

The example request includes the following parameters in the payload:

| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `rsid` | required | string | report suite ID |
| `globalFilters` | optional | array | Contains `type`, `dateRange`, and `dateRangeId` |
| `type` | optional | string | The type of filter applied |
| `dateRange` | optional | string | The date range of the data |
| `dateRangeId` | optional | string | The label for the date range; e.g., `ThisMonth` |
| `metricContainer` | optional | object | Contains `metrics` array|
| `metrics` | optional | array | Contains `ColumnId`, `id`, and `sort` |
| `columnId` | optional | string | The column number in the table visualization, left to right, starting from `0` |
| `id` | optional | string | The name of the element for the column; e.g., the name of the `metric` |
| `sort` | optional | string | The sorting applied to the column data--`asc` or `desc` |
| `dimension` | required | string | The dimension used for the report |
| `settings` | optional | object | The settings requested for the reporting response, as specified by the parameters in the following five rows |
| `countRepeatInstances` | optional | boolean | Whether to count repeat instances of a returned metric |
| `includeAnnotations` | optional | boolean | Whether to include annotations in the response |
| `limit` | optional | integer | The maximum number of items to return in the response |
| `page` | optional | integer | The maximum number of pages to return in the response |
| `nonesBehavior` | optional | string | Excludes instances with values of `0` if set to `exclude-nones` |
| `statistics` | optional | object | Contains the `functions` array |
| `functions` | optional | array | Contains `col-max` and `col-min` |
| `col-max` | optional | string | The column maximum |
| `col-min` | optional | string | The column minimum |
| `capacityMetadata` | optional | object | Contains `associations` array |
| `associations` | optional | array | Contains `name` and `value` parameters for each type of metadata associated with report; e.g., `applicationName`, `projectId`, `projectName`, and `panelName`|
| `name` | optional | string | The associated category type of the associated metadata |
| `value` | optional | string | The actual name or title specified for the metadata category in the report |
 
### Example response details

The response above shows the following top ten ranked pages for this month according to the `pageViews`, `pageViews`, and `visitors` metrics:

1. home
1. category 5
1. category 2
1. category 4
1. category 3
1. articles
1. app: launch
1. category 1
1. forum
1. leaf form: step 1

Additionally, the response above shows the following:

* Each `row` secion contains each report record.

* The `value` property contains the dimension value. Because the request includes a total of page views by day, the value of each row will contain a date identifier for the day. Note that for time series data, this identifier changes based on the granularity you specify. For example, if you request variables/daterangemonth instead, each value will contain a month/year identifier.

* The `data` property contains a list of metric counts for each metric requested.

* The `summaryData` section contains a total of the metrics in the current report.

If you do not include  a `limit` with your POST request, you can subsequently use the GET top items endpoint--described in a following section--to have only the top specified number of items returned.

#### Response parameters

The example response includes the following parameters:

| Parameter | Type | Description |
| --- | --- | -- |
| `totalPages` | integer | The total number of pages with data |
| `firstPage` | boolean | Whether to include the first page of results |
| `lastPage` | boolean | Whether to include the last page of results |
| `numberOfElements` | integert | Lists the data type of the dimension |
| `number` | integer | The number of pages, starting with `0` |
| `totalElements` | integer | Product categories. An extra metadata item in response to the `expansion` request parameter. |
| `columns` | object | Contains column and `dimension` data |
| `dimension` | object | Contains `id` and `type` |
| `id` | string | Name of the dimension |
| `type` | string | The `dimension` ID data type |
| `columnIds` | string | The column number in the table visualization, left to right, starting from `0` |
| `rows` | container | Contains `itemId`, `value` and `data` |
| `itemId` | string | The item ID|
| `value` | string | The name specified for the `itemId` in the report |
| `data` | number($double) | The numerical values returned for the requested items |
| `summaryData` | object | Contains the **ranked** summary data information described in the following rows |
| `filteredTotals` | number($double) | The data totals after the specified filters are applied |
| `annotations` | string | Annotations for the summary data, if specified |
| `totals` | number($double) | The data totals |
| `annotationExceptions` | string | Exceptions for annotations |
| `col-max` | optional | string | The column maximum |
| `col-min` | optional | string | The column minimum |

## Retrieve top items

The GET reports/topItems request will return only the top items from the previous POST body, according the maximum number of items you want returned. They are returned in ranked order (excluding `NonValues`). You can specify the maximum with the `limit` included as a query parameter in the request.

To make the request, use the following URI for your GET HTTP method:

GET `https://analytics.adobe.io/api/{global-company-id}/reports/topItems`

### Example request

The following example shows a request for a top items report for POST body shown above:

```
curl -X 'GET' \
  'https://analytics.adobe.io/api/{Global company ID}/reports/topItems?rsid=examplersid=variables%2Fpage&locale=en_US&lookupNoneValues=false&limit=10&page=0' \
  -H 'accept: application/json' \
  -H 'x-api-key: 5a8dcc2cfa71472cbfa4fb53671c45ed' \
  -H 'Authorization: {Bearer-token} 
```

In this example you append the previous request body to the cURL call. Note that this request specifies that "NoneValues" not be included and that the `limit` of items to return is 10.

The response for this request is the same as the example response shown above.

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