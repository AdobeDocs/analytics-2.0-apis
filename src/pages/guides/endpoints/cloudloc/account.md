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


