---
title: Adobe Analytics Cloud Locations Account API
description: Use the Adobe Analytics Cloud Locations Account API to create accounts for cloud locations.
---

# Cloud Locations Account API

The Accounts API includes all endpoints for managing Cloud Location accounts. These endpoints provide methods for managing cloud storage accounts:

* [GET accounts](#get-accounts): Retrieve all Cloud Locations accounts accessible to you in the specified organization. This includes accounts you have created or those that have been shared with you.
* [POST create account](#post-create-account): Create a new Cloud Locations account
* [GET account by UUID](#get-account-by-uuid): Retrieve a specific Cloud Locations account
* [PUT update account](#put-update-account): Update a specific Cloud Locations account
* [DELETE account](#delete-account): Delete a specific Cloud Locations account


### Account Types

Analytics API Cloud Locations accounts are specified by `type`. Account types are specified upon account creation. The following table describes account types:

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
| `s3_role_arn` | Data to be exported to `s3` with Amazon Resource Name fields for Identity and Access Management (IAM). See separate instructions for creating this account type.  |


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
      "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
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
      "uuid": "bee11111-1e11-111b-111f-dd11c6b1111e"
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
      "uuid": "dcb1ee11-111e-1111-11dc-1111111ba111"
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
      "uuid": "e11111b1-1cc1-111a-11ab-111f1111b11d"
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
      "uuid": "a111eecb-a1c1-111c-11f1-d1fd1111cf11"
    },
    {
      "type": "azure_rbac",
      "secret": "value-hidden",
      "accountProperties": {
        "tenantId": "fa4b4b4a-4b44-4444-44ae-d2c444decee4",
        "appId": "d11f11db-e11e-1ac1-aa1c-11fff11fdb11"
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
      "uuid": "a21afcf1-111d-1111-a1c1-11b11b1111f1"
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
      "uuid": "a1be1111-1dea-1111-1edd-f1def11c1f11"
    }
 
```

### Example request details

The example request above does not include any optional query parameters, so it retrieves all accounts of all types accessible to the user. 

### Example response details

The example response above shows the following:

* A response body that includes accounts with all supported types as described in the [Account Types table](#account-types) above.

* An `accountProperties` object for each account. This object contains parameters that are specific to the type of account. For more information, see the [Account properties](#account-properties) section of this guide.

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
| `type` | string | The type of account as described in the Account Types table|
| `secret` | string | Array of account objects |
| `accountProperties` | object | Contains object members specific to the account type that describe account properties. see the [Account properties](#account-properties) section of this guide. |
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
  "lastModifiedDate": "YYYY-01-01T00:00:00Z",
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
  "lastModifiedDate": "YYYY-01-01T00:00:00Z",
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
  "createdDate": "YYYY-01-01T00:00:00Z",
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



## Account properties


Each account type has its own set of key/value pairs or parameters for the `accountProperties` object. The following JSON includes all of the account properties request and response parameters for each account type.


### Email

**Request**

```json
{
  "type": "email",
  "accountProperties":
  {
    "to": "exampleuser@example.com"
  },
  "name": "string",
  "description": "string"
}
```

**Response**

```json
{
  "type": "email",
  "accountProperties": {
    "to": "exampleuser@example.com"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-06-02T16:19:04.039666Z",
  "lastModifiedDate": "YYYY-06-02T16:19:04.039666Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```



### FTP

**Request**

```json
{
  "type": "ftp",
  "accountProperties":
  {
    "hostname": "string",
    "username": "string",
    "port": 21
  },
  "name": "string",
  "description": "string"
}
```

**Response**

```json
{
  "type": "ftp",
  "secret": "value-hidden",
  "accountProperties": {
    "port": 21,
    "hostname": "string",
    "username": "string"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:34:20.492287Z",
  "lastModifiedDate": "YYYY-05-04T21:34:20.492287Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

### SFTP

**Request**

```json
{
  "type": "sftp",
  "accountProperties":
  {
    "hostname": "string",
    "username": "string",
    "port": 22,
    "uploadTemporaryFile": true
  },
  "name": "string",
  "description": "string"
}
```

**Response**

```json
{
  "type": "sftp",
  "accountProperties": {
    "port": 22,
    "hostname": "string",
    "username": "string",
    "uploadTemporaryFile": true
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:35:13.213154Z",
  "lastModifiedDate": "YYYY-05-04T21:35:13.213154Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

### GCP

**Request**

```json
{
  "type": "gcp",
  "accountProperties":
  {
    "projectId": "exampleprojectId"
  },
  "name": "string",
  "description": "string"
}
```

**Response**

```json
{
  "type": "gcp",
  "accountProperties": {
    "gcpId": "111111111111111111111",
    "displayName": "analyt6",
    "name": "projects/example-gcp1111/serviceAccounts/exampleorg@example-gcp1111.iam.gserviceaccount.com",
    "projectId": "projectId",
    "email": "example@example-gcp1111.iam.gserviceaccount.com"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:36:05.711896Z",
  "lastModifiedDate": "YYYY-05-04T21:36:05.711896Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

### Azure (legacy)

**Request**

``json
{
  "type": "azure",
  "accountProperties":
  {
    "accountName": "string"
  },
  "name": "string",
  "description": "string",
  "secret": "string"
}
```

**Response**

```json
{
  "type": "azure",
  "secret": "value-hidden",
  "accountProperties": {
    "accountName": "string"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:36:56.112429Z",
  "lastModifiedDate": "YYYY-05-04T21:36:56.112429Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

### Azure rbac

**Request**

```json
{
  "type": "azure_rbac",
  "accountProperties":
  {
    "appId": "string",
    "tenantId": "string"
  },
  "name": "string",
  "description": "string",
  "secret": "string"
}
```

**Response**

```json
{
  "type": "azure_rbac",
  "secret": "value-hidden",
  "accountProperties": {
    "appId": "string",
    "tenantId": "string"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:37:30.747312Z",
  "lastModifiedDate": "YYYY-05-04T21:37:30.747312Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```
### Azure sas

**Request**

```json
{
  "type": "azure_sas",
  "accountProperties":
  {
    "appId": "string",
    "tenantId": "string",
    "keyVaultURI": "string",
    "keyVaultSecretName": "string"
  },
  "name": "string",
  "description": "string",
  "secret": "string"
}
```
**Response**

```json
{
  "type": "azure_sas",
  "secret": "value-hidden",
  "accountProperties": {
    "keyVaultURI": "string",
    "keyVaultSecretName": "string",
    "appId": "string",
    "tenantId": "string"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:38:01.799683Z",
  "lastModifiedDate": "YYYY-05-04T21:38:01.799683Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

### s3 (legacy)

**Request**

```json
{
  "type": "s3",
  "accountProperties":
  {
    "accessKeyID": "string"
  },
  "name": "string",
  "description": "string",
  "secret": "string"
}
```

**Response**

```json
{
  "type": "s3",
  "secret": "value-hidden",
  "accountProperties": {
    "accessKeyID": "string"
  },
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:38:40.139175Z",
  "lastModifiedDate": "YYYY-05-04T21:38:40.139175Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

### s3 role ARN

**Request**

```json
{
  "type": "s3_role_arn",
  "accountProperties": {
    "roleARN": "arn:aws:iam::{CUSTOMER_ACCOUNT_ID}:role/{ROLE ARN}",
    "userARN": "arn:aws:iam::{SERVICE_ACCOUNT_ID}:user/{USER ARN}"
  },
  "name": "string",
  "description": "string"
}
```

**Response**

```json
{
  "type": "s3_role_arn",
  "accountProperties": {
    "roleARN": "arn:aws:iam::{CUSTOMER_ACCOUNT_ID}:role/{ROLE ARN}",
    "userARN": "arn:aws:iam::{SERVICE_ACCOUNT_ID}:user/{USER ARN}"
  },
  "name": "string",
  "description": "string",
  "createdBy": "exampleuser",
  "createdDate": "YYYY-01-31T19:48:13.078921Z",
  "lastModifiedDate": "YYYY-01-31T19:48:13.078921Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```


## Creating s3 role ARN accounts

Creating an s3 role ARN account includes additional steps for specifying roles. To do this:

1. Use the GET userARN method to retrieve the userARN value.
2. Create a roleARN in the AWS portal. See AWS s3 role ARN instructions for more information.
3. Create an Adobe Cloud Locations account for the s3 ARN type with the POST create account method.
4. Include the s3 role ARN accountProperties as shown in the JSON above.





