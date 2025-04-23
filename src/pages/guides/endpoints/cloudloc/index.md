---
title: Adobe Analytics Cloud Locations API
description: Use the Adobe Analytics Cloud Locations API to manage export locations for analytics data.
---

# Adobe Analytics Cloud Locations API

The Adobe Analytics Cloud Locations API endpoints provide methods for managing export locations for analytics data. This API allows you to create, read, update, and delete cloud storage locations for exporting analytics data.

The endpoints described in this guide are routed through `analytics.adobe.io/export_locations/`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/) for more information.

## Service Categories

**Analytics Cloud Locations Account API**

These endpoints provide methods for managing cloud storage accounts:

* [GET accounts](#get-accounts): Get all Cloud Locations Accounts for a global company id
* [POST create account](#post-create-account): Create a new Cloud Locations Account
* [GET account by UUID](#get-account-by-uuid): Get a specific Cloud Locations Account
* [PUT update account](#put-update-account): Update a specific Cloud Locations Account
* [DELETE account](#delete-account): Delete a specific Cloud Locations Account

**Analytics Cloud Locations Location API**

These endpoints provide methods for managing cloud storage locations:

* [GET locations](#get-locations): Get all Cloud Locations for a given global company id
* [POST create location](#post-create-location): Create a new Cloud Location
* [GET location by UUID](#get-location-by-uuid): Get a specific Cloud Location
* [PUT update location](#put-update-location): Update a specific Cloud Location
* [DELETE location](#delete-location): Delete a specific Cloud Location

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## GET accounts

Use this endpoint to get all Cloud Locations Accounts for a global company id.

`GET https://analytics.adobe.io/export_locations/analytics/exportlocations/account`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/account" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}"
```

#### Response

```json
{
  "content": [
    {
      "accountProperties": {},
      "shared": false,
      "createdDate": "2023-01-01T00:00:00Z",
      "createdBy": "user@example.com",
      "lastModifiedDate": "2023-01-01T00:00:00Z",
      "name": "Example Account",
      "description": "Example account description",
      "modifiedBy": "user@example.com",
      "secret": "********",
      "type": "s3",
      "uuid": "123e4567-e89b-12d3-a456-426614174000"
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

The following table describes the get accounts request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `x-proxy-global-company-id` | required | string | Proxy global company id |
| `loginId` | optional | integer | Login ID |
| `createdBy` | optional | string | Created user name |
| `type` | optional | string | Type (ftp, sftp, gcp, azure, azure_rbac, azure_sas, s3, s3_role_arn, email) |
| `page` | optional | integer | Page number |
| `limit` | optional | integer | Limit (10-1000) |

### Response Parameters

The following table describes the get accounts response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `content` | array | Array of account objects |
| `number` | integer | Page number |
| `size` | integer | Page size |
| `totalPages` | integer | Total number of pages |
| `totalElements` | integer | Total number of elements |
| `numberOfElements` | integer | Number of elements in current page |
| `first` | boolean | Whether this is the first page |
| `last` | boolean | Whether this is the last page |

## POST create account

Use this endpoint to create a new Cloud Locations Account.

`POST https://analytics.adobe.io/export_locations/analytics/exportlocations/account`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/account" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3",
    "secret": "********",
    "accountProperties": {},
    "name": "Example Account",
    "description": "Example account description",
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |
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

`GET https://analytics.adobe.io/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/account/123e4567-e89b-12d3-a456-426614174000" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}"
```

#### Response

```json
{
  "accountProperties": {},
  "shared": false,
  "createdDate": "2023-01-01T00:00:00Z",
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |

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

`PUT https://analytics.adobe.io/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/account/123e4567-e89b-12d3-a456-426614174000" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}" \
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |
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

Use this endpoint to delete a specific Cloud Locations Account.

`DELETE https://analytics.adobe.io/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/account/123e4567-e89b-12d3-a456-426614174000" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}"
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |

### Response Parameters

The following table describes the delete account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `message` | string | Success message |
| `uuid` | string | Deleted account UUID |

## GET locations

Use this endpoint to get all Cloud Locations for a given global company id.

`GET https://analytics.adobe.io/export_locations/analytics/exportlocations/location`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/location" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}"
```

#### Response

```json
{
  "content": [
    {
      "shared": false,
      "lastModifiedDate": "2023-01-01T00:00:00Z",
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |
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

`POST https://analytics.adobe.io/export_locations/analytics/exportlocations/location`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/location" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}" \
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
  "lastModifiedDate": "2023-01-01T00:00:00Z",
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |
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
| `globalCompanyId` | string | Global company ID |
| `properties` | object | Location properties |

## GET location by UUID

Use this endpoint to get a specific Cloud Location.

`GET https://analytics.adobe.io/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/location/123e4567-e89b-12d3-a456-426614174001" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}"
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "2023-01-01T00:00:00Z",
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |

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

`PUT https://analytics.adobe.io/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/location/123e4567-e89b-12d3-a456-426614174001" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}" \
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
  "lastModifiedDate": "2023-01-02T00:00:00Z",
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |
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

`DELETE https://analytics.adobe.io/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/export_locations/analytics/exportlocations/location/123e4567-e89b-12d3-a456-426614174001" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: {GLOBAL_COMPANY_ID}" \
  -H "x-user-auth: {USER_TOKEN}"
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
| `x-proxy-global-company-id` | required | string | Proxy global company id |

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

## Best Practices

When using the Adobe Analytics Cloud Locations API, consider the following best practices:

1. **Rate Limiting**
   - Monitor your API usage to stay within rate limits
   - Implement exponential backoff for retries
   - Cache responses when appropriate

2. **Error Handling**
   - Always check response status codes
   - Implement proper error handling for all API calls
   - Log errors for debugging purposes

3. **Security**
   - Keep your API keys and tokens secure
   - Use HTTPS for all API requests
   - Regularly rotate your credentials

4. **Performance**
   - Use pagination for large result sets
   - Implement caching where appropriate
   - Optimize your request frequency

## Troubleshooting

Common issues and their solutions:

1. **Authentication Errors**
   - **Symptoms**: 401 Unauthorized responses
   - **Cause**: Invalid or expired authentication tokens
   - **Solution**: Verify your API key and token are valid and not expired

2. **Rate Limiting**
   - **Symptoms**: 429 Too Many Requests responses
   - **Cause**: Exceeding API rate limits
   - **Solution**: Implement exponential backoff and retry logic

3. **Invalid Parameters**
   - **Symptoms**: 400 Bad Request responses
   - **Cause**: Missing or invalid request parameters
   - **Solution**: Verify all required parameters are present and valid

## Additional Resources

For more information, or for trouble-shooting help, see the following:

* [Adobe Analytics API Overview](https://developer.adobe.com/analytics-apis/docs/2.0/guides/)
* [API Status Codes](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#api-status-codes)
* [API Request Error Headers](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#request-header-errors)
* [Getting Started Guide](https://developer.adobe.com/analytics-apis/docs/2.0/guides/getting-started/)

## Support

If you need assistance with the Adobe Analytics Cloud Locations API:

1. Check the [API Documentation](https://developer.adobe.com/analytics-apis/docs/2.0/)
2. Review the [FAQ](https://developer.adobe.com/analytics-apis/docs/2.0/guides/faq/)
3. Contact [Adobe Support](https://helpx.adobe.com/contact/enterprise-support.html)
