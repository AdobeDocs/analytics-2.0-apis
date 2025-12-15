---
title: Dimensions Mappings API
description: Use Analytics Dimension Mapping APIs to migrate dimensions from Adobe Analytics to CJA.
---

# Dimensions Mappings API

To map dimensions from Adobe Analytics to a Customer Journey Analytics data view within an XDM schema, follow these steps:

1. In Customer Journey Analytics, create the dimensions that you want to be mapped from the existing Adobe Analytics dimensions.
2. Collect the dimension ID information to be used in the mappings. If you have a `csv` file that defines your XDM schema for a data view, it may be helpful to reference it. You can also use the [GET dimensions](https://developer.adobe.com/cja-apis/docs/endpoints/dimensions/) endpoint to see a list of dimensions and their IDs for a data view.
3. Create a `csv` file that contains the mappings for your dimensions. In the example template below, the **aaId** column contains the names of the dimensions to be mapped to CJA. The **cjaId** column contains example dimension IDs as shown for a data view in CJA. The **note** column contains any info helpful for explaining the dimension. This example shows four dimensions to be mapped. Yours may contain many more than this, and the limit is only set only by the number of evars you can create in Analytics.

    | aaId | cjaId | note |
    | --- | --- | --- |
    | evar5 | cja.evar5 | organization |
    | evar7 | cja.evar7 | page |
    | evar8 | cja.evar8 | product |
    | evar9 | cja.evar9 | day |
              
<InlineAlert variant="info" slots="text" />

The `aaId` label, as shown in the example mapping `csv` file above, has different meanings, depending upon endpoint or API service. In the example `csv` above, it is the dimension name in Analytics. In the related [Component Migration API service](/src\pages\guides\endpoints\compmigration\index.md), `aaId` is a parameter with a different function. For more information on the difference, see the description for the `aaId` parameter in the [Component Migration API guide](/src\pages\guides\endpoints\compmigration\index.md). 

4. Use the dimension mapping APIs below to upload (or create), update, or retrieve the mappings.

5. Use the [Component Migration API](index.md) to migrate the dimensions to CJA.

Use these endpoints to map dimensions to CJA within an XDM schema:

* [POST dimensions mappings csv](#post-dimensions-mapping-csv): Create dimensions mappings with a `csv` file
* [GET dimensions mappings csv](#get-dimensions-mapping-csv): Retrieve dimensions mappings with a `csv` file
* [PUT dimensions mappings csv](#put-dimensions-mapping-csv): Update dimensions mappings with a `csv` file
* [DELETE dimension mappings all](#delete-dimensions-mappings-all): Delete dimensions mappings

## POST dimensions mappings csv

Use this endpoint to upload a `csv` file that maps Analytics dimensions to CJA dimensions for a specified data view.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/csv`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/cjamigration/mapping/dimensions/csv?rsid=examplersid&dataId=exampledv" \
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

## GET dimensions mappings csv

Use this endpoint to retrieve a `csv` file of dimensions mappings associated with a data view. You can also use this  endpoint to retrieve a `csv` file with dimensions filtered by dimension IDs. 

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

## PUT dimensions mappings csv

Use this endpoint to update a `csv` file that maps Analytics dimensions to CJA dimensions for a specified data view.

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

## DELETE dimensions mappings all

Use this endpoint to delete all dimensions mappings for specified report suites and data view IDs. If no mappings exist, this endpoint returns a successful response.

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



