---
title: Report suites API
description: Retrieve information around report suites that you can access.
---

# Report suites API

The Report suites API allow you to get information around report suites that you can access. These API calls are helpful to obtain information for use in other API calls.

## Get multiple report suites

Retrieve information about a list of report suites.

`GET https://analytics.adobe.io/api/{global_company_id}/reportsuites/collections/suites`

Returns an object that contains report suites that you can access.

## Get a single report suite

Retrieve information about a single report suite by ID.

`GET https://analytics.adobe.io/api/{global_company_id}/reportsuites/collections/suites/{REPORT_SUITE_ID}`

Returns an object that contains information around the specified report suite.

## Get time zones

Retrieves all supported time zones.

`GET https://analytics.adobe.io/api/{global_company_id}/reportsuites/reportsuites/timezones`

Returns a list of time zone ID's and their respective time zone information.
