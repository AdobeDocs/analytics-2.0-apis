---
title: Report Suites API
description: Use Analytics Report Suites APIs to manage report suites and virtual report suites.
---

# Report Suites API

The Analytics 2.0 Report Suites API endpoints provide methods for you to create and retrieve report suites, manage virtual report suites, and fetch supported timezones. The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

**Collections Suites**

These endpoints provide methods for retrieving report suites in the collections service:

* [GET a suite](#get-a-suite): Retrieves a single suite by ID
* [GET all suites](#get-all-suites): Retrieves many report suites using search criteria

**Virtual Report Suites**

These endpoints provide methods for searching, creating, updating, validating, and deleting virtual report suites:

* [GET all virtual report suites](#get-all-virtual-report-suites): Retrieves many virtual report suites using search criteria
* [POST a virtual report suite](#post-a-virtual-report-suite): Creates a new virtual report suite
* [GET a virtual report suite](#get-a-virtual-report-suite): Retrieves a single virtual report suite by ID
* [PUT a virtual report suite](#put-a-virtual-report-suite): Updates configuration for a virtual report suite
* [DELETE a virtual report suite](#delete-a-virtual-report-suite): Deletes or disables a virtual report suite by ID
* [POST validate a virtual report suite](#post-validate-a-virtual-report-suite): Validates a virtual report suite configuration
* [POST search virtual report suites](#post-search-virtual-report-suites): Retrieves many virtual report suites using a search body

**Report Suites**

These endpoints provide methods for retrieving timezones and creating report suites:

* [GET timezones](#get-timezones): Retrieves all supported timezones
* [POST a report suite](#post-a-report-suite): Creates a new report suite

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## GET a suite

Use this endpoint to retrieve a single report suite by ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/collections/suites/{RSID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/collections/suites/examplersid?expansion=name,currency" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "rsid": "examplersid",
  "id": "examplersid",
  "name": "Example Suite",
  "currency": "USD",
  "calendarType": {
    "rsid": "examplersid",
    "anchorDate": "2024-01-01T00:00:00Z",
    "type": "GREGORIAN"
  },
  "timezoneZoneinfo": "US/Pacific"
}
```

#### Request example details

The example above requests the report suite with the ID `examplersid` and expands the `name` and `currency` fields.

#### Response example details

The example above returns a report suite with core metadata, including the `rsid`, `name`, and `currency`.

### Request Parameters

The GET a suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `rsid` | required | string | The report suite ID to retrieve |
| `expansion` | optional | string | Comma-delimited list of additional suite metadata fields to include |

### Response Parameters

The following table describes the GET a suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `rsid` | string | Report suite ID |
| `id` | string | Suite ID |
| `name` | string | Suite name |
| `parentRsid` | string | Parent report suite ID for a virtual report suite |
| `currency` | string | Suite currency |
| `timezoneZoneinfo` | string | Suite friendly timezone name |
| `calendarType` | object | Calendar configuration for the suite |
| `calendarType.rsid` | string | Report suite ID for the calendar |
| `calendarType.anchorDate` | string | Anchor date for the calendar (date-time) |
| `calendarType.type` | string | Calendar type |

## GET all suites

Use this endpoint to retrieve many report suites using the provided search criteria.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/collections/suites`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/collections/suites?limit=10&page=0&rsidContains=example" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
[
  {
    "rsid": "examplersid",
    "id": "examplersid",
    "name": "Example Suite",
    "timezoneZoneinfo": "US/Pacific"
  }
]
```

#### Request example details

The example above requests the first page of report suites whose `rsid` contains `example`.

#### Response example details

The example above returns a list of suites that match the search criteria.

### Request Parameters

The GET all suites endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `limit` | optional | string | Number of results per page |
| `page` | optional | string | Page number (base 0 - first page is "0") |
| `expansion` | optional | string | Comma-delimited list of additional suite metadata fields to include |
| `rsids` | optional | string | Filter list to only include suites in this RSID list (comma-delimited) |
| `rsidContains` | optional | string | Filter list to only include suites whose rsid contains rsidContains |

### Response Parameters

The following table describes the GET all suites response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `rsid` | string | Report suite ID |
| `id` | string | Suite ID |
| `name` | string | Suite name |
| `parentRsid` | string | Parent report suite ID for a virtual report suite |
| `currency` | string | Suite currency |
| `timezoneZoneinfo` | string | Suite friendly timezone name |
| `calendarType` | object | Calendar configuration for the suite |

## GET all virtual report suites

Use this endpoint to retrieve many virtual report suites using search criteria.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites?limit=10&page=0&idContains=example" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
[
  {
    "id": "vrs_12345",
    "name": "Example VRS",
    "parentRsid": "examplersid",
    "segmentList": [
      "seg_001"
    ],
    "timezoneZoneinfo": "US/Pacific"
  }
]
```

#### Request example details

The example above requests the first page of virtual report suites whose IDs contain `example`.

#### Response example details

The example above returns a list of virtual report suites that match the search criteria.

### Request Parameters

The GET all virtual report suites endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `limit` | optional | string | Number of results per page |
| `page` | optional | string | Page number (base 0 - first page is "0") |
| `expansion` | optional | string | Comma-delimited list of additional metadata fields to include |
| `filterByIds` | optional | string | Filter list to only include specified virtual report suites |
| `idContains` | optional | string | Filter list to only include suites whose id contains idContains |
| `segmentIds` | optional | string | Filter list to only include virtual report suites that have a segment in this comma-delimited list of segment IDs |

### Response Parameters

The following table describes the GET all virtual report suites response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Virtual report suite ID |
| `name` | string | Virtual report suite name |
| `parentRsid` | string | Parent report suite ID |
| `segmentList` | array | Segment IDs used by the virtual report suite |
| `timezoneZoneinfo` | string | Friendly timezone name |
| `description` | string | Description of the virtual report suite |
| `dataSchema` | string | Data schema type |
| `currentTimezoneOffset` | number | Current timezone offset |
| `modified` | string | Last modified date-time |
| `isDeleted` | boolean | Whether the suite is deleted |
| `dataCurrentAsOf` | string | Data current as of date-time |
| `compatibility` | object | Validation compatibility results |
| `sessionDefinition` | object | Session definition settings |
| `curatedComponents` | array | Curated component list |
| `type` | string | Virtual report suite type |
| `backgroundSessionsEnabled` | boolean | Whether background sessions are enabled |
| `globalCompanyKey` | string | Global company key |
| `parentRsidName` | string | Parent report suite name |
| `timezone` | integer | Timezone ID |
| `reportSuiteName` | string | Report suite name |
| `owner` | object | Owner information |

## POST a virtual report suite

Use this endpoint to create a virtual report suite. The following attributes are required: `name`, `parentRsid`, and `segmentList`.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "name": "Example VRS",
    "parentRsid": "examplersid",
    "segmentList": ["seg_001", "seg_002"],
    "description": "Example virtual report suite"
  }'
```

#### Response

```json
{
  "id": "vrs_12345",
  "name": "Example VRS",
  "parentRsid": "examplersid",
  "segmentList": [
    "seg_001",
    "seg_002"
  ],
  "description": "Example virtual report suite"
}
```

#### Request example details

The example above creates a virtual report suite named `Example VRS` with two segments.

#### Response example details

The example above returns the created virtual report suite and its assigned `id`.

### Request Parameters

The POST a virtual report suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `expansion` | optional | string | Comma-delimited list of additional metadata fields to include |
| `name` | required | string | Virtual report suite name |
| `parentRsid` | required | string | Parent report suite ID |
| `segmentList` | required | array | Segment IDs used by the virtual report suite |
| `description` | optional | string | Description of the virtual report suite |
| `dataSchema` | optional | string | Data schema type |
| `sessionDefinition` | optional | object | Session definition settings |
| `curatedComponents` | optional | array | Curated component list |
| `timezone` | optional | integer | Timezone ID |
| `timezoneZoneinfo` | optional | string | Friendly timezone name |
| `type` | optional | string | Virtual report suite type |
| `backgroundSessionsEnabled` | optional | boolean | Whether background sessions are enabled |
| `owner` | optional | object | Owner information |
| `compatibility` | optional | object | Compatibility results |
| `dataCurrentAsOf` | optional | string | Data current as of date-time |
| `modified` | optional | string | Last modified date-time |
| `isDeleted` | optional | boolean | Whether the suite is deleted |
| `globalCompanyKey` | optional | string | Global company key |
| `parentRsidName` | optional | string | Parent report suite name |
| `reportSuiteName` | optional | string | Report suite name |
| `currentTimezoneOffset` | optional | number | Current timezone offset |
| `curationEnabled` | optional | boolean | Whether curation is enabled |
| `internal` | optional | boolean | Whether the suite is internal |
| `siteTitle` | optional | string | Site title |
| `rsid` | optional | string | Report suite ID |

### Response Parameters

The following table describes the POST a virtual report suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Virtual report suite ID |
| `name` | string | Virtual report suite name |
| `parentRsid` | string | Parent report suite ID |
| `segmentList` | array | Segment IDs used by the virtual report suite |
| `description` | string | Description of the virtual report suite |
| `dataSchema` | string | Data schema type |
| `sessionDefinition` | object | Session definition settings |
| `curatedComponents` | array | Curated component list |
| `timezone` | integer | Timezone ID |
| `timezoneZoneinfo` | string | Friendly timezone name |
| `type` | string | Virtual report suite type |
| `backgroundSessionsEnabled` | boolean | Whether background sessions are enabled |
| `owner` | object | Owner information |
| `compatibility` | object | Compatibility results |
| `dataCurrentAsOf` | string | Data current as of date-time |
| `modified` | string | Last modified date-time |
| `isDeleted` | boolean | Whether the suite is deleted |
| `globalCompanyKey` | string | Global company key |
| `parentRsidName` | string | Parent report suite name |
| `reportSuiteName` | string | Report suite name |
| `currentTimezoneOffset` | number | Current timezone offset |
| `curationEnabled` | boolean | Whether curation is enabled |
| `internal` | boolean | Whether the suite is internal |
| `siteTitle` | string | Site title |
| `rsid` | string | Report suite ID |

## GET a virtual report suite

Use this endpoint to retrieve a single virtual report suite by ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/{ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/vrs_12345" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "id": "vrs_12345",
  "name": "Example VRS",
  "parentRsid": "examplersid",
  "segmentList": [
    "seg_001"
  ],
  "timezoneZoneinfo": "US/Pacific"
}
```

#### Request example details

The example above requests the virtual report suite with the ID `vrs_12345`.

#### Response example details

The example above returns the virtual report suite and its core metadata.

### Request Parameters

The GET a virtual report suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `id` | required | string | The virtual report suite ID to retrieve |
| `expansion` | optional | string | Comma-delimited list of additional metadata fields to include |

### Response Parameters

The following table describes the GET a virtual report suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Virtual report suite ID |
| `name` | string | Virtual report suite name |
| `parentRsid` | string | Parent report suite ID |
| `segmentList` | array | Segment IDs used by the virtual report suite |
| `timezoneZoneinfo` | string | Friendly timezone name |
| `description` | string | Description of the virtual report suite |
| `dataSchema` | string | Data schema type |
| `currentTimezoneOffset` | number | Current timezone offset |
| `modified` | string | Last modified date-time |
| `isDeleted` | boolean | Whether the suite is deleted |
| `dataCurrentAsOf` | string | Data current as of date-time |
| `compatibility` | object | Validation compatibility results |
| `sessionDefinition` | object | Session definition settings |
| `curatedComponents` | array | Curated component list |
| `type` | string | Virtual report suite type |
| `backgroundSessionsEnabled` | boolean | Whether background sessions are enabled |
| `globalCompanyKey` | string | Global company key |
| `parentRsidName` | string | Parent report suite name |
| `timezone` | integer | Timezone ID |
| `reportSuiteName` | string | Report suite name |
| `owner` | object | Owner information |
| `rsid` | string | Report suite ID |

## PUT a virtual report suite

Use this endpoint to update the configuration for a virtual report suite.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/{ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'PUT' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/vrs_12345" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "name": "Example VRS (Updated)",
    "parentRsid": "examplersid",
    "segmentList": ["seg_001", "seg_003"]
  }'
```

#### Response

```json
{
  "id": "vrs_12345",
  "name": "Example VRS (Updated)",
  "parentRsid": "examplersid",
  "segmentList": [
    "seg_001",
    "seg_003"
  ]
}
```

#### Request example details

The example above updates the virtual report suite name and segment list.

#### Response example details

The example above returns the updated virtual report suite.

### Request Parameters

The PUT a virtual report suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `id` | required | string | The virtual report suite ID to update |
| `expansion` | optional | string | Comma-delimited list of additional metadata fields to include |
| `name` | required | string | Virtual report suite name |
| `parentRsid` | required | string | Parent report suite ID |
| `segmentList` | required | array | Segment IDs used by the virtual report suite |
| `description` | optional | string | Description of the virtual report suite |
| `dataSchema` | optional | string | Data schema type |
| `sessionDefinition` | optional | object | Session definition settings |
| `curatedComponents` | optional | array | Curated component list |
| `timezone` | optional | integer | Timezone ID |
| `timezoneZoneinfo` | optional | string | Friendly timezone name |
| `type` | optional | string | Virtual report suite type |
| `backgroundSessionsEnabled` | optional | boolean | Whether background sessions are enabled |
| `owner` | optional | object | Owner information |
| `compatibility` | optional | object | Compatibility results |
| `dataCurrentAsOf` | optional | string | Data current as of date-time |
| `modified` | optional | string | Last modified date-time |
| `isDeleted` | optional | boolean | Whether the suite is deleted |
| `globalCompanyKey` | optional | string | Global company key |
| `parentRsidName` | optional | string | Parent report suite name |
| `reportSuiteName` | optional | string | Report suite name |
| `currentTimezoneOffset` | optional | number | Current timezone offset |
| `curationEnabled` | optional | boolean | Whether curation is enabled |
| `internal` | optional | boolean | Whether the suite is internal |
| `siteTitle` | optional | string | Site title |
| `rsid` | optional | string | Report suite ID |

### Response Parameters

The following table describes the PUT a virtual report suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Virtual report suite ID |
| `name` | string | Virtual report suite name |
| `parentRsid` | string | Parent report suite ID |
| `segmentList` | array | Segment IDs used by the virtual report suite |
| `description` | string | Description of the virtual report suite |
| `dataSchema` | string | Data schema type |
| `sessionDefinition` | object | Session definition settings |
| `curatedComponents` | array | Curated component list |
| `timezone` | integer | Timezone ID |
| `timezoneZoneinfo` | string | Friendly timezone name |
| `type` | string | Virtual report suite type |
| `backgroundSessionsEnabled` | boolean | Whether background sessions are enabled |
| `owner` | object | Owner information |
| `compatibility` | object | Compatibility results |
| `dataCurrentAsOf` | string | Data current as of date-time |
| `modified` | string | Last modified date-time |
| `isDeleted` | boolean | Whether the suite is deleted |
| `globalCompanyKey` | string | Global company key |
| `parentRsidName` | string | Parent report suite name |
| `reportSuiteName` | string | Report suite name |
| `currentTimezoneOffset` | number | Current timezone offset |
| `curationEnabled` | boolean | Whether curation is enabled |
| `internal` | boolean | Whether the suite is internal |
| `siteTitle` | string | Site title |
| `rsid` | string | Report suite ID |

## DELETE a virtual report suite

Use this endpoint to delete or disable a virtual report suite by ID.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/{ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/vrs_12345" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "result": "success",
  "message": "Virtual report suite deleted"
}
```

#### Request example details

The example above deletes the virtual report suite with the ID `vrs_12345`.

#### Response example details

The example above confirms the virtual report suite was deleted.

### Request Parameters

The DELETE a virtual report suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `id` | required | string | The virtual report suite ID to delete |

### Response Parameters

The following table describes the DELETE a virtual report suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `result` | string | Operation result |
| `message` | string | Result message |

## POST validate a virtual report suite

Use this endpoint to validate a virtual report suite configuration without creating it.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/validate`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/validate" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "name": "Example VRS",
    "parentRsid": "examplersid",
    "segmentList": ["seg_001", "seg_002"]
  }'
```

#### Response

```json
{
  "valid": true,
  "validator_version": "1.0.0",
  "message": "Configuration is valid",
  "supported_products": [
    "Analytics"
  ]
}
```

#### Request example details

The example above validates a virtual report suite configuration before creation.

#### Response example details

The example above indicates the configuration is valid and compatible.

### Request Parameters

The POST validate a virtual report suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `name` | required | string | Virtual report suite name |
| `parentRsid` | required | string | Parent report suite ID |
| `segmentList` | required | array | Segment IDs used by the virtual report suite |
| `description` | optional | string | Description of the virtual report suite |
| `dataSchema` | optional | string | Data schema type |
| `sessionDefinition` | optional | object | Session definition settings |
| `curatedComponents` | optional | array | Curated component list |
| `timezone` | optional | integer | Timezone ID |
| `timezoneZoneinfo` | optional | string | Friendly timezone name |
| `type` | optional | string | Virtual report suite type |
| `backgroundSessionsEnabled` | optional | boolean | Whether background sessions are enabled |

### Response Parameters

The following table describes the POST validate a virtual report suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `valid` | boolean | Whether the configuration is valid |
| `validator_version` | string | Validator version |
| `message` | string | Validation message |
| `supported_products` | array | Supported product list |

## POST search virtual report suites

Use this endpoint to retrieve many virtual report suites using a search body.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/search`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/virtualreportsuites/search?limit=10&page=0" \
  -H "accept: application/json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  --data "filterByIds=vrs_12345,vrs_67890&idContains=example&segmentIds=seg_001"
```

#### Response

```json
[
  {
    "id": "vrs_12345",
    "name": "Example VRS",
    "parentRsid": "examplersid"
  }
]
```

#### Request example details

The example above searches for virtual report suites by ID list and segment IDs.

#### Response example details

The example above returns a list of matching virtual report suites.

### Request Parameters

The POST search virtual report suites endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `limit` | optional | string | Number of results per page |
| `page` | optional | string | Page number (base 0 - first page is "0") |
| `expansion` | optional | string | Comma-delimited list of additional metadata fields to include |
| `filterByIds` | optional | string | Filter list to only include specified virtual report suites |
| `idContains` | optional | string | Filter list to only include suites whose id contains idContains |
| `segmentIds` | optional | string | Filter list to only include virtual report suites that have a segment in this comma-delimited list of segment IDs |

### Response Parameters

The following table describes the POST search virtual report suites response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Virtual report suite ID |
| `name` | string | Virtual report suite name |
| `parentRsid` | string | Parent report suite ID |
| `segmentList` | array | Segment IDs used by the virtual report suite |
| `timezoneZoneinfo` | string | Friendly timezone name |
| `description` | string | Description of the virtual report suite |
| `dataSchema` | string | Data schema type |
| `currentTimezoneOffset` | number | Current timezone offset |
| `modified` | string | Last modified date-time |
| `isDeleted` | boolean | Whether the suite is deleted |
| `dataCurrentAsOf` | string | Data current as of date-time |
| `compatibility` | object | Validation compatibility results |
| `sessionDefinition` | object | Session definition settings |
| `curatedComponents` | array | Curated component list |
| `type` | string | Virtual report suite type |
| `backgroundSessionsEnabled` | boolean | Whether background sessions are enabled |
| `globalCompanyKey` | string | Global company key |
| `parentRsidName` | string | Parent report suite name |
| `timezone` | integer | Timezone ID |
| `reportSuiteName` | string | Report suite name |
| `owner` | object | Owner information |
| `rsid` | string | Report suite ID |

## GET timezones

Use this endpoint to retrieve all supported timezones.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/reportsuites/timezones`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/reportsuites/timezones" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
[
  {
    "timezoneId": 121,
    "name": "Pacific Time",
    "timezoneZoneinfo": "US/Pacific",
    "currentTimezoneOffset": -8
  }
]
```

#### Request example details

The example above requests the list of supported timezones.

#### Response example details

The example above returns a timezone entry with its ID and friendly name.

### Request Parameters

The GET timezones endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |

### Response Parameters

The following table describes the GET timezones response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `timezoneId` | integer | Timezone ID |
| `name` | string | Timezone name |
| `timezoneZoneinfo` | string | Timezone zoneinfo value |
| `currentTimezoneOffset` | number | Current timezone offset |

## POST a report suite

Use this endpoint to create a new standard report suite. The proposed RSID must begin with the prefix of the owning company.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/reportsuites/{RSID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reportsuites/reportsuites/examplersid?copySettingsFromRsid=templatesuite" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d '{
    "name": "Example Report Suite",
    "hitsPerDay": 500000,
    "timezone": "US/Pacific",
    "signUpDate": "2024-01-01",
    "baseUrl": "example.com",
    "currencyCode": "USD"
  }'
```

#### Response

```json
{
  "rsid": "examplersid",
  "created": true,
  "axleActivated": true
}
```

#### Request example details

The example above creates a report suite with the ID `examplersid`, copying settings from `templatesuite`.

#### Response example details

The example above confirms the report suite was created.

### Request Parameters

The POST a report suite endpoint includes the following request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `globalCompanyId` | required | string | The Global Company ID for the Adobe Analytics organization |
| `rsid` | required | string | The report suite ID to create |
| `copySettingsFromRsid` | optional | string | Report suite ID to copy settings from |
| `name` | optional | string | Report suite name |
| `hitsPerDay` | optional | integer | Allowed hits per day |
| `timezone` | optional | string | Timezone name |
| `signUpDate` | optional | string | Signup date (YYYY-MM-DD) |
| `baseUrl` | optional | string | Base URL |
| `currencyCode` | optional | string | Currency code |

### Response Parameters

The following table describes the POST a report suite response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `rsid` | string | Report suite ID |
| `created` | boolean | Whether the suite was created |
| `axleActivated` | boolean | Whether axle was activated for the suite |
