---
title: Metric Mapping API
description: Use Analytics Metric Mapping APIs to migrate metrics from Adobe Analytics to CJA.
---

# Metric Mapping API

To map metrics from Adobe Analytics to a Customer Journey Analytics data view within an XDM schema, follow these steps:

1. In Customer Journey Analytics, create the metrics that you want to be mapped from the existing Adobe Analytics metrics.

2. Collect the metric ID information to be used in the mappings. If you have a `csv` file that defines your XDM schema for a data view, it may be helpful to reference it. You can also use the [GET metrics](https://developer.adobe.com/cja-apis/docs/endpoints/metrics/) endpoint to see a list of metrics and their IDs for a data view.

3. Create a `csv` file that contains the mappings for your metrics. Refer to the `csv` example above for dimensions mappings and use the same format for your metrics.

    | aaId | cjaId | note |
    | --- | --- | --- |
    | evar5 | cja.evar5 | organization |
    | evar7 | cja.evar7 | page |
    | evar8 | cja.evar8 | product |
    | evar9 | cja.evar9 | day |
              
<InlineAlert variant="info" slots="text" />

The `aaId` label, as shown in the example mapping `csv` file above, has different meanings, depending upon endpoint or API service. In the example `csv` above, it is the metric name in Analytics. In the related [Component Migration API service](/src\pages\guides\endpoints\compmigration\index.md), `aaId` is a parameter with a different function. For more information on the difference, see the description for the `aaId` parameter in the [Component Migration API guide](/src\pages\guides\endpoints\compmigration\index.md). 

4. Use the metric mapping APIs below to upload (or create), update, or retrieve the mappings.

5. Use the [Component Migration API](index.md) to migrate the metrics to CJA.

Use these endpoints to map metrics to CJA within an XDM schema:

* [POST mapping metrics csv](#post-mapping-metrics-csv): Create metrics mappings with a `csv` file
* [GET mapping metrics csv](#get-mapping-metrics-csv): Retrieve metrics mappings with a `csv` file
* [PUT mapping metrics csv](#put-mapping-metric-csv): Update metrics mappings with a `csv` file
* [DELETE mapping metric all](#delete-metric-mapping-all): Delete all metrics mapping

## POST mapping metrics csv

Use this endpoint to upload a `csv` file that maps Analytics metrics to CJA metrics for a specified data view.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/map/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/map/csv?rsid=examplersid&dataId=exampledv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -F 'file=examplecsv'
```

#### Response

```json
{
  "result": "success",
  "method": "POST",
  "message": "Metrics mapped successfully"
}
```

### Request example details

The POST example above shows the `rsid` and `dataId` values as `examplersid` and `exampledv` respectively in the URL of the cURL request. These values are added as query parameters. The file `examplefilecsv` is included so that it is uploaded as the body of the request. This file should contain the metrics mappings as described above in the example template.

### Request parameters

This endpoint includes request parameters described in previous sections.

### Response Parameters

This endpoint includes response parameters described in previous sections.

## GET mapping metrics csv

Use this endpoint to retrieve a `csv` file of metrics mappings associated with a data view. You can also use this  endpoint to retrieve a `csv` file with metrics filtered by metric IDs. 

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/csv?rsid=examplersid&dataId=exampledv&metricIds=cja1%2C%20cja2%2C%20cja3" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "examplecsv retrieved successfully",
  "data": "dimension1,dimension2,dimension3\nvalue1,value2,value3"
}
```

### Request example details

The GET example above shows the following:

* The  `rsid` and `dataId` values are included as `examplersid` and `exampledv` respectively in the URL of the cURL request. These values are added as query parameters. 
* The request includes a list of metrics mappings filtered for only the metrics with IDs: `cja1`, `cja2`, and `cja3`.

### Request parameters

This endpoint includes request parameters described in previous sections.

### Response Parameters

This endpoint includes response parameters described in previous sections.

## PUT mapping dimensions csv

Use this endpoint to update a `csv` file that maps Analytics metrics to CJA metrics for a specified data view.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/csv?rsid=examplersid&dataId=exampledv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
  -F 'file=examplecsv'
```

#### Response

```json

{
      "cjaid": "cja.evar5",
      "dataId": "exampledv",
      "xdmMapped": "true",
      "aaId": "evar5",
      "rsid": "examplersid",
      "xdmNotes": "organization"
}

```

### Request example details

The PUT example above shows the following:

* The  `rsid` and `dataId` values are included as `examplersid` and `exampledv` respectively in the URL of the cURL request. These values are added as query parameters.
* The file updated `examplefilecsv` is included so that it is uploaded as the body of the request. This file should contain the metrics mappings as described above in the example template.

### Response example details

The successful PUT example above shows the updated values for the parameter associated with the request. Note that the `xdmMapped` parameter also includes a `true` value, indicating a successful mapping. 

### Request Parameters

This endpoint includes request parameters described in previous sections.

### Response Parameters

The following table describes the PUT mapping metrics response parameters not previously defined in other sections:

| Name | Type | Description |
| --- | --- | --- |
| `cjaId` | string | The metric ID in CJA |
| `dataId` | string | The data view ID in CJA |
| `xdmMapped` | boolean | Whether the metric was mapped in an XDM schema |
| `xdmNotes` | string | The text of the note for the metric in the uploaded `csv` file |

## DELETE mapping dimensions all

Use this endpoint to delete all metric mappings for specified report suites and data view IDs. If no mappings exist, this endpoint returns a successful response.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/all`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/metrics/all?rsid=examplersid&dataId=exampledv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "DELETE",
  "message": "Metrics mappings deleted successfully"  
}
```

### Request example details

The DELETE example above shows the following:

* The `rsid` and `dataId` values are included as `examplersid` and `exampledv` respectively in the URL of the cURL request. These values are added as query parameters.
* All of the metrics in the specified report suite and CJA data view are to be deleted with this request.

### Request Parameters

This endpoint includes request parameter described in previous sections. 


