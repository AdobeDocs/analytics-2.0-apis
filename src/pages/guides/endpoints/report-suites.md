---
title: Report suites API
description: Retrieve information around report suites that you can access.
---

# Report suites API

The Report suites API allow you to get information around report suites that you can access. These API calls are helpful to obtain information for use in other API calls.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Get multiple report suites

Retrieve information about a list of report suites.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/collections/suites`

Returns an object that contains report suites that you can access.

## Get a single report suite

Retrieve information about a single report suite by ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/collections/suites/{REPORT_SUITE_ID}`

Returns an object that contains information around the specified report suite.

## Get time zones

Retrieves all supported time zones.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/reportsuites/timezones`

Returns a list of time zone ID's and their respective time zone information.
