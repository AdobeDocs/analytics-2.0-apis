---
title: Adobe Analytics Cloud Locations API
description: Use the Adobe Analytics Cloud Locations API to manage export locations for analytics data.
---

# Cloud Locations API

The Adobe Analytics 2.0 Cloud Locations API endpoints provide methods for managing export locations for analytics data. This API allows you to create, read, update, and delete cloud storage accounts and locations for exporting analytics data.

You can use Cloud Locations APIs for the following:

* Exporting files using Data Feed APIs

* Exporting reports using Data Warehouse APIs

* Working with Classification APIs

To export data to a cloud location, you must first create a cloud location account. After creating the account, you can create as many locations on that account as you want.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/) for more information.

## Service Categories

**Analytics Cloud Locations Account API**

These endpoints provide methods for managing cloud storage accounts:

* [GET accounts](#get-accounts): Retrieve all Cloud Locations accounts accessible to you in the specified organization. This includes accounts you have created or those that have been shared with you.
* [POST create account](#post-create-account): Create a new Cloud Locations account
* [GET account by UUID](#get-account-by-uuid): Retrieve a specific Cloud Locations account
* [PUT update account](#put-update-account): Update a specific Cloud Locations account
* [DELETE account](#delete-account): Delete a specific Cloud Locations account

**Analytics Cloud Locations Location API**

These endpoints provide methods for managing cloud locations:

* [GET locations](#get-locations): Retrieve all Cloud Locations for a Global Company ID
* [POST create location](#post-create-location): Create a new Cloud Location
* [GET location by UUID](#get-location-by-uuid): Retrieve a specific Cloud Location
* [PUT update location](#put-update-location): Update a specific Cloud Location
* [DELETE location](#delete-location): Delete a specific Cloud Location

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Cloud Locations Accounts API

The Accounts API includes all endpoints for managing Cloud Location accounts. 

### Account Types

Analytics API Cloud Locations accounts are specified by `type`. Account types are specified upon account creation. The following table describes account types with tips for setting up third-party services to work with the listed account types:

| Type | Description |
| --- | --- |
| `email` | Data to be exported by email | 
| `ftp` | Data to be exported by File Transfer Protocol |
| `sftp` | Data to be exported by Secure File Transfer Protocol |
| `gcp` | Data to be exported to the Google Cloud Platform |
| `azure` | Data to be exported to Microsoft Azure (legacy) |
| `azure_rbac` | Data to be exported to Microsoft Azure Role-Based Access Control |
| `azure_sas` | Data to be exported to Microsoft Azure Shared Access Signatures |
| `s3` | Data to be exported to Amazon Simple Storage Service |
| `s3_role_arn` | Data to be exported to `s3` with Amazon Resource Name fields for Identity and Access Management (IAM).  |


Each account type has its own set of key/value pairs or parameters for the `accountProperties` object. See the Account Properties table for more information on the properties that are specific to each account type. 
Note: Both Cloud Locations accounts and locations have a `UUID` identifier. The account `UUID` is different from the location `UUID`, and the two should be referenced separately.

## GET accounts

Use this endpoint to get all Cloud Locations accounts that you have created or that have been shared with you in your organization.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
      "type": "s3",
      "secret": "value-hidden",
      "accountProperties": {
        "accessKeyID": "test"
      },
      "name": "S3 Legacy Example",
      "description": "legacy",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-06-27T19:34:13.673Z",
      "lastModifiedDate": "YYYY-06-27T19:34:13.673Z",
      "shared": false,
      "deleted": false,
      "uuid": "555bc5a5-5d55-5555-5555-dd5d555ec55f"
    },
    {
      "type": "ftp",
      "secret": "value-hidden",
      "accountProperties": {
        "port": 21,
        "hostname": "ftp.example.com",
        "username": "test"
      },
      "name": "Example FTP",
      "description": "",
      "createdBy": "exampleuser@example.com",
      "modifiedBy": "exampleuser@example.com",
      "createdDate": "YYYY-08-09T20:56:35.380Z",
      "lastModifiedDate": "YYYY-08-20T17:55:45.551Z",
      "shared": false,
      "deleted": false,
      "uuid": "bee66666-6e66-666b-666f-dd66c6b6666e"
    },
    {
      "type": "azure",
      "secret": "value-hidden",
      "accountProperties": {
        "accountName": "exampleaccount"
      },
      "name": "Azure Legacy Example Account",
      "description": "Azure Legacy Example Account",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-09-15T19:49:37.207Z",
      "lastModifiedDate": "YYYY-09-15T19:49:37.207Z",
      "shared": false,
      "deleted": false,
      "uuid": "dcb7ee77-777e-7777-77dc-7777777ba777"
    },
    {
      "type": "email",
      "accountProperties": {
        "to": "exampleuser@example.com"
      },
      "name": "Example Email Account",
      "description": "Example Email Account",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-09-15T20:34:37.292Z",
      "lastModifiedDate": "YYYY-09-15T20:34:37.292Z",
      "shared": false,
      "deleted": false,
      "uuid": "e88888b8-8cc8-888a-88ab-888f8888b88d"
    },
    {
      "type": "azure_sas",
      "secret": "value-hidden",
      "accountProperties": {
        "keyVaultURI": "https://cja-export-qe-test.vault.azure.net/",
        "keyVaultSecretName": "sas-token",
        "tenantId": "fa4b4b4a-4b44-4444-44ae-d2c444decee4",
        "appId": "d55f5cdb-e55e-5ac5-aa5c-55fff55fdb55"
      },
      "name": "SAS Example Account",
      "description": "SAS Example Account",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-09-15T19:47:30.173Z",
      "lastModifiedDate": "YYYY-09-15T19:47:30.173Z",
      "shared": false,
      "deleted": false,
      "uuid": "a999eecb-a9c9-999c-99f9-d9fd9999cf99"
    },
    {
      "type": "azure_rbac",
      "secret": "value-hidden",
      "accountProperties": {
        "tenantId": "fa4b4b4a-4b44-4444-44ae-d2c444decee4",
        "appId": "d55f5cdb-e55e-5ac5-aa5c-55fff55fdb55"
      },
      "name": "RBAC Example Account",
      "description": "RBAC Example Account",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-09-15T19:43:44.128Z",
      "lastModifiedDate": "YYYY-09-15T19:43:44.128Z",
      "shared": false,
      "deleted": false,
      "uuid": "0ef00a00-000c-00e0-bd00-0000ec000e00"
    },
    {
      "type": "s3_role_arn",
      "accountProperties": {
        "userARN": "arn:aws:iam::111111111111:user/C-exampleorg",
        "roleARN": "arn:aws:iam::222222222222:role/aa-example-qe-role"
      },
      "name": "S3 ARN Example Account",
      "description": "S3 ARN Example Account",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-09-15T19:56:34.577Z",
      "lastModifiedDate": "YYYY-09-15T19:56:34.577Z",
      "shared": false,
      "deleted": false,
      "uuid": "1111ae11-1e11-1ac1-1b1e-1e1111111111"
    },
    {
      "type": "gcp",
      "accountProperties": {
        "email": "C-exampleorg@adbe-gcp0000.iam.gserviceaccount.com",
        "gcpId": "111111111111111111111",
        "projectId": "example-gcp0000",
        "name": "projects/adbe-gcp0000",
        "displayName": "C-exampleorg"
      },
      "name": "GCP Example Account",
      "description": "GCP Example Account",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-09-15T19:30:52.841Z",
      "lastModifiedDate": "YYYY-09-15T19:30:52.841Z",
      "shared": false,
      "deleted": false,
      "uuid": "a2eafcf2-222d-2222-a2c2-22b12b2222f2"
    },
    {
      "type": "sftp",
      "accountProperties": {
        "port": 22,
        "hostname": "examplehost",
        "uploadTemporaryFile": true,
        "username": "user"
      },
      "name": "Example sftp account",
      "description": "string",
      "createdBy": "exampleuser@example.com",
      "createdDate": "YYYY-04-30T19:40:03.042745Z",
      "lastModifiedDate": "YYYY-04-30T19:40:03.042745Z",
      "shared": false,
      "deleted": false,
      "uuid": "a3be3333-3dea-3333-3edd-f3def33c3f33"
    }
 
```

### Example request details

The example request above does not include any optional query parameters, so it retrieves all accounts of all types accessible to the user. 

### Example response details

The example response above shows the following:

* A response body that includes accounts with all supported types as described in the [Account Types table](#account-types) above.

* An `accountProperties` object for each account. This object contains parameters that are specific to the type of account. For more information, see the 

* A `uuid` identifier for each account. This is not the same as the location `uuid` that is used in the Locations API.

### Request Parameters

The following table describes the GET accounts query request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `createdBy` | optional | string | Username of account creator |
| `type` | optional | string | The type of account as described in the [Account Types table](#account-types) |
| `page` | optional | integer | The page number to return |
| `limit` | optional | integer | Maximum number of items to show per page |

### Response Parameters

The following table describes the GET accounts response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | The type of account as described in the [Account Types table](#account-types) |
| `secret` | string | Array of account objects |
| `accountProperties` | object | Contains object members specific to the account type that describe account properties. For more information see  |
| `name` | string | The friendly name of the account |
| `description` | string | Description of account |
| `createdBy` | string | Username of account creator |
| `modifiedBy` | integer | Username of account modifier, if modified |
| `createdDate` | integer | Date the account creation |
| `lastModifiedDate` | integer | Date the account was last modified, if modified |
| `shared` | boolean | Whether this account was shared with the user or another user |
| `deleted` | boolean | Whether this account was deleted |
| `uuid` | boolean | The unique account identifier |

## POST create account

Use this endpoint to create a new Cloud Locations account. The example for this endpoint includes the steps for setting up an AWS s3 role ARN account type.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3_role_arn",
    "secret": "********",
    "accountProperties":{
    "roleARN": "arn:aws:iam::{CUSTOMER ACCOUNT ID}:role/<ROLE ARN>",
    "userARN": "arn:aws:iam::{SERVICE ACCOUNT ID}:user/<USER ARN>"
  },
    "name": "Example Account",
    "description": "Example account description",
    "sharedTo": "exampleuser2@example.com"
  }'
```



#### Response

```json
{
  "accountProperties": {},
  "shared": false,
  "createdDate": "YYYY-01-01T00:00:00Z",
  "createdBy": "user@example.com",
  "lastModifiedDate": "2023-01-01T00:00:00Z",
  "name": "Example Account",
  "description": "Example account description",
  "modifiedBy": "user@example.com",
  "secret": "********",
  "type": "s3",
  "uuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Request Parameters

The following table describes the create account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | required | string | Account type |
| `secret` | required | string | Account secret |
| `accountProperties` | required | object | Account properties |
| `name` | required | string | Account name |
| `description` | optional | string | Account description |
| `sharedTo` | optional | string | User to share with |

### Response Parameters

The following table describes the create account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `accountProperties` | object | Account properties |
| `shared` | boolean | Whether the account is shared |
| `createdDate` | string | Creation date |
| `createdBy` | string | Creator |
| `lastModifiedDate` | string | Last modification date |
| `name` | string | Account name |
| `description` | string | Account description |
| `modifiedBy` | string | Last modifier |
| `secret` | string | Account secret |
| `type` | string | Account type |
| `uuid` | string | Account UUID |

## GET account by UUID

Use this endpoint to get a specific Cloud Locations Account.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "accountProperties": {},
  "shared": false,
  "createdDate": "YYYY-01-01T00:00:00Z",
  "createdBy": "user@example.com",
  "lastModifiedDate": "2023-01-01T00:00:00Z",
  "name": "Example Account",
  "description": "Example account description",
  "modifiedBy": "user@example.com",
  "secret": "********",
  "type": "s3",
  "uuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Request Parameters

The following table describes the get account by UUID request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Account UUID |

### Response Parameters

The following table describes the get account by UUID response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `accountProperties` | object | Account properties |
| `shared` | boolean | Whether the account is shared |
| `createdDate` | string | Creation date |
| `createdBy` | string | Creator |
| `lastModifiedDate` | string | Last modification date |
| `name` | string | Account name |
| `description` | string | Account description |
| `modifiedBy` | string | Last modifier |
| `secret` | string | Account secret |
| `type` | string | Account type |
| `uuid` | string | Account UUID |

## PUT update account

Use this endpoint to update a specific Cloud Locations Account.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3",
    "secret": "********",
    "accountProperties": {},
    "name": "Updated Account",
    "description": "Updated account description",
    "sharedTo": "user@example.com"
  }'
```

#### Response

```json
{
  "accountProperties": {},
  "shared": false,
  "createdDate": "2023-01-01T00:00:00Z",
  "createdBy": "user@example.com",
  "lastModifiedDate": "2023-01-02T00:00:00Z",
  "name": "Updated Account",
  "description": "Updated account description",
  "modifiedBy": "user@example.com",
  "secret": "********",
  "type": "s3",
  "uuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Request Parameters

The following table describes the update account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Account UUID |
| `type` | required | string | Account type |
| `secret` | required | string | Account secret |
| `accountProperties` | required | object | Account properties |
| `name` | required | string | Account name |
| `description` | optional | string | Account description |
| `sharedTo` | optional | string | User to share with |

### Response Parameters

The following table describes the update account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `accountProperties` | object | Account properties |
| `shared` | boolean | Whether the account is shared |
| `createdDate` | string | Creation date |
| `createdBy` | string | Creator |
| `lastModifiedDate` | string | Last modification date |
| `name` | string | Account name |
| `description` | string | Account description |
| `modifiedBy` | string | Last modifier |
| `secret` | string | Account secret |
| `type` | string | Account type |
| `uuid` | string | Account UUID |

## DELETE account

Use this endpoint to delete a specific Cloud Locations account.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPAY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "message": "Account deleted successfully",
  "uuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Request Parameters

The following table describes the delete account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Account UUID |

### Response Parameters

The following table describes the delete account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `message` | string | Success message |
| `uuid` | string | Deleted account UUID |

## GET locations

Use this endpoint to get all Cloud Locations for a given global company id.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "content": [
    {
      "shared": false,
      "lastModifiedDate": "YYYY-01-01T00:00:00Z",
      "accountUuid": "123e4567-e89b-12d3-a456-426614174000",
      "description": "Example location description",
      "type": "s3",
      "applicationTag": "example-tag",
      "uuid": "123e4567-e89b-12d3-a456-426614174001",
      "createdDate": "2023-01-01T00:00:00Z",
      "deleted": false,
      "application": "DATA_WAREHOUSE",
      "createdBy": "user@example.com",
      "name": "Example Location",
      "modifiedBy": "user@example.com",
      "globalCompanyId": "example-company-id",
      "properties": {}
    }
  ],
  "number": 0,
  "size": 10,
  "totalPages": 1,
  "totalElements": 1,
  "numberOfElements": 1,
  "first": true,
  "last": true
}
```

### Request Parameters

The following table describes the get locations request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `accountUuid` | optional | string | Account UUID |
| `application` | optional | string | Application (TAXONOMIST, DATA_WAREHOUSE, DATA_FEED) |
| `page` | optional | integer | Page number |
| `limit` | optional | integer | Limit (10-1000) |

### Response Parameters

The following table describes the get locations response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `content` | array | Array of location objects |
| `number` | integer | Page number |
| `size` | integer | Page size |
| `totalPages` | integer | Total number of pages |
| `totalElements` | integer | Total number of elements |
| `numberOfElements` | integer | Number of elements in current page |
| `first` | boolean | Whether this is the first page |
| `last` | boolean | Whether this is the last page |

## POST create location

Use this endpoint to create a new Cloud Location.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3",
    "accountUuid": "123e4567-e89b-12d3-a456-426614174000",
    "properties": {},
    "name": "Example Location",
    "description": "Example location description",
    "application": "DATA_WAREHOUSE",
    "applicationTag": "example-tag",
    "sharedTo": "user@example.com"
  }'
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "YYYY-01-01T00:00:00Z",
  "accountUuid": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Example location description",
  "type": "s3",
  "applicationTag": "example-tag",
  "uuid": "123e4567-e89b-12d3-a456-426614174001",
  "createdDate": "2023-01-01T00:00:00Z",
  "deleted": false,
  "application": "DATA_WAREHOUSE",
  "createdBy": "user@example.com",
  "name": "Example Location",
  "modifiedBy": "user@example.com",
  "globalCompanyId": "example-company-id",
  "properties": {}
}
```

### Request Parameters

The following table describes the create location request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | required | string | Location type |
| `accountUuid` | required | string | Account UUID |
| `properties` | required | object | Location properties |
| `name` | required | string | Location name |
| `description` | optional | string | Location description |
| `application` | required | string | Application (TAXONOMIST, DATA_WAREHOUSE, DATA_FEED) |
| `applicationTag` | optional | string | Application tag |
| `sharedTo` | optional | string | User to share with |

### Response Parameters

The following table describes the create location response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `shared` | boolean | Whether the location is shared |
| `lastModifiedDate` | string | Last modification date |
| `accountUuid` | string | Account UUID |
| `description` | string | Location description |
| `type` | string | Location type |
| `applicationTag` | string | Application tag |
| `uuid` | string | Location UUID |
| `createdDate` | string | Creation date |
| `deleted` | boolean | Whether the location is deleted |
| `application` | string | Application |
| `createdBy` | string | Creator |
| `name` | string | Location name |
| `modifiedBy` | string | Last modifier |
| `properties` | object | Location properties |

## GET location by UUID

Use this endpoint to get a specific Cloud Location.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/123e4567-e89b-12d3-a456-426614174001" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "YYYY-01-01T00:00:00Z",
  "accountUuid": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Example location description",
  "type": "s3",
  "applicationTag": "example-tag",
  "uuid": "123e4567-e89b-12d3-a456-426614174001",
  "createdDate": "2023-01-01T00:00:00Z",
  "deleted": false,
  "application": "DATA_WAREHOUSE",
  "createdBy": "user@example.com",
  "name": "Example Location",
  "modifiedBy": "user@example.com",
  "globalCompanyId": "example-company-id",
  "properties": {}
}
```

### Request Parameters

The following table describes the get location by UUID request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Location UUID |

### Response Parameters

The following table describes the get location by UUID response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `shared` | boolean | Whether the location is shared |
| `lastModifiedDate` | string | Last modification date |
| `accountUuid` | string | Account UUID |
| `description` | string | Location description |
| `type` | string | Location type |
| `applicationTag` | string | Application tag |
| `uuid` | string | Location UUID |
| `createdDate` | string | Creation date |
| `deleted` | boolean | Whether the location is deleted |
| `application` | string | Application |
| `createdBy` | string | Creator |
| `name` | string | Location name |
| `modifiedBy` | string | Last modifier |
| `globalCompanyId` | string | Global company ID |
| `properties` | object | Location properties |

## PUT update location

Use this endpoint to update a specific Cloud Location.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/123e4567-e89b-12d3-a456-426614174001" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3",
    "accountUuid": "123e4567-e89b-12d3-a456-426614174000",
    "properties": {},
    "name": "Updated Location",
    "description": "Updated location description",
    "application": "DATA_WAREHOUSE",
    "applicationTag": "updated-tag",
    "sharedTo": "user@example.com"
  }'
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "YYYY-01-02T00:00:00Z",
  "accountUuid": "123e4567-e89b-12d3-a456-426614174000",
  "description": "Updated location description",
  "type": "s3",
  "applicationTag": "updated-tag",
  "uuid": "123e4567-e89b-12d3-a456-426614174001",
  "createdDate": "2023-01-01T00:00:00Z",
  "deleted": false,
  "application": "DATA_WAREHOUSE",
  "createdBy": "user@example.com",
  "name": "Updated Location",
  "modifiedBy": "user@example.com",
  "globalCompanyId": "example-company-id",
  "properties": {}
}
```

### Request Parameters

The following table describes the update location request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Location UUID |
| `type` | required | string | Location type |
| `accountUuid` | required | string | Account UUID |
| `properties` | required | object | Location properties |
| `name` | required | string | Location name |
| `description` | optional | string | Location description |
| `application` | required | string | Application (TAXONOMIST, DATA_WAREHOUSE, DATA_FEED) |
| `applicationTag` | optional | string | Application tag |
| `sharedTo` | optional | string | User to share with |

### Response Parameters

The following table describes the update location response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `shared` | boolean | Whether the location is shared |
| `lastModifiedDate` | string | Last modification date |
| `accountUuid` | string | Account UUID |
| `description` | string | Location description |
| `type` | string | Location type |
| `applicationTag` | string | Application tag |
| `uuid` | string | Location UUID |
| `createdDate` | string | Creation date |
| `deleted` | boolean | Whether the location is deleted |
| `application` | string | Application |
| `createdBy` | string | Creator |
| `name` | string | Location name |
| `modifiedBy` | string | Last modifier |
| `globalCompanyId` | string | Global company ID |
| `properties` | object | Location properties |

## DELETE location

Use this endpoint to delete a specific Cloud Location.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/123e4567-e89b-12d3-a456-426614174001" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "message": "Location deleted successfully",
  "uuid": "123e4567-e89b-12d3-a456-426614174001"
}
```

### Request Parameters

The following table describes the delete location request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Location UUID |

### Response Parameters

The following table describes the delete location response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `message` | string | Success message |
| `uuid` | string | Deleted location UUID |

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

