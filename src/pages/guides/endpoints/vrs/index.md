---
title: Virtual report suites endpoint
description: Create, edit, or delete virtual report suites using the API.
---

# Virtual report suites endpoint

The Virtual report suites endpoint allows you to programmatically create, edit or delete [Virtual report suites](https://experienceleague.adobe.com/docs/analytics/components/virtual-report-suites/vrs-about.html).

## Retrieve a list of virtual report suites

Returns an object containing all report suites that match the criteria.

`GET https://analytics.adobe.io/reportsuites/virtualreportsuites/`

## Retrieve a single virtual report suite

Returns details around the specific virtual report suite.

`GET https://analytics.adobe.io/reportsuites/virtualreportsuites/{ID}`

## Create a virtual report suite

Programmatically create a virtual report suite. A JSON body is required with this call. See [JSON body reference](reference.md) for all supported parameters, and [Examples](examples.md) for ways to formulate the JSON body.

`POST https://analytics.adobe.io/reportsuites/virtualreportsuites/`

## Edit an existing virtual report suite

Edit a virtual report suite. A JSON body is required with this call, containing the desired settings to update.

`PUT https://analytics.adobe.io/reportsuites/virtualreportsuites/{ID}`

## Delete a virtual report suite

Deletes a virtual report suite.

`DELETE https://analytics.adobe.io/reportsuites/virtualreportsuites/{ID}`
