---
title: Adobe Analytics Cloud Locations API overview
description: Use the Adobe Analytics Cloud Locations API to manage export locations for analytics data.
---

# Cloud Locations API overview

The Adobe Analytics 2.0 Cloud Locations API endpoints provide methods for managing export locations for analytics data. Use this API to create, read, update, and delete cloud storage accounts and locations for exporting data. 

You can use Cloud Locations APIs for the following:

* Exporting files using Data Feed APIs

* Exporting reports using Data Warehouse APIs

* Working with Classification APIs

This API includes two service categories:

* [**Analytics Cloud Locations Account API**](account.md)

* [**Analytics Cloud Locations Location API**](locations.md)
  
To export data to a cloud location, you must first [create a cloud location account](account.md). After creating the account, you can create as many locations on that account as you need.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.







## Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

| HTTP code | Meaning | Description |
| --- | --- | --- |
| 200 | Success | The request is successful. |
| 400 | Bad Request | The request was improperly constructed, missing key information, and/or contained incorrect syntax. This error code could indicate a problem such as a missing required parameter or the supplied data did not pass validation. |
| 401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. Similarly, you may have attempted to access an object that requires administrator permissions. |
| 403 | Forbidden | The resource was found, but you do not have the right credentials to view it. You might not have the required permissions to access or edit the resource for reasons not applicable to status code 401. |
| 404 | Not found | The requested resource could not be found on the server. The resource may have been deleted, or the requested path was entered incorrectly. |
| 500 | Internal server errors | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. Try your request again in a few minutes, and contact your administrator if the problem persists. |

