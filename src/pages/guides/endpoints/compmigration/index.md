---
title: Component Migration API
description: Use Analytics Component Migration APIs to migrate components from Adobe Analytics to CJA.
---

# Component Migration API

Use these APIs to migrate project components from Adobe Analytics to Customer Journey Analytics. You can also use the Mapping APIs below to map dimensions and metrics from Adobe Analytics to Customer Journey Analytics within an XDM schema. For more inforation, see the [Component Migration overview](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/component-migration/component-migration).

Before using these APIs, create a profile named **Component Migration** in the Adobe Admin Console (admin permissions required). Add **Component Migration** and **Analysis Workspace** access permissions to the profile. Also, make sure to auto-include all report suites to the profile. For complete information, see the admin instructions for [preparing to migrate your components and projects from Adobe Analytics to Customer Journey Analytics](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/component-migration/prepare-component-migration).

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. Create a new project in the console and add Adobe Analytics APIs. Make sure to select the **Component Migration** profile you created when preparing your components for migration, as described above. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

This guide includes instructions for three API services:


**Components Migration Service**

The endpoints below provide methods for migrating project components from Adobe Analytics to Customer Journey Analytics. Project migration components include non-XDM dimensions and metrics, as well as segments, calculated metrics, and date ranges in Analysis Worksplace. To use the endpoints, you will need the Adobe Analytics project ID and report suite ID, as well as the Customer Journey Analytics data view ID. If you plan to migrate XDM-defined dimensions and metrics, use the mappings APIs below first so that the project ID can be associated with those mappings when you migrate the project.  

* [POST projects migrate](#post-projects-migrate): Creates a project migration
* [GET projects migration summary](#get-migration-summary): Retrieves migration summary for a project

**Dimension Mapping Service**

To map dimensions from Adobe Analytics to a Customer Journey Analytics data view within an XDM schema, follow these steps:

1. In Customer Journey Analytics, create the dimensions that you want to be mapped from the existing Adobe Analytics dimensions.
2. Collect the dimension ID information to be used in the mappings. If you have a csv file that defines your XDM schema for a data view, it may be helpful to reference it. You can also use the [GET dimensions](https://developer.adobe.com/cja-apis/docs/endpoints/dimensions/) endpoint to see a list of dimensions and their IDs for a data view.
3. Create a csv file that contains the mappings for your dimensions. The template for the mapping should appear as follows:

| aaId | cjaId | note |
| --- | --- | --- |
| evar5 | cja.evar5 | organization |
| evar7 | cja.evar7 | page |
| evar8 | cja.evar8 | product |
| evar9 | cja.evar9 | day |

In the example above, the **aaId** column contains the names of the dimensions to be mapped to CJA. The **cjaId** column contains example dimension IDs as shown for a dataview in CJA. The note column contains any info helpful for explaining the dimension. This example shows four dimensions to be mapped. Yours may contain many more than this, and the limit is only set only by the number of evars you can create in Analytics.
5. Use the dimension mapping APIs to upload (or create), update, or retrieve the mappings to Customer Journey Analytics.

These endpoints provide methods for mapping dimensions to CJA within an XDM schema:

* [POST mapping dimensions csv](#post-map-dimensions-csv): Create dimensions mappings with a csv file
* [GET mapping dimensions csv](#get-mapping-dimensions-csv): Retrieve dimensions mappings with a csv file
* [PUT /dimensions/csv](#put-mapping-dimensions-csv): Update dimensions mappings with a csv file
* [DELETE mapping dimension all](#delete-mapping-dimension-all): Delete a dimension mappings

**Metric Mapping Service**

These endpoints provide methods for managing metric mappings:

* [GET mapping metrics csv](#get-mapping-metrics-csv): Retrieve metrics mappings with a csv file
* [PUT mapping metrics csv](#put-mapping-metric-csv): Update metrics mappings with a csv file
* [POST mapping metrics csv](#post-mapping-metrics-csv): Create metrics mappings with a csv file
* [DELETE mapping metric all](#delete-metric-mapping-all): Delete all metrics mapping


<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## POST projects migrate

Use this endpoint to migrate components from Adobe Analytics to Customer Journey Analytics for a specific project.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects/{projectId}/migrate`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects/{projectId}/migrate" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "aaId": "component-id",
    "globalCompanyId": "company-id",
    "imsOrgId": "org-id",
    "imsUserId": "user-id",
    "imsUserName": "user-name",
    "rsidDataIdMap": {
      "rsid1": "data-id1",
      "rsid2": "data-id2"
    }
  }'
```

#### Response

```json
{
  "result": "success",
  "method": "POST",
  "message": "Components migrated successfully"
}
```

### Request Parameters

The following table describes the migrate components request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `projectId` | required | string | The ID of the project to migrate components for |
| `aaId` | required | string | The Adobe Analytics component ID |
| `globalCompanyId` | required | string | The global company ID |
| `imsOrgId` | required | string | The IMS organization ID for the CJA project |
| `imsUserId` | required | string | The IMS user ID for the CJA project|
| `imsUserName` | required | string | The IMS user name |
| `rsidDataIdMap` | required | object | Mapping of report suite IDs to data IDs |

### Response Parameters

The following table describes the response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |

## GET projects migration summary

Use this endpoint to retrieve the migration summary for a specific project.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects/{projectId}/summary`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects/{projectId}/summary" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "Migration summary retrieved successfully",
  "summary": {
    "totalComponents": 10,
    "migratedComponents": 8,
    "failedComponents": 2
  }
}
```

### Request Parameters

The following table describes the get migration summary request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `projectId` | required | string | The ID of the project to get the migration summary for |

### Response Parameters

The following table describes the get migration summary response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `summary` | object | The migration summary details |
| `totalComponents` | integer | Total number of components |
| `migratedComponents` | integer | Number of successfully migrated components |
| `failedComponents` | integer | Number of failed component migrations |

## GET dimensions CSV

Use this endpoint to get dimensions in CSV format.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/csv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "Dimensions CSV retrieved successfully",
  "data": "dimension1,dimension2,dimension3\nvalue1,value2,value3"
}
```

### Request Parameters

This endpoint does not require any request parameters.

### Response Parameters

The following table describes the get dimensions CSV response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `data` | string | The CSV data containing dimensions |

## GET dimensions

Use this endpoint to get all dimensions.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "Dimensions retrieved successfully",
  "dimensions": [
    {
      "id": "dimension1",
      "name": "Dimension 1",
      "type": "string"
    },
    {
      "id": "dimension2",
      "name": "Dimension 2",
      "type": "string"
    }
  ]
}
```

### Request Parameters

This endpoint does not require any request parameters.

### Response Parameters

The following table describes the get dimensions response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `dimensions` | array | Array of dimension objects |
| `id` | string | The dimension ID |
| `name` | string | The dimension name |
| `type` | string | The dimension type |

## GET dimension by ID

Use this endpoint to get a specific dimension by its ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/{id}/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/{id}/csv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "Dimension retrieved successfully",
  "dimension": {
    "id": "dimension1",
    "name": "Dimension 1",
    "type": "string",
    "values": ["value1", "value2", "value3"]
  }
}
```

### Request Parameters

The following table describes the get dimension by ID request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | required | string | The ID of the dimension to retrieve |

### Response Parameters

The following table describes the get dimension by ID response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `dimension` | object | The dimension details |
| `id` | string | The dimension ID |
| `name` | string | The dimension name |
| `type` | string | The dimension type |
| `values` | array | Array of dimension values |

## POST map dimensions

Use this endpoint to map dimensions.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/map/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/map/csv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "dimensions": [
      {
        "id": "dimension1",
        "name": "Dimension 1",
        "type": "string"
      }
    ]
  }'
```

#### Response

```json
{
  "result": "success",
  "method": "POST",
  "message": "Dimensions mapped successfully"
}
```

### Request Parameters

The following table describes the map dimensions request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `dimensions` | required | array | Array of dimension objects to map |
| `id` | required | string | The dimension ID |
| `name` | required | string | The dimension name |
| `type` | required | string | The dimension type |

### Response Parameters

The following table describes the map dimensions response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |

## DELETE dimension mapping

Use this endpoint to delete a dimension mapping.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/map/{id}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/mapping/dimensions/map/{id}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "DELETE",
  "message": "Dimension mapping deleted successfully"
}
```

### Request Parameters

The following table describes the delete dimension mapping request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | required | string | The ID of the dimension mapping to delete |

### Response Parameters

The following table describes the delete dimension mapping response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |

## GET metrics

Use this endpoint to get all metrics.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "Metrics retrieved successfully",
  "metrics": [
    {
      "id": "metric1",
      "name": "Metric 1",
      "type": "number"
    },
    {
      "id": "metric2",
      "name": "Metric 2",
      "type": "number"
    }
  ]
}
```

### Request Parameters

This endpoint does not require any request parameters.

### Response Parameters

The following table describes the get metrics response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `metrics` | array | Array of metric objects |
| `id` | string | The metric ID |
| `name` | string | The metric name |
| `type` | string | The metric type |

## GET metric by ID

Use this endpoint to get a specific metric by its ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics/{id}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics/{id}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "GET",
  "message": "Metric retrieved successfully",
  "metric": {
    "id": "metric1",
    "name": "Metric 1",
    "type": "number",
    "formula": "value1 + value2"
  }
}
```

### Request Parameters

The following table describes the get metric by ID request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | required | string | The ID of the metric to retrieve |

### Response Parameters

The following table describes the get metric by ID response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `metric` | object | The metric details |
| `id` | string | The metric ID |
| `name` | string | The metric name |
| `type` | string | The metric type |
| `formula` | string | The metric formula (if applicable) |

## POST map metrics

Use this endpoint to map metrics.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics/map`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics/map" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": [
      {
        "id": "metric1",
        "name": "Metric 1",
        "type": "number"
      }
    ]
  }'
```

#### Response

```json
{
  "result": "success",
  "method": "POST",
  "message": "Metrics mapped successfully"
}
```

### Request Parameters

The following table describes the map metrics request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `metrics` | required | array | Array of metric objects to map |
| `id` | required | string | The metric ID |
| `name` | required | string | The metric name |
| `type` | required | string | The metric type |

### Response Parameters

The following table describes the map metrics response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |

## DELETE metric mapping

Use this endpoint to delete a metric mapping.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics/map/{id}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics/map/{id}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "DELETE",
  "message": "Metric mapping deleted successfully"
}
```

### Request Parameters

The following table describes the delete metric mapping request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | required | string | The ID of the metric mapping to delete |

### Response Parameters

The following table describes the delete metric mapping response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |

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

* [CJA overview](https://experienceleague.adobe.com/en/docs/analytics-platform/using/cja-overview).
* [API Status Codes](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#api-status-codes).
* [API request error headers](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#request-header-errors).


