---
title: Reports API
description: Use the Report API to create advanced date-trended reports.
---

# Date-trended advanced reports

This guide extends the features described in the [Basic Date-Trended Report](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/kpi/) and introduces the following advanced features:

* [Include date range comparisons in a date-trended report](#include-date-range-comparisons-in-a-date-trended-report)
* [Add a segment to a date-trended report](#add-a-segment-to-a-date-trended-report)

All examples in this guide use the Adobe Analytics 2.0 Reports API. The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Include date range comparisons in a date-trended report

Use this endpoint to create a date-trended report that compares metric data across two date ranges. Date range comparisons allow you to evaluate performance for a current period against a previous period in a single report request. For more information on date-trended reports, see the [Basic Date-Trended Report](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/kpi/).

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reports`

<InlineAlert variant="info" slots="text" />

The `dimension` object member is not required in report request payloads. For more information, see [Using `dimension` in report payload requests](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/#using-dimension-in-report-payload-requests).

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reports" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "rsid": "examplersid",
    "globalFilters": [
      {
        "type": "dateRange",
        "dateRange": "YYYY-01-01T00:00:00.000/YYYY-01-31T23:59:59.999"
      },
      {
        "type": "dateRange",
        "dateRange": "YYYY-02-01T00:00:00.000/YYYY-02-28T23:59:59.999"
      }
    ],
    "dimension": "variables/daterangeday",
    "metricContainer": {
      "metrics": [
        {
          "id": "metrics/visits",
          "columnId": "visits-period1"
        },
        {
          "id": "metrics/visits",
          "columnId": "visits-period2",
          "filters": ["1"]
        }
      ],
      "metricFilters": [
        {
          "id": "1",
          "type": "dateRange",
          "dateRange": "YYYY-02-01T00:00:00.000/YYYY-02-28T23:59:59.999"
        }
      ]
    }
  }'
```

#### Response

```json
{
  "totalPages": 1,
  "numberOfElements": 2,
  "rows": [
    {
      "itemId": "YYYY0101",
      "value": "Jan 1, YYYY",
      "data": [842, 731]
    },
    {
      "itemId": "YYYY0102",
      "value": "Jan 2, YYYY",
      "data": [915, 803]
    }
  ],
  "columns": {
    "dimension": {
      "id": "variables/daterangeday",
      "type": "time"
    },
    "columnIds": ["visits-period1", "visits-period2"]
  },
  "summaryData": {
    "totals": [1757, 1534]
  }
}
```

#### Request example details

The example above creates a date-trended report comparing visits across two monthly periods:

* The report runs against the `examplersid` report suite.
* Two `dateRange` filters are included in `globalFilters`. The first defines the primary reporting period. The second defines the comparison period.
* The `dimension` is set to `variables/daterangeday` to trend the data by day.
* The `metricContainer` includes the `metrics/visits` metric twice — once for each period — each assigned a unique `columnId` (`visits-period1` and `visits-period2`) to distinguish the columns in the response.
* A `metricFilters` entry scopes the second metric column to the comparison date range using a filter `id` of `"1"`, which is referenced in the `filters` array of the second metric object.

#### Response example details

The example response above returns the following:

* Each row in `rows` represents one day, identified by an `itemId` and a human-readable `value`.
* The `data` array for each row contains two values: the first corresponds to `visits-period1` and the second to `visits-period2`.
* The `columns` object identifies the dimension and the two column IDs returned.
* The `summaryData.totals` array contains the aggregated totals for each column across all rows in the response.

### Request Parameters

The following table describes the date range comparison request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID to run the report against |
| `globalFilters` | required | array | Array of filter objects applied to the entire report. For date range comparisons, include two filter objects of `type`: `dateRange`, each with a `dateRange` value formatted as `YYYY-MM-DDTHH:mm:ss.SSS/YYYY-MM-DDTHH:mm:ss.SSS` |
| `dimension` | optional | string | The dimension of the trended data. Use `variables/daterangeday`, `variables/daterangeweek`, or `variables/daterangemonth` for date-trended reports. If no dimension is provided, the response will contain only `summaryData`. For more information, see the [Report API overview](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/#using-dimension-in-report-payload-requests). |
| `metricContainer` | required | object | Contains the `metrics` array and optional `metricFilters` array. Lists the metrics to include and any metric-level filters |
| `metrics` | required | array | Array of metric objects. Each object requires an `id`. Assign a unique `columnId` to each metric to distinguish columns in the response. Use the `filters` array to reference a `metricFilters` entry by its `id` to scope a metric to a specific date range |
| `metricFilters` | optional | array | Array of filter objects that can be referenced by individual metrics using a filter `id`. Use this to scope individual metric columns to specific date ranges for comparison reporting |

### Response Parameters

The following table describes the date range comparison response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `totalPages` | integer | Total number of pages in the result set |
| `numberOfElements` | integer | Number of rows returned in the current page |
| `rows` | container | Array of row objects containing the dimension and metric values. Each row includes an `itemId`, a `value`, and a `data` array |
| `itemId` | string | The dimension item identifier |
| `value` | string | The human-readable label for the dimension item |
| `data` | array | Array of metric values for the row. Values correspond to the column order defined in `columnIds` |
| `columns` | container | Metadata about the columns returned. Contains `dimension` and `columnIds` |
| `dimension` | object | The dimension used in the report, including its `id` and `type` |
| `columnIds` | array | Ordered list of column identifiers corresponding to the metrics defined in the request |
| `summaryData` | container | Contains aggregated data for the report. Includes a `totals` array with one total value per column |

---

## Add a segment to a date-trended report

Use this endpoint to apply a segment to a date-trended report. Segments filter data before metric aggregation occurs, limiting the report to the subset of data that matches the segment definition. For more information on segments, see the [Segments API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/segments/).

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reports`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reports" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "rsid": "examplersid",
    "globalFilters": [
      {
        "type": "dateRange",
        "dateRange": "YYYY-01-01T00:00:00.000/YYYY-01-31T23:59:59.999"
      },
      {
        "type": "segment",
        "segmentId": "s1234567890_example"
      }
    ],
    "dimension": "variables/daterangeday",
    "metricContainer": {
      "metrics": [
        {
          "id": "metrics/visits"
        }
      ]
    }
  }'
```

#### Response

```json
{
  "totalPages": 1,
  "numberOfElements": 2,
  "rows": [
    {
      "itemId": "YYYY0101",
      "value": "Jan 1, YYYY",
      "data": [284]
    },
    {
      "itemId": "YYYY0102",
      "value": "Jan 2, YYYY",
      "data": [317]
    }
  ],
  "columns": {
    "dimension": {
      "id": "variables/daterangeday",
      "type": "time"
    },
    "columnIds": ["0"]
  },
  "summaryData": {
    "totals": [601]
  }
}
```

#### Request example details

The example above creates a date-trended report for visits filtered to a specific segment:

* The report runs against the `examplersid` report suite.
* The `globalFilters` array includes two filters: a `dateRange` filter that scopes the report to January, and a `segment` filter that applies the segment `s1234567890_example` as a pre-aggregation filter.
* The segment filters data before the `metrics/visits` metric is aggregated, so the report reflects only visits that match the segment definition.
* The `dimension` is set to `variables/daterangeday` to trend results by day.

#### Response example details

The example response above returns the following:

* Each row in `rows` represents one day, with `data` containing the visit count for users matching the segment.
* The lower `data` values compared to an unsegmented report reflect the pre-aggregation filtering applied by the segment.
* The `summaryData.totals` array contains the total visits for the segment across the full date range.

### Request Parameters

The following table describes the segmented date-trended report request parameters not previously described above:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `segmentId` | required | string | The ID of a saved segment to apply to the report. Segments are applied as pre-aggregation filters. The segment ID can be retrieved using the [Segments API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/segments/). |

### Response Parameters

The response parameters are the same as those described above in the [date range comparisons response parameters table](#request-parameters).

---

## Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

| HTTP code | Meaning | Description |
| --- | --- | --- |
| 200 | Success | The request is successful. |
| 400 | Bad Request | The request was improperly constructed, missing key information, and/or contained incorrect syntax. This error code could indicate a problem such as a missing required parameter or the supplied data did not pass validation. |
| 401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. Similarly, you may have attempted to access an object that requires administrator permissions. |
| 403 | Forbidden | The resource was found, but you do not have the right credentials to view it. You might not have the required permissions to access or edit the resource for reasons not applicable to status code 401. |
| 404 | Not found | The requested resource could not be found on the server. The resource may have been deleted, or the requested path was entered incorrectly. |
| 500 | Internal server errors | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. Try your request again in a few minutes, and contact your administrator if the problem persists. |

For more information, or for trouble-shooting help, see the following:

* [Reports API overview](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/)
* [API Status Codes](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#api-status-codes)
* [API request error headers](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#request-header-errors)
