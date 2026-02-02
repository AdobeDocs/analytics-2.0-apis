---
title: Report Suite API
description: Use Analytics Report Suite APIs to retrieve and manage report suite configuration and metadata.
---

# Report Suite API

The Analytics 2.0 Report Suite API endpoints provide methods for you to retrieve and manage Adobe Analytics report suites and their associated configuration settings. These APIs allow programmatic access to report suite metadata that is typically managed through the Adobe Analytics user interface.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

**Report Suite Management**

These endpoints provide methods for retrieving report suite identifiers and metadata:

* [GET all report suites](#get-all-report-suites): Retrieves all report suites available to the authenticated user
* [GET a single report suite](#get-a-single-report-suite): Retrieves metadata for a single report suite by ID

**Report Suite Configuration**

These endpoints provide methods for retrieving and updating report suite configuration settings:

* [GET report suite settings](#get-report-suite-settings): Retrieves configuration settings for a report suite
* [PUT report suite settings](#put-report-suite-settings): Updates configuration settings for a report suite

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.


## GET all report suites

Use this endpoint to retrieve all report suites available to the authenticated user. This endpoint is commonly used to discover valid `rsid` values for subsequent API calls.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```
[
  {
    "rsid": "examplersid1",
    "name": "Example Report Suite 1",
    "timezone": "America/Los_Angeles",
    "currency": "USD"
  },
  {
    "rsid": "examplersid2",
    "name": "Example Report Suite 2",
    "timezone": "Europe/London",
    "currency": "GBP"
  }
]
```

### Request example details

The example above retrieves all report suites accessible to the authenticated user.

#### Response example details

The example above returns a list of report suites, including:

* The report suite ID (rsid)
* The display name of the report suite
* The configured time zone
* The configured currency

#### Response parameters

| Name       | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `rsid`     | string | The report suite ID                           |
| `name`     | string | The display name of the report suite          |
| `timezone` | string | The time zone configured for the report suite |
| `currency` | string | The currency configured for the report suite  |


GET a single report suite

Use this endpoint to retrieve metadata for a single report suite.

Endpoint

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/{REPORT_SUITE_ID}`

Request and Response Examples
Request

```
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/examplersid" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

Response

```
{
  "rsid": "examplersid",
  "name": "Example Report Suite",
  "timezone": "America/Los_Angeles",
  "currency": "USD",
  "creation_date": "YYYY-MM-DD"
}
```


GET report suite settings

Use this endpoint to retrieve configuration settings for a report suite. These settings correspond to options available in the Adobe Analytics Admin UI.

Endpoint

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/{REPORT_SUITE_ID}/settings`

Request and Response Examples
Request

```
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/examplersid/settings" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

PUT report suite settings

Use this endpoint to update configuration settings for a report suite. Only administrators with appropriate permissions can update report suite settings.

Endpoint

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/{REPORT_SUITE_ID}/settings`

Request and Response Examples
Request

```
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/examplersid/settings" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "session_timeout": 45
  }'
```

Response

``
{
  "success": true,
  "message": "Report suite settings updated"
}
``


Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

HTTP code	Meaning	Description
200	Success	The request was successful
400	Bad Request	The request was improperly constructed or contained invalid parameters
401	Authentication failed	The access token is missing or invalid
403	Forbidden	The user does not have permission to access or modify the resource
404	Not found	The specified report suite or resource does not exist
500	Internal server error	A server-side error occurred

More help on this topic

Analytics API overview

Report Suite administration

API Status Codes
