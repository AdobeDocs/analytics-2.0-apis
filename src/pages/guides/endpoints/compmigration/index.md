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

The two Migration endpoints below provide methods for migrating project components from Adobe Analytics to Customer Journey Analytics. This includes segments, calculated metrics, and date ranges in Analysis Workplace. It also includes dimensions and metrics if you have mapped them before using these two Migration APIs. If you plan to also migrate dimensions and metrics, use the mappings APIs below first so that the project ID can be associated with those mappings when you migrate the project. To use the following two Migration endpoints, you will need the Adobe Analytics project ID and report suite ID, as well as the Customer Journey Analytics data view ID. 

* [POST projects migrate](#post-projects-migrate): Creates a project migration
* [GET projects migration summary](#get-migration-summary): Retrieves migration summary for a project

**Dimension Mapping Service**

To map dimensions from Adobe Analytics to a Customer Journey Analytics data view within an XDM schema, follow these steps:

1. In Customer Journey Analytics, create the dimensions that you want to be mapped from the existing Adobe Analytics dimensions.
2. Collect the dimension ID information to be used in the mappings. If you have a csv file that defines your XDM schema for a data view, it may be helpful to reference it. You can also use the [GET dimensions](https://developer.adobe.com/cja-apis/docs/endpoints/dimensions/) endpoint to see a list of dimensions and their IDs for a data view.
3. Create a csv file that contains the mappings for your dimensions. In the example template below, the **aaId** column contains the names of the dimensions to be mapped to CJA. The **cjaId** column contains example dimension IDs as shown for a data view in CJA. The **note** column contains any info helpful for explaining the dimension. This example shows four dimensions to be mapped. Yours may contain many more than this, and the limit is only set only by the number of evars you can create in Analytics.

    | aaId | cjaId | note |
    | --- | --- | --- |
    | evar5 | cja.evar5 | organization |
    | evar7 | cja.evar7 | page |
    | evar8 | cja.evar8 | product |
    | evar9 | cja.evar9 | day |
              
5. Use the dimension mapping APIs to upload (or create), update, or retrieve the mappings.

Use these endpoints to map dimensions to CJA within an XDM schema:

* [POST mapping dimensions csv](#post-map-dimensions-csv): Create dimensions mappings with a csv file
* [GET mapping dimensions csv](#get-mapping-dimensions-csv): Retrieve dimensions mappings with a csv file
* [PUT mapping dimensions csv](#put-mapping-dimensions-csv): Update dimensions mappings with a csv file
* [DELETE mapping dimension all](#delete-mapping-dimension-all): Delete a dimension mappings

**Metric Mapping Service**

To map metrics from Adobe Analytics to a Customer Journey Analytics data view within an XDM schema, follow these steps:

1. In Customer Journey Analytics, create the metrics that you want to be mapped from the existing Adobe Analytics metrics.
2. Collect the metric ID information to be used in the mappings. If you have a csv file that defines your XDM schema for a data view, it may be helpful to reference it. You can also use the [GET metrics](https://developer.adobe.com/cja-apis/docs/endpoints/metrics/) endpoint to see a list of metrics and their IDs for a data view.
3. Create a csv file that contains the mappings for your metrics. Refer to the csv example above for dimensions mappings and use the same format for your metrics.
4. Use the metrics mapping APIs to upload (or create), update, or retrieve the mappings.

Use these endpoints to map metrics to CJA within an XDM schema:

* [POST mapping metrics csv](#post-mapping-metrics-csv): Create metrics mappings with a csv file
* [GET mapping metrics csv](#get-mapping-metrics-csv): Retrieve metrics mappings with a csv file
* [PUT mapping metrics csv](#put-mapping-metric-csv): Update metrics mappings with a csv file
* [DELETE mapping metric all](#delete-metric-mapping-all): Delete all metrics mapping

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## POST projects migrate

Use this endpoint to migrate components from Adobe Analytics to Customer Journey Analytics for a specific project. You will need the [Analytics Project ID](https://experienceleague.adobe.com/en/docs/analytics/analyze/analysis-workspace/build-workspace-project/freeform-overview) to make this call. If you are migrating Analytics dimensions or metrics, first map them to CJA with the mapping APIs below this section.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/projects/{projectId}/migrate`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/projects/{projectId}/migrate" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "aaId": "exampleproject",
    "globalCompanyId": "example-analytics-org",
    "imsOrgId": "cja-exampleowner-org",
    "imsUserId": "cja-exampleowner-id",
    "imsUserName": "cja-exampleowner-name",
    "rsidDataIdMap": {
      "examplersid1": "dataview-id1",
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

### Request example details

The example request above shows the following details:

* The Adobe Analytics project ID (`aaid`) is `exampleproject.` This is the project that contains the components to be transferred from Analytics to CJA.
* The `globalCompanyId` is `example-analytics-org`. This is the organization that has ownership of the Analtyics project identified in the project ID.
* The `imsOrgId`, `imsUserId`, and `imsUserName` all apply to the `exampleowner` of the CJA data view where the components are to be transferred.
* The `rsidDataIdMap` object contains the parameters to map the Analytics report suite `examplersid1` to the CJA data view `dataview-id1`. The next line provides the generic parameters of `rsid2` and `data-id2` instead of actual example names to show how to include additional mappings of Analytics report suites to CJA data views in the same request. 


### Request Parameters

The following table describes the migrate components request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `aaId` or `projectId` | required | string | The Adobe Analytics project ID, as reflected by {projectId} in the URL of the cURL request above |
| `globalCompanyId` | required | string | The global company ID of the Analytics org |
| `imsOrgId` | required | string | The IMS organization ID for the CJA owner |
| `imsUserId` | required | string | The IMS user ID for the CJA owner|
| `imsUserName` | required | string | The IMS user name for the CJA owner |
| `rsidDataIdMap` | required | object | Contains parameters for mapping report suite IDs to data view IDs |
| `rsid1` | required | string | Report suite ID for first report suite. If additional report suites are to be mapped, add them in consecutive lines with increasing numbers, as shown in example.  |
| `data-id1` | required | string | The data view ID in CJA that should be mapped to the report suite listed as the first part of the key value pair. If additional report suites are to be mapped, add them in consecutive lines with increasing numbers, as shown in example. |

### Response Parameters

The following table describes the response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |

## GET projects migration summary

Use this endpoint to retrieve the migration summary for a specific project.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/projects/{projectId}/summary`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/projects/{projectId}/summary" \
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

The request parameters are the same as those shown above in **POST projects migrate** endpoint.

### Response Parameters

The following table describes the **GET migration summary** response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | The result of the operation (success/failure/partialSuccess) |
| `method` | string | The HTTP method used |
| `message` | string | A message describing the result |
| `summary` | object | The migration summary details |
| `totalComponents` | integer | Total number of components |
| `migratedComponents` | integer | Number of successfully migrated components |
| `failedComponents` | integer | Number of failed component migrations |

**Mappings Service APIs**

## POST mapping dimensions csv

Use this endpoint to upload a csv file that maps Analytics dimensions to CJA dimensions for a specified data view.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/map/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/map/csv?rsid=examplersid&dataId=exampledv" \
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
  "message": "Dimensions mapped successfully"
}
```

### Request example details

The POST example above shows the `rsid` and `dataId` values as `examplersid` and `exampledv` respectively in the URL of the cURL request. These values are added as query parameters. The file `examplefilecsv` is included so that it is uploaded as the body of the request. This file should contain the dimensions mappings as described above in the example template.

### Request parameters

This endpoint includes request parameters described in previous sections.

### Response Parameters

This endpoint includes response parameters described in previous sections.

## GET mapping dimensions csv

Use this endpoint to retrieve a csv file of dimensions mappings associated with a data view. You can also use this  endpoint to retrieve a csv file with dimensions filtered by dimension IDs. 

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/csv?rsid=examplersid&dataId=exampledv&dimensionIds=cja1%2C%20cja2%2C%20cja3" \
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
* The request includes a list of dimension mappings filtered for only the dimensions with IDs: `cja1`, `cja2`, and `cja3`.

### Request parameters

This endpoint includes request parameters described in previous sections.

### Response Parameters

This endpoint includes response parameters described in previous sections.

## PUT mapping dimensions csv

Use this endpoint to update a csv file that maps Analytics dimensions to CJA dimensions for a specified data view.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/csv?rsid=examplersid&dataId=exampledv" \
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
* The file updated `examplefilecsv` is included so that it is uploaded as the body of the request. This file should contain the dimensions mappings as described above in the example template.

### Response example details

The successful PUT example above shows the updated values for the parameter associated with the request. Note that the `xdmMapped` parameter also includes a `true` value, indicating a successful mapping. 

### Request Parameters

This endpoint includes request parameters described in previous sections.

### Response Parameters

The following table describes the PUT mapping dimensions response parameters not previously defined in other sections:

| Name | Type | Description |
| --- | --- | --- |
| `cjaId` | string | The dimension ID in CJA |
| `dataId` | string | The data view ID in CJA |
| `xdmMapped` | boolean | Whether the dimension was mapped in an XDM schema |
| `xdmNotes` | string | The text of the note for the dimension in the uploaded csv file |

## DELETE mapping dimensions all

Use this endpoint to delete all dimension mappings for specified report suites and data view IDs. If no mappings exist, this endpoint returns a successful response.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/all`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/all?rsid=examplersid&dataId=exampledv" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "method": "DELETE",
  "message": "Dimensions mappings deleted successfully"  
}
```

### Request example details

The DELETE example above shows the following:

* The `rsid` and `dataId` values are included as `examplersid` and `exampledv` respectively in the URL of the cURL request. These values are added as query parameters.
* All of the dimensions in the specified report suite and CJA data view are to be deleted with this request.

### Request Parameters

This endpoint includes request parameter described in previous sections. 

======================

## POST mapping metrics csv

Use this endpoint to upload a csv file that maps Analytics metrics to CJA metrics for a specified data view.

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

Use this endpoint to retrieve a csv file of metrics mappings associated with a data view. You can also use this  endpoint to retrieve a csv file with metrics filtered by metric IDs. 

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

Use this endpoint to update a csv file that maps Analytics metrics to CJA metrics for a specified data view.

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
| `xdmNotes` | string | The text of the note for the metric in the uploaded csv file |

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


