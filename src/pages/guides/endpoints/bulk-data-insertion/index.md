---
title: Bulk Data Insertion API
description: Upload batches of data into Adobe Analytics using the API.
---

# Bulk Data Insertion API

The Bulk Data Insertion API (BDIA) is an Adobe Analytics capability that lets you upload server call data in batches of files instead of using client-side libraries such as AppMeasurement. The server calls in these batch files can be either current (live) data or historical data. It is a more scalable successor to the Data Insertion API in previous versions of the Adobe Analytics API.

Bulk Data Insertion solves several problems for a variety of use cases. Some use case examples include:

* Ingesting historical data from a previous analytics system
* An internal analytics collection system that makes it unfeasible to use AppMeasurement. You can use Extract-Transform-Load (ETL) processes to put data into batch files then use BDIA to upload them to Adobe Analytics.
* Data collection from devices that have only intermittent connectivity to the internet. These devices store up the interactions until they receive a connection. The device can then upload the data all at once via BDIA.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Prerequisites

Before using this API, make sure that all of the following are met:

* You can successfully authenticate with the API using OAuth. See [Getting started](../../index.md) to make sure that you have the correct permissions and have created an API client on Adobe Developer. Note, JWT authentication is deprecated and will only be supported until January 1, 2025. Current integrations using JWT will need to [migrate](https://developer.adobe.com/developer-console/docs/guides/authentication/ServerToServerAuthentication/migration/) to OAuth Server to Server prior to January 1, 2025.
* The desired report suite is timestamp-enabled or timestamp optional. See [Timestamps optional](https://experienceleague.adobe.com/docs/analytics/technotes/timestamps-optional.html) in the Adobe Analytics documentation. All newly created report suites are set to timestamp optional by default.
* Communicate to Adobe the expected volume of ingestion per day. Based on this information, Adobe provisions the appropriate hardware to handle that volume and creates a per-second throttle limit. If enough files are uploaded in a short amount of time to exceed the throttle limit, Adobe ingests uploaded files more slowly. These limits help ensure timely processing and availability of data for reporting. They also help protect the system from becoming overwhelmed before proper capacity is provisioned for a sharp increase in file uploads.
* Follow the established [File formatting requirements](file-format.md) for each upload.
* If using a Customer Attribute as a seed to automatically generate Experience Cloud Visitor IDs (ECID), provisioning by Adobe is required first. See [Use customer ID to identify visitors](mcseed.md).
* You are using the correct number of [Visitor Groups](visitor-groups.md) for your anticipated load. Follow the guidelines on file send frequency limits to avoid having your requests throttled or data processing out of order.
* You do not plan to upload more than 1 file per second. If rates above this level are needed, consider using the [Data Insertion API](https://developer.adobe.com/analytics-apis/docs/1.4/guides/data-insertion/) instead.

Once you meet all prerequisites, see [File format](file-format.md) to prepare your data in a format usable by the API.
