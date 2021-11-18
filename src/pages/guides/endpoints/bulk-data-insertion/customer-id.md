---
title: Customer ID and Experience Cloud Visitor ID seeds
description: Automatically generate an Experience Cloud ID for visitors.
---

# Customer ID and Experience Cloud Visitor ID seeds

<InlineAlert variant="info" slots="text"/>

Before using this feature, the Adobe BDIA team must coordinate with the Adobe Audience Manager team to configure the report suite for ECID auto-generation. Contact your Adobe consultant or Account Manager to initiate this process.

BDIA provides a way for a customer ID to be specified which Adobe will use as a seed to automatically generate an Experience Cloud Visitor ID. This functionality simplifies the process of generating your own ECID, which would require a separate server call for every visitor. Providing your own customer ID as a seed for an ECID is done by adding a column to specify a `customerID.[customerIDType].id` and another boolean column, `customerID.[customerIDType].ismcseed` to denote which customer ID should be used as the seed. Other columns can be used to further define the customer ID as well. See the table below for more information about the available columns.

## Customer ID columns and query string parameters

When specifying a `customerID` column, you must choose a `customerIDType` to correlate the columns to each other. The `customerIDType` can be any alpha-numeric string, and is case sensitive. If using Audience Manager, your "Integration Code" is your `customerIDType`.

For example, you have two variables that can identify a visitor: a user ID and an e-mail address. If a visitor logs in using their user ID, then you would set `customerID.userIdent.authState` to `AUTHENTICATED` and set `customerID.userIdent.id` to their user ID. If a visitor logs in using their email address, then you would set `customerID.userEmail.authState` to `AUTHENTICATED` and set `customerID.userEmail.id` to their email address.

| Header column | Query string parameter | Description |
|--|--|--|
| `customerID.[customerIDType].id` | `cid.[customerIDType].id` | The customer ID to use. |
| `customerID.[customerIDType].authState` | `cid.[customerIDType].as` | The authenticated state of the visitor. The numeric and string values are interchangeable. String values are not case sensitive. Supported values are:<br/>`0` or `UNKNOWN` or an empty string<br/>`1` or `AUTHENTICATED`<br/>`2` or `LOGGED_OUT` |
| `customerID.[customerIDType].isMCSeed` | `cid.[customerIDType].ismcseed`| Whether or not this is the seed for the Experience Cloud Visitor ID. Supported values are:<br/>`0` or `false` or an empty string<br/>`1` or `true` |

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
