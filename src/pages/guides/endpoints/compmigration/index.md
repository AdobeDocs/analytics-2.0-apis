---
title: Component Migration API
description: Use Analytics Component Migration APIs to migrate components from Adobe Analytics to CJA.
---

# Component Migration API

Use the Component Migration APIs to migrate components, including segments, calculated metrics, and date ranges in Analytics to data views in Customer Journey Anaytics. You can also migrate dimensions and metrics to CJA data views if you have already mapped them with the Dimension Mapping APIs or the Metric Mapping APIs.

## Component Migration services

Component Migration APIs consist of three services for migrating components from Adobe Analytics to Customer Journey Analytics:

* Component Migration APIs
* Dimension Mapping APIs
* Metric Mapping APIs

If you plan to migrate Analytics dimensions or metrics, you must first map them with the Dimension Mapping API or the Metric Mapping API and then use the Component Migration APIs described in this guide to finalize the migration. This allows the dimensions or metrics to be migrated into an XDM schema within a CJA data view. For other components, you can use the Component Migration APIs described in this guide directly to migrate them. For more inforation, see the [Component Migration overview](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/component-migration/component-migration).

Before using the Component Migration APIs, create a profile named **Component Migration** in the Adobe Admin Console (admin permissions required). Add **Component Migration** and **Analysis Workspace** access permissions to the profile. Also, make sure to auto-include all report suites to the profile. For complete information, see the admin instructions for [preparing to migrate your components and projects from Adobe Analytics to Customer Journey Analytics](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/component-migration/prepare-component-migration).

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. Create a new project in the console and add Adobe Analytics APIs. Make sure to select the **Component Migration** profile you created when preparing your components for migration, as described above. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

The two migration endpoints below provide methods for migrating project components from Adobe Analytics to Customer Journey Analytics. This includes segments, calculated metrics, and date ranges in Analysis Workspace. It also includes dimensions and metrics if you have mapped them before using these two Migration APIs. If you plan to also migrate dimensions and metrics, use the mappings APIs below first so that the project ID can be associated with those mappings when you migrate the project. To use the following two migration endpoints, you will need the Adobe Analytics project ID and report suite ID, as well as the Customer Journey Analytics data view ID. 

* [POST projects migrate](#post-projects-migrate): Creates a project migration
* [GET projects migration summary](#get-migration-summary): Retrieves migration summary for a project


<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## POST projects migrate

Use this endpoint to migrate components from Adobe Analytics to Customer Journey Analytics for a specific project. You will need the [Analytics Project ID](https://experienceleague.adobe.com/en/docs/analytics/analyze/analysis-workspace/build-workspace-project/freeform-overview) to make this call. If you are migrating Analytics dimensions or metrics, first map them to CJA with the mapping APIs.

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

* The Adobe Analytics project ID (`aaId`) is `exampleproject.` This is the project that contains the components to be transferred from Analytics to CJA.

<InlineAlert variant="info" slots="text" />

The `aaId` parameter can have different key meanings depending upon context or endpoint. In a request body for Component Migration APIs, it is the project ID that is required for a successful call. In the dimension mapping or metric mapping endpoints, it is the label used for Analytics component ID used in the mappings file  

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


