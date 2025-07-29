---
title: Adobe Analytics Cloud Locations API 
description: Use the Adobe Analytics Cloud Locations API to manage export locations for analytics data.
---

# Cloud Locations API

Use the Cloud Locations API to create, update, retrieve, or delete cloud storage Locations. Before working with Cloud Locations APIs, you must first create an [Analytics Cloud API account](cloudloc/account.md).

<InlineAlert variant="info" slots="text" />

A cloud "Location" is an Adobe Analytics API connection to any third-party cloud storage service, as configured within the Adobe Cloud Accounts API. It does not refer to a specific physical location on a server.

These endpoints provide methods for managing cloud locations:

* [GET Locations](#get-locations): Retrieve all Cloud Locations for a Global Company ID
* [POST create Location](#post-create-location): Create a new cloud Location
* [GET Location by UUID](#get-location-by-uuid): Retrieve a specific cloud Location
* [PUT update Location](#put-update-location): Update a specific cloud Location
* [DELETE Location](#delete-location): Delete a specific cloud Location

<InlineAlert variant="info" slots="text" />

Both the Adobe cloud accounts API and the Locations API have a `UUID` identifier. The Location `UUID` is different from the account `UUID`, and the two should be referenced separately.

## GET Locations

Use this endpoint to retrieve all cloud Locations for a specified organization.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location`

### Request and Response Examples

#### Request

```curl
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
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
      "uuid": "11111111-e89b-12d3-a456-426611111111",
      "createdDate": "YYYY-01-01T00:00:00Z",
      "deleted": false,
      "application": "DATA_WAREHOUSE",
      "createdBy": "exampleuser@example.com",
      "name": "Example Location",
      "modifiedBy": "exampleuser@example.com",
      "globalCompanyId": "exampleorg",
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

The following table describes the GET Locations request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `accountUuid` | optional | string | Account UUID |
| `application` | optional | string | Application (TAXONOMIST, DATA_WAREHOUSE, DATA_FEED) |
| `page` | optional | integer | Page number |
| `limit` | optional | integer | Limit (10-1000) |

### Response Parameters

The following table describes the GET Locations response parameters:

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

Use this endpoint to create a new cloud Location.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location`

### Request and Response Examples

#### Request

```curl
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "type": "s3",
    "accountUuid": "11111111-e89b-12d3-a456-426611111111",
    "properties": {},
    "name": "Example Location",
    "description": "Example location description",
    "application": "DATA_WAREHOUSE",
    "applicationTag": "example-tag",
    "sharedTo": "exampleuser@example.com"
  }'
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "YYYY-01-01T00:00:00Z",
  "accountUuid": "11111111-e89b-12d3-a456-42661111111",
  "description": "Example location description",
  "type": "s3",
  "applicationTag": "example-tag",
  "uuid": "12355555-e89b-12d3-a456-426688888888",
  "createdDate": "YYYY-01-01T00:00:00Z",
  "deleted": false,
  "application": "DATA_WAREHOUSE",
  "createdBy": "exampleuser@example.com",
  "name": "Example Location",
  "modifiedBy": "exampleuser@example.com",
  "globalCompanyId": "exampleorg"
}
```

### Request Parameters

The following table describes the Create Location request parameters:

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

The following table describes the Create Location response parameters:

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

Use this endpoint to retrieve a specific cloud Location.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

#### Request

```curl
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/11111111-e89b-12d3-a456-426611111111" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "YYYY-01-01T00:00:00Z",
  "accountUuid": "11111111-e89b-12d3-a456-426611111111",
  "description": "Example location description",
  "type": "s3",
  "applicationTag": "example-tag",
  "uuid": "12355555-e89b-12d3-a456-426688888888",
  "createdDate": "YYYY-01-01T00:00:00Z",
  "deleted": false,
  "application": "DATA_WAREHOUSE",
  "createdBy": "exampleuser@example.com",
  "name": "Example Location",
  "modifiedBy": "exampleuser@example.com",
  "globalCompanyId": "exampleorg"
}
```

### Request Parameters

The following table describes the GET Location by UUID request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Location UUID |

### Response Parameters

The following table describes the GET Location by UUID response parameters:

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

Use this endpoint to update a specific cloud Location.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

#### Request

```curl
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/1111111-e89b-12d3-a456-426611111111" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "type": "s3",
    "accountUuid": "11111111-e89b-12d3-a456-426611111111",
    "properties": {},
    "name": "Updated Location",
    "description": "Updated location description",
    "application": "DATA_WAREHOUSE",
    "applicationTag": "updated-tag",
    "sharedTo": "exampleuser@example.com"
  }'
```

#### Response

```json
{
  "shared": false,
  "lastModifiedDate": "YYYY-01-02T00:00:00Z",
  "accountUuid": "11111111-e89b-12d3-a456-426611111111",
  "description": "Updated location description",
  "type": "s3",
  "applicationTag": "updated-tag",
  "uuid": "12355555-e89b-12d3-a456-426614155555",
  "createdDate": "YYYY-01-01T00:00:00Z",
  "deleted": false,
  "application": "DATA_WAREHOUSE",
  "createdBy": "exampleuser@example.com",
  "name": "Updated Location",
  "modifiedBy": "exampleuser@example.com",
  "globalCompanyId": "exampleorg"
}
```

### Request Parameters

The following table describes the Update Location request parameters:

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

The following table describes the Update Location response parameters:

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

Use this endpoint to delete a specific cloud Location.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/{UUID}`

### Request and Response Examples

#### Request

```curl
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/11111111-e89b-12d3-a456-426611111111" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
```

#### Response

```json
{
  "message": "Location deleted successfully",
  "uuid": "11111111-e89b-12d3-a456-426611111111"
}
```

### Request Parameters

The following table describes the delete Location request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `UUID` | required | string | Location UUID |

### Response Parameters

The following table describes the delete Location response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `message` | string | Success message |
| `uuid` | string | Deleted Location UUID |

For more information, see the following:

* [Cloud Locations API overview](cloudloc/index.md)
* [Cloud Accounts API](cloudloc/accounts.md)
