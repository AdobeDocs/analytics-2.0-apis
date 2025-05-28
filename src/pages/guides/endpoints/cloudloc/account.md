---
title: Adobe Analytics Cloud Locations Account API
description: Use the Adobe Analytics Cloud Locations Account API to create accounts for cloud locations.
---

# Cloud Locations Account API

Before you can create a Cloud Location with Adobe 2.0 APIs, you must first create a Cloud location account with the APIs in this guide. The Accounts API includes the following endpoints for managing Cloud Location storage accounts:

* [GET accounts](#get-accounts): Retrieve all Cloud Locations accounts accessible to you in the specified organization. This includes accounts you have created or those that have been shared with you.
* [POST create account](#post-create-account): Create a new Cloud Locations account
* [GET account by UUID](#get-account-by-uuid): Retrieve a specific Cloud Locations account
* [PUT update account](#put-update-account): Update a specific Cloud Locations account
* [DELETE account](#delete-account): Delete a specific Cloud Locations account
* [GET s3 role arn](#get-s3-role-arn): Retrieve an `userARN` value to create an AWS s3 role arn cloud account

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
| `s3_role_arn` | Data to be exported to `s3` with Amazon Resource Name (ARN) fields for Identity and Access Management (IAM). See instructions below for creating this account type. |


Each account type has its own set of key/value pairs or parameters for the `accountProperties` object. See the Account Properties table for more information on the properties that are specific to each account type.

**Note:** With Cloud Locations APIs, accounts and locations each have their own `UUID` identifier. The account `UUID` is different from the location `UUID`, and the two should be referenced separately.

## GET accounts

Use this endpoint to retrieve all Cloud Locations accounts information that you have created or that has been shared with you in your organization.

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
      "secret": "examplepassword",
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
      "secret": "examplepassword",
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

* A response body that includes accounts with all supported types as described in the Account Types table above.

* An `accountProperties` object for each account. This object contains parameters that are specific to the type of account. For more information, see the [Account properties](#account-properties) section of this guide.

* A `uuid` identifier for each account. This is not the same as the location `uuid` that is used in the Locations API.

### Request Parameters

The following table describes the GET accounts query request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `createdBy` | optional | string | Username of account creator |
| `type` | optional | string | The type of account as described in the Account Types table |
| `page` | optional | integer | The page number to return |
| `limit` | optional | integer | Maximum number of items to show per page |

### Response Parameters

The following table describes the GET accounts response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | The type of account as described in the Account Types table |
| `secret` | string | The password associated with the type of account; e.g., `ftp` |
| `accountProperties` | object | Contains object members specific to the account type. See the **Account properties** section of this guide. |
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

Use this endpoint to create a new Cloud Locations account. 

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
    "type": "email",
    "accountProperties": {
      "to": "exampleuser@exammple.com"
  },
    "name": "Example Email Account",
    "description": "Example Email account description"
  }'
```

#### Response

```json
{
  "type": "email",
  "accountProperties": {
    "to": "exampleuser@example.com"
  },
  "name": "Example Email Account",
  "description": "Example Email account description",
  "createdBy": "exampleuser@example.com",
  "createdDate": "YYYY-06-02T16:19:04.039666Z",
  "lastModifiedDate": "YYYY-06-02T16:19:04.039666Z",
  "uuid": "12345678-1234-1234-1234-123456789123"
}

```

### Example request details

The example request above shows the creation of an email type location account. Note the `accountProperties` for this type includes only the `to` parameter and its value `exampleuser@example.com`, or the recipient of the email account.  

### Example response details

A successful response includes a `200 OK` status code and a response body similar to that shown above. This example shows the following:

* Confirmation of the created values for `type`, `to`, `name`, and `description`.

* Additional creation information including values for `createdBy`, `createdDate`, `lastModifiedDate`, and account `uuid`.

### Request Parameters

The following table describes the Create account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | required | string | Account type. See the Account Types table above for more information |
| `accountProperties` | required | object | Contains "to" parameter for recipient. See the Account properties section below for more information. |
| `name` | required | string | Account name |
| `description` | optional | string | Account description |

### Response Parameters

The following table describes theCcreate account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `accountProperties` | object | Contains "to" parameter for recipient |
| `createdDate` | string | Account creation date |
| `createdBy` | string | user creating account |
| `lastModifiedDate` | string | Last account modification date |
| `name` | string | Account name |
| `uuid` | string | The account UUID. This is not the location UUID. |

## GET account by UUID

Use this endpoint to retrieve information for a specific Cloud Locations Account.

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
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
```

#### Response

```json
{
      "type": "ftp",
      "accountProperties": {
        "port": 21,
        "hostname": "ftp.example.com",
        "username": "exampleuser"
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
}
```

### Example details

In this example, the account `{UUID}` is provided in the path as `bee11111-1e11-111b-111f-dd11c6b1111e`. The response shows the details for an `ftp` type account. This is similar to the response for the same type of account in the GET accounts endpoint described above.

### Request and Response Parameters

This endpoint contains parameters described in prevoius sections.

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
  -d '{
    "type": "s3",
    "accountProperties": 
    {
    "accessKeyID": "examplekeyID"
    },
    "name": "Example Updated Account",
    "description": "Example updated account description",
    "sharedTo": "exampleuser2@example.com"
    "secret": "********"
    }'
```

#### Response

```json
{
  "type": "s3",
  "secret": "examplepassword",
  "accountProperties": {
    "accessKeyID": "examplekeyID"
  },
  "name": "Example Updated Account",
  "description": "Example updated account description",
  "sharedTo": "exampleuser2@example.com",
  "createdBy": "exampleuser@example.com",
  "createdDate": "YYYY-05-04T21:38:40.139175Z",
  "lastModifiedDate": "YYYY-06-01T21:38:40.139175Z",
  "uuid": "bee11111-1e11-111b-111f-dd11c6b1111e"
}
```

### Example details

The example request above updates an `s3` type account so that it is shared to `exampleuser2@exammple.com`. Note this is confirmed in the response and the `lastModifiedDate` includes the updated date value.


### Request Parameters

The following table describes the request parameters not already defined above:

| Name | Required | Type | Description |
| --- | --- | --- | --- |

| `secret` | required | string | Account password |
| `accountProperties` | required | object | Includes the `AccessKeyID` parameter for the `s3` type account |
| `sharedTo` | optional | string | User to receive account sharing privileges |

### Response Parameters

The response parameters for this example are already described in previous sections.

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
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
```

#### Response

```json
{
  "message": "Account deleted successfully",
  "uuid": "bee11111-1e11-111b-111f-dd11c6b1111e"
}
```

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
  "accountProperties":{},
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
  "accountProperties": {},
  "name": "string",
  "description": "string",
  "createdBy": "string",
  "createdDate": "YYYY-05-04T21:38:40.139175Z",
  "lastModifiedDate": "YYYY-05-04T21:38:40.139175Z",
  "uuid": "111bc1a1-1d11-1111-1111-dd1d111ec11f"
}
```

**Note**: The s3 type account currently contains no account properties.

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

An s3 Role ARN (Amazon Resource Name) is a unique identifier for an IAM role that grants permissions to access an S3 bucket. It's used to specify which role should be assumed when granting temporary credentials or when configuring other AWS services to interact with S3. To create an Adobe Analytics cloud location account to associate with an s3 role ARN, follow these steps:

1. Use the GET s3 role arn method to retrieve the userARN value, as described below.
2. Create a roleARN in the AWS portal. See AWS s3 role ARN instructions for more information.
3. Create an Adobe Cloud Locations account for the s3 ARN type with the POST create account method.
4. Include the s3 role ARN `accountProperties` as shown in the JSON above.

## GET s3 role arn

Use this endpoint to retrieve information for a specific Cloud Locations Account.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/account/{UUID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/export_locations/analytics/exportlocations/cloudAccount/account/s3_role_arn" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
```

#### Response

```json
{
  "userARN": "arn:aws:iam::874017777777:user/S-df-rest-api"
}
```

### Example details

In the examples above, the GET s3 role arn method is used to request the userARN value. The value is provided in the response and can be used to create a roleARN in the AWS portal. After creating the roleARN, you can create a cloud locations account with the POST create account method described in a previous section. See the Account Properties section in this guide to provide a complete POST request.  

For more information, see the following:

* [Cloud Locations API overview](cloudloc/index.md)
* [Cloud Locations API methods endpoint guide](cloudloc/locations.md)
