---
title: Adobe Analytics Cloud API overview
description: Use the Adobe Analytics Cloud APIs to manage export locations for analytics data.
---

# Cloud API overview

The Adobe Analytics 2.0 Cloud API endpoints provide methods to manage export Locations for analytics data. Adobe cloud Locations are configured within Adobe Cloud API accounts--a separate API service within Adobe Analytics 2.0 Cloud APIs. Adobe Cloud API accounts are developed to work with various cloud storage service providers. Use these APIs to create, read, update, and delete Adobe cloud API accounts and Locations for exporting data. 

<InlineAlert variant="info" slots="text" />

A cloud "Location" is the Adobe term for an Adobe API connection to any third-party cloud storage service, as configured within the Adobe Cloud Accounts API. It does not refer to a specific physical location on a server.

You can use Cloud APIs for the following:

* Exporting files using Data Feed APIs

* Exporting reports using Data Warehouse APIs

* Working with Classification APIs

These APIs include two service categories:

* [**Analytics Cloud Accounts API**](account.md)

* [**Analytics Cloud Locations API**](locations.md)
  
To export data to a cloud Location, you must first [create a cloud location account](account.md). After creating the account, you can create as many locations on that account as you need.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

