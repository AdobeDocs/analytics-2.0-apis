---
title: Use customer ID to identify visitors
description: Use the Adobe Experience Cloud Identity Service setCustomerIDs to identify visitors.
---

# Use customer ID to identify visitors

Adobe offers a way to simplify the process of generating an identifier used by the Adobe Experience Cloud Identity Service. Adobe can use one of the customer IDs in the [`setCustomerIDs`](https://experienceleague.adobe.com/docs/id-service/using/id-service-api/methods/setcustomerids.html) method as a seed for generating an Adobe Experience Cloud visitor ID for you.

## Prerequisites

Before using this method to identify visitors, make sure that all of the following are met:

* Communicate your intent to use this feature to the team responsible for the [Bulk Data Insertion API and associated format](./file-format.md). It requires coordination between this team and the Adobe Audience Manager team to provision the desired integration on the backend.
* Only one `customerIDType` can be used as a seed per IMS organization. If you attempt to set `isMCSeed` to `true` on a `customerIDType` other than the one provisioned by Adobe, it is ignored.

## File requirements

When uploading files to the BDIA API and the customer ID is the desired visitor identifier for the row, make sure that all the following are met:

* The case-sensitive `customerID.[customerIDType].id` is specified in the file's column header row. The [customerIDType] will be Audience Manager's integration code (DO NOT include brackets). 
* `customerID.[customerIDType].id` contains a value for each row
* `customerID.[customerIDType].isMCSeed` is set to `1` (true) for each row

If either of these variables are blank, Adobe falls back to other visitor identification columns. If there are no other visitor identifiers present in the row, the row is skipped. Rows that fall back to other visitor identification columns are treated as separate visitors.

## Example Integration Workflow
1. Select a field that you wish to use as a seed to generate an MCID. For example, you could choose the customer's email address.
2. Setup an integration with Audience Manager. The seed field will be your "integration code". You will also give them a preferred unique salt value. We recommend using your report suite name.
3. Audience Manager will give back to you the following fields:
   * Partner ID (pid)
   * Data Provider ID (dpid)
4. Give the following values to your consultant to pass on to the BDIA team:
   * IMS Org Id
   * Integration Code (ex. email)
   * AAM Partner ID (pid)
   * AAM Data Provider ID (dpid)
   * Salt value (ex. mycompanyreportsuite)
5. Once you are notified of successful configuration, you would include the following fields in your BDIA file:
   * customerID.email.id.  (value will be a unique email address for each user)
   * customerID.email.isMCSeed (value will be 1 for all rows)

