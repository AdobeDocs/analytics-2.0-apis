---
title: Use customer ID to identify visitors
description: Use the Adobe Experience Cloud Identity Service setCustomerIDs to identify visitors.
---

# Use customer ID to identify visitors

Adobe offers a way to simplify the process of generating an identifier used by the Adobe Experience Cloud Identity Service. Adobe can use one of the customer IDs in the [`setCustomerIDs`](https://experienceleague.adobe.com/docs/id-service/using/id-service-api/methods/setcustomerids.html) method as a seed for generating an Adobe Experience Cloud visitor ID for you.

## Prerequisites

Before using this method to identify visitors, make sure that all of the following are met:

* Communicate to Adobe the desired customer ID attribute (`customerIDType`) that you want to use. Adobe's BDIA team provisions the desired ID on the backend. If you use Adobe Audience Manager, the **Integration Code** is your `customerIDType`. Communicate your use of Audience Manager to the BDIA team to help streamline the provisioning process.
* Only one `customerIDType` can be used as a seed per IMS organization. If you attempt to set `isMCSeed` to `true` on a `customerIDType` other than the one provisioned by Adobe, it is ignored.

## File requirements

When uploading files to the BDIA API and the customer ID is the desired visitor identifier for the row, make sure that all the following are met:

* The `customerID.[customerIDType].id` provisioned to use as the seed contains a value.
* `customerID.[customerIDType].isMCSeed` is set to `1` (true).

If either of these variables are blank, Adobe falls back to other visitor identification columns. If there are no other visitor identifiers present in the row, the row is skipped. Rows that fall back to other visitor identification columns are treated as completely separate visitors unless you use [Cross-Device Analytics](https://experienceleague.adobe.com/docs/analytics/components/cda/overview.html).
