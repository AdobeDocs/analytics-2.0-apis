---
title: Bulk Data Insertion API
description: Upload batches of data into Adobe Analytics using the API.
---

# Bulk Data Insertion API

The Bulk Data Insertion API (BDIA) is an Adobe Analytics capability that lets you upload server call data in batches of files instead of using client-side libraries such as AppMeasurement. The server calls in these batch files can be either current (live) data or historical data. It is a more scalable successor to the Data Insertion API in previous Adobe Analytics API versions.

Bulk Data Insertion solves several problems for a variety of use cases. Some use case examples include:

* Ingesting historical data from a previous analytics system
* An internal analytics collection system that makes it unfeasible to use AppMeasurement. You can use Extract-Transform-Load (ETL) processes to put data into batch files then use BDIA to upload them to Adobe Analytics.
* Data collection from devices that have only intermittent connectivity to the internet. These devices store up the interactions until they receive a connection. The device can then upload the data all at once via BDIA.

## Prerequisites

Before using the BDIA, make sure that all of the following are met:

* You successfully authenticate with the API using JWT. OAuth is not supported. See [Getting started](../../index.md) to make sure that you have the correct permissions, create an API client on Adobe I/O, and that you successfully authenticate.
* The desired report suite is timestamp-enabled or timestamp optional. See [Timestamps optional](https://experienceleague.adobe.com/docs/analytics/technotes/timestamps-optional.html) in the Adobe Analytics documentation. All newly created report suites are set to timestamp optional by default.
* Communicate to Adobe the expected volume of ingestion per day. Based on this information, Adobe provisions the appropriate hardware to handle that volume and creates a per-second throttle limit. If enough files are uploaded in a short amount of time to exceed the throttle limit, Adobe ingests uploaded files more slowly. These limits help ensure timely processing and availability of data for reporting. They also help protect the system from becoming overwhelmed before proper capacity is provisioned for a sharp increase in file uploads.
* Follow the established [File formatting requirements](file-formatting.md) for each upload.
* If using Experience Cloud IDs to identify visitors, provisioning by Adobe is required. See [Customer ID and Experience Cloud Visitor ID seeds](customer-id.md) for more information.
* If uploading more than one file at a time, use the correct number of [Visitor Groups](visitor-groups.md). Follow the guidelines on file send frequency limits to avoid data processing out of order.

Once you meet all prerequisites, see [File format](file-format.md) to prepare your data in a format usable by the API.
