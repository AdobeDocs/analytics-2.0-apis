---
title: Adobe Analytics Cloud API account properties
description: Include Cloud API account properties
---

# Cloud API account properties

Before you can create a cloud Location with Adobe 2.0 APIs, you must first create a [Cloud API account](cloudloc/account.md). When working with a cloud API account, you must specify the appropriate account properties with the `type` of account you are creating or managing. Each account type has its own set of key/value pairs or parameters for the `accountProperties` object. The following JSON includes all of the account properties request and response parameters for each account type.


## Email

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

## FTP

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

## SFTP

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

## GCP

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

## Azure (legacy)

**Request**

```json
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

## Azure rbac

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

## Azure sas

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

## s3 (legacy)

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

## s3 role ARN

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

