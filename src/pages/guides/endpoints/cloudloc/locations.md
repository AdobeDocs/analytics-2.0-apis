---
title: Adobe Analytics Cloud Locations API 
description: Use the Adobe Analytics Cloud Locations API to manage export locations for analytics data.
---

# Cloud Locations API

Use the Cloud Locations API to create, update, retrieve, or delete Cloud storage locations. Before working with Cloud locations APIs, you must first create a [Cloud locations account](account.md).

> **Note**: Both Cloud Locations accounts and locations have a `UUID` identifier. The location `UUID` is different from the account `UUID`, and the two should be referenced separately.

These endpoints provide methods for managing cloud locations:

* [GET locations](#get-locations): Retrieve all Cloud Locations for a Global Company ID
* [POST create location](#post-create-location): Create a new Cloud Location
* [GET location by UUID](#get-location-by-uuid): Retrieve a specific Cloud Location
* [PUT update location](#put-update-location): Update a specific Cloud Location
* [DELETE location](#delete-location): Delete a specific Cloud Location

## GET locations

Use this endpoint to get all Cloud Locations for a specified organization.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location`

### Request and Response Examples

#### Request

```bash
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

#### Request

```bash
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

#### Request

```bash
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/11111111-e89b-12d3-a456-426611111111" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
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

#### Request

```bash
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

#### Request

```bash
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/location/11111111-e89b-12d3-a456-426611111111" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "message": "Location deleted successfully",
  "uuid": "11111111-e89b-12d3-a456-426611111111"
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

For more information, see the following:

* [Cloud Locations API overview](index.md)
* [Cloud Locations Accounts API](accounts.md)
