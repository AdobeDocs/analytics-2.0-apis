---
title: Customer ID and Experience Cloud Visitor ID seeds
description: Automatically generate an Experience Cloud ID for visitors.
---

# Customer ID and Experience Cloud Visitor ID Seeds

BDIA provides a way for a customer ID to be specified which Adobe will use as a seed to automatically generate an Experience Cloud Visitor ID. This functionality simplifies the process of generating your own ecid, which would require a separate server call for every visitor. Providing your own customer ID as a seed for an ecid is done by adding a column to specify a `customerID.[customerIDType].id` and another boolean column, `customerID.[customerIDType].ismcseed` to denote which customer ID should be used as the seed. Other columns can be used to further define the customer ID as well. See the table below for more information about the available columns.

*Note: In order to utilize this feature, Adobe must coordinate with the Audience Manager team to have the report suite configured for ECID auto-generation, and make some configuration changes to BDIA to support this feature. Please have your customer support contact or consultant reach out to Adobe to initiate this process.*

## Customer ID Columns and Query String Parameters

When specifying a customerID column, you must choose a customerIDType to correlate the columns to each other. The customerIDType can be any alphanumeric string, but it should be considered case sensitive. For example, if there was a user ID and also an e-mail that an Analytics customer wanted to send into Analytics, they could choose "userIdent" and "userEmail," respectively, for the two customerIDTypes. If the end-user logs in using their user ID then a customer could specify `customerID.userIdent.authState` set to `AUTHENTICATED` in the data field for a user that is logged in, and `customerID.userIdent.id` would be set to their user ID.

|Header/Column Name|Query String Parameter Equivalent|Field Description|
|--|--|--|
| `customerID.[customerIDType].id` | `cid.[customerIDType].id` | The customer ID to use. |
| `customerID.[customerIDType].authState` | `cid.[customerIDType].as` | The authenticated state of the visitor. The numeric and string values are interchangeable. String values are not case sensitive. Supported values are:<br />`0` or `UNKNOWN` or an empty string<br />`1` or `AUTHENTICATED`<br />`2` or `LOGGED_OUT` |
| `customerID.[customerIDType].isMCSeed` | `cid.[customerIDType].ismcseed`| Whether or not this is the seed for the Experience Cloud Visitor ID. Supported values are:<br />`0` or `false` or an empty string<br />`1` or `true` |

## Customer ID Validation Rules

The following validation rules are applicable to the Customer ID columns:

* The `customerIDType` cannot be empty
* The `authState` and `isMCSeed` must be one of the valid values stated in the table above.
* At least one of the following Visitor IDs must be provided in each row:
  * `customerID.[customerIDType].id` with `customerID.[customerIDType].isMCSeed` set to `true`
  * `VisitorID`
  * `MarketingCloudVisitorID`
  * `ipAddress`
* If `isMCSeed` is `true`, `customerID` cannot be empty
* There can only be ONE field specified as the `isMCSeed` per IMS Organization. This field name must be communicated to Adobe's BDIA team for provisioning before use.
