---
title: Real-time reports API
description: Retrieve real-time reports using the API
---

# Analytics 2.0 API real-time reports

The Analytics 2.0 real-time report API endpoint allows you to access real-time data programmatically through Adobe Developer. The real-time data reported is less than two minutes latent and auto-updates on a minute-by-minute basis. See the [Real-time reporting overview](https://experienceleague.adobe.com/en/docs/analytics/components/real-time-reporting/realtime) for more information.

The endpoint described in this guide is routed through analytics.adobe.io. To use it, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## POST real-time report

Use this endpoint to Generates a real-time report for the data requested in a POST body.

**POST**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reports/realtime`

<InlineAlert variant="info" slots="text" />

You can find your global company ID by using the [Discovery API](../discovery.md).

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

### Request

```sh
curl -X POST "https://analytics.adobe.io/api/{GLOBAL_COMPANY-ID}/reports/realtime" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"\
  -d '{
  "rsid": "examplersid",
  "globalFilters": [
    {
      "type": "dateRange",
      "dateRange": "YYYY-MM-24T09:00:00/YYYY-MM-24T09:30:00"
    }
  ],
  "metricContainer": {
    "metrics": [
      {
        "columnId": "0",
	"id": "metrics/occurrences"
      }
    ]
  },
  "dimensions": [
    {
      "id": "variables/daterangeminute",
      "dimensionColumnId": "0"
    }
  ],
  "settings": {
    "realTimeMinuteGranularity": 10,
    "limit": 20
  }
}'
```

### Response

```json
{
  "totalPages": 1,
  "firstPage": true,
  "lastPage": true,
  "numberOfElements": 3,
  "number": 0,
  "totalElements": 3,
  "rows": [
    {
      "itemIds": [
        "12403260900"
      ],
      "values": [
        "09:00 YYYY-MM-24"
      ],
      "data": [
        2183
      ],
      "value": "09:00 YYYY-MM-24",
      "itemId": "12403260900"
    },
    {
      "itemIds": [
        "12403260910"
      ],
      "values": [
        "09:10 YYYY-MM-24"
      ],
      "data": [
        2256
      ],
      "value": "09:10 YYYY-MM-24",
      "itemId": "12403260910"
    },
    {
      "itemIds": [
        "12403260920"
      ],
      "values": [
        "09:20 YYY-MM-24"
      ],
      "data": [
        2034
      ],
      "value": "09:20 YYYY-MM-24",
      "itemId": "12403260920"
    }
  ],
  "summaryData": {
    "totals": [
      6473
    ]
  }
}
```

### Request example details

The above example creates a real-time report request for the following:

* To show data for the dimension `daterangeminute` and the metric `occurences`for the rsid `examplersid`.
* To show data over a 30-minute time period on from `YYYY-MM-24T09:00:00` to `YYYY-MM-24T09:30:00`, or on the same day--the 24th between the time from `09:00` to `09:30`. Note: the start date cannot be earlier than 20 hours from the time the request is made, according to the time zone specified for the report suite.
* To show data at a granularity of `10` minutes, as specified in the value of `realTimeMinuteGranularity`.

#### Request parameters

The POST real-time reports endpoint includes the following request parameters:

| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | -- |
| `rsid` | required | string | report suite ID |
| `locale` | optional | string | The specified language |
| `globalFilters` | optional | container | Contains the `type` and `dateRange` parameters |
| `type` | optional | dateRange | The type of filter to be applied |
| `dateRange` | optional | string | The start and end dates for the report. The format is `YYYY-DD-DDT00:00:00/YYYY-MM-DDT00:00:00`and is based on the timezone of the `rsid`.|
| `metricContainer` | optional | container | Contains the `metrics` container |
| `columnId` | optional | string | The column ID |
| `id` | optional | string | The metric or dimension ID |
| `dimensions` | required | container | Contains the `id` and `dimensionColumnId` of the dimensions to be included in the report. For real-time reports, the `variables/daterangeminute` is required. |
| `dimensionColumnId` | required | string | The dimension column ID |
| `settings` | optional | container | Contains the `settings` object members for the specified real-time report, including `realTimeMinuteGranularity` |
| `realtimeMinuteGranularity` | optional |  | The number of minutes between the reporting of the specified data |
| `limit` | optional | $int32 | The maximum number of items to show per page |

### Response example details

The above JSON response example shows the following details:

* The number of `occurrences` from 9:00 to 9:10 on the 24th is `2183`.
* The number of `occurrences` from 9:10 to 9:20 on the 24th is `2256`.
* The number of `occurrences` from 9:20 to just before 9:30 on the 24th is `2034`.
* The total number of `occurrences` from 9:00 to 9:30 on the 24th is `6473`.

#### Response parameters

The POST real-time reports endpoint includes the following response parameters:

| Parameter | Type | Description |
| --- | --- | -- |
| `totalPages` | $int32 | The total pages for the report |
| `firstPage` | boolean | Whether the response includes the first page of report |
| `lastPage` | boolean | Whether the response includes the last page of report |
| `numberOfElements` | $int32 | The total number of elements included in the report |
| `rows` | container | Contains the `row` parameters `itemIds`, `values`, `data`, `value`, and `itemId`. |
| `itemIds` | string | Processing numbers used to associate time values |
| `values` | string | The `values`--or in this case the tim--associated with the `data`|
| `data` | $double | The `data`--or in this case the `occurrences`--associated with the specified item and `value` |
| `value` | string | The `values`--or in this case the tim--associated with the `data` |
| `itemId` | string | Processing number used to associate time values |
| `summaryData` | container | Contains objects providing summary for report |
| `totals` | $int32 | The total for all `data` results in the report |

## Real-time report with an additional dimension

The following POST request example includes an additional dimension ([`clickmaplinkbyregion`](https://experienceleague.adobe.com/en/docs/analytics/components/dimensions/compatibility)), along with the `daterangeminute` dimension shown in the first example above. The result is additional data values for the added dimension and combined dimension `occurences`.

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

### Request

```sh
curl -X POST "https://analytics.adobe.io/api/{GLOBAL_COMPANY-ID}/reports/realtime" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"\
  -d '{
  "rsid": "examplersid",
  "globalFilters": [
    {
      "type": "dateRange",
      "dateRange": "YYYY-MM-25T09:00:00/YYYY-MM-25T09:30:00"
    }
  ],
  "metricContainer": {
    "metrics": [
      {
        "columnId": "0",
    "id": "metrics/occurrences"
      }
    ]
  },
  "dimensions": [
    {
      "id": "variables/daterangeminute",
      "dimensionColumnId": "0"
    },
        {
      "id": "variables/clickmaplinkbyregion",
      "dimensionColumnId": "1"
    }
  ],
  "settings": {
    "realTimeMinuteGranularity": 10,
    "limit": 20
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
  "rows": [
    {
      "itemIds": [
        "12404020900",
        "1411878551"
      ],
      "values": [
        "09:00 YYYY-MM-25",
        "Save|BODY"
      ],
      "data": [
        53
      ]
    },
    {
      "itemIds": [
        "12404020900",
        "4192888170"
      ],
      "values": [
        "09:00 YYY-MM-25",
        "Discard changes|BODY"
      ],
      "data": [
        44
      ]
    },
    {
      "itemIds": [
        "12404020910",
        "1411878551"
      ],
      "values": [
        "09:10 YYYY-MM-25",
        "Save|BODY"
      ],
      "data": [
        60
      ]
    },
    {
      "itemIds": [
        "12404020910",
        "4192888170"
      ],
      "values": [
        "09:10 YYYY-MM-25",
        "Discard changes|BODY"
      ],
      "data": [
        45
      ]
    },
    {
      "itemIds": [
        "12404020920",
        "1146295927"
      ],
      "values": [
        "09:20 YYYY-MM-25",
        "Save|BODY"
      ],
      "data": [
        214
      ]
    },
    {
      "itemIds": [
        "12404020920",
        "1146295956"
      ],
      "values": [
        "09:20 YYYY-MM-25",
        "Discard changes|BODY"
      ],
      "data": [
        33
      ]
    }
  ],
  "summaryData": {
    "totals": [
      449
    ],
    "realTimeTotalsPerPeriod": [
      97,
      105,
      247
    ]
  }
}
```

### Request example details

The above example creates a real-time report request for the following:

* To show data for the dimensions `daterangeminute` and `clickmaplinkbyregion` according to the metric `occurences`for the rsid `examplersid`.
* To show data over a 30-minute time period on from `YYYY-MM-25T09:00:00` to `YYYY-MM-25T09:30:00`, or on the same day--the 25th between the time from `09:00` to `09:30`. Note: the start date cannot be earlier than 20 hours from the time the request is made, according to the time zone specified for the report suite.
* To show data at a granularity of `10` minutes, as specified in the value of `realTimeMinuteGranularity`.

The request parameters shown in this example are described in the table above.

### Response example details

The above JSON response example shows the following details:

* The number of clickmap `occurrences` for the `Save|BODY` region from 9:00 to 9:10 on the 25th is `53`.
* The number of clickmap `occurrences` for the `Discard|BODY` region from 9:00 to 9:10 on the 25th is `44`.
* The number of clickmap `occurrences` for the `Save|BODY` region from 9:10 to 9:20 on the 25th is `60`.
* The number of clickmap `occurrences` for the `Discard|BODY` region from 9:10 to 9:20 on the 25th is `45`.
* The number of clickmap `occurrences` for the `Save|BODY` region from 9:20 to 9:30 on the 25th is `214`.
* The number of clickmap `occurrences` for the `Discard|BODY` region from 9:20 to 9:30 on the 25th is `33`.
* The total number of clickmap `occurrences` from 9:00 to 9:30 on the 25th is `449`.

## Real-time breakdown reports

Breakdown reports are useful when you want to see the cross-product of values from two different dimensions. When creating a real-time breakdown report, use the same endpoint as shown above. Within the payload of the request, use the `metricsFilters` parameter to specify the filter to be applied. To see an example of a breakdown request that specifies an object within `metricFilters`, as well as general information on breakdown reports, see [Breakdown dimensions](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/breakdowns/).

## Status codes
Each web API call returns an HTTP status code that reflects the result of a request:

HTTP code | Meaning | Description
--- | --- | ---
200 | Success | The request is successful.
400 | Bad Request | The request was improperly constructed, missing key information, and/or contained incorrect syntax. This error code could indicate a problem such as a missing required parameter or the supplied data didn't pass validation.
401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. Similarly, you may have attempted to access an object that requires administrator permissions. See the OAuth token errors section below for more details.
403 | Forbidden | The resource was found, but you do not have the right credentials to view it. You might not have the required permissions to access or edit the resource for reasons not applicable to status code 401.
404 | Not found | The requested resource could not be found on the server. The resource may have been deleted, or the requested path was entered incorrectly.
500 | Internal server errors | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. Wait for a moment before trying your request again, and contact your administrator if the problem persists.

## Troubleshooting

If you receive a 400 status code error response, make sure your requests comply with the following rules:

* Provide only valid metrics or metrics that are supported by realtime requests.
* Provide only valid dimensions or a dimensions that are supported by realtime requests.
* Pass only one metric per request. Currently, the service returns 400 if more than one is passed.
* Always specify your first dimension as `variables/dateRangeMinute` since real time reports are always time bound and reported over minute granularity.
* Provide combinations of metrics and dimensions that do not qualify as as "overtime", "trended" or "breakdown" types.
* Supply search inputs only for trended reports.
* Specify `realTimeMinuteGranularity` in settings object of at least `10`.
* Do not pass `statistics`, `identityOverrides`, or `bulkExportSettings`. These are valid for normal reports but not for realtime.
* When using global filters, provide only a `dateRange` type entry.
* Do not include calculated metrics for real-time report requests.
* Do not incluce segment filtering for real-time report request.
* Do not specify the start date of the report earlier than 20 hours ago (relative to report suite timezone).
* Do not specify the start date in the future.
* Always include a global date range in format **StartDate/EndDate** (YYYY-MM-DDT00:00:00/YY-MM-DDT00:00:00). The start date cannot be earlier than the end date.
* Do not specify negative numbers for `page` parameters.

## More information

For more information on real-time reports, see the following:

* Adobe Anayltics 2.0 API real-time report reference
* Adobe Analytics 2.0 API report guide
* Adobe Analytics API dimensions breakdown
* Adobe Analytics real-time reports configuration
* Adobe Analytics supported real-time metrics and dimensions
* Adobe Analytics real-time reporting overview
* Adobe Analytics Tech Notes: Real-time reports
* Adobe Analytics Admin Guide: Real-time reports
  
  
  


