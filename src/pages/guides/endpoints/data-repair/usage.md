---
title: Usage endpoints
description: Monitor your organization's usage of the Data Repair API by report suite.
---
# Usage endpoints

The Data Repair API Usage endpoints allow you keep track of the number of jobs run on a report suite level. These endpoints provide a higher level of monitoring compared to the [`job`](job.md) endpoint, which provide details on each job run.

These endpoints require two query string parameters:

* **`dateRangeStart`**: The start of the date range that you would like to see the number of jobs run.
* **`dateRangeEnd`**: The last day of the date range that you would like to see the number of jobs (inclusive).

## View Data Repair API usage for all report suites

Returns a JSON object that shows Data Repair API usage statistics for all report suites that belong to the given global company ID.

`GET "https://analytics.adobe.io/api/{GLOBALCOMPANYID}/datarepair/v1/usage?dateStart={YYYY-MM-DD}&dateEnd={YYYY-MM-DD}"`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/exampl0/datarepair/v1/usage?dateStart=YYYY-01-01&dateEnd=YYYY-02-01" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY/CLIENT_ID}"
```

#### Response

```json
{
  "serverCalls": 0,
  "jobCount": 0,
  "dateStart": "YYYY-01-01",
  "dateEnd": "YYYY-02-01",
  "globalCompanyId": "exampl0"
}
```

## View Data Repair API usage for a single report suite

Returns a JSON object that shows usage statistics for the given report suite.

`GET "https://analytics.adobe.io/api/{GLOBALCOMPANYID}/datarepair/v1/{REPORTSUITE}/usage?dateStart={YYYY-MM-DD}&dateEnd={YYYY-MM-DD}"`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/exampl0/datarepair/v1/examplersid/usage?dateStart=YYYY-03-01&dateEnd=YYYY-04-01" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY/CLIENT_ID}"
```

#### Response

```json
{
  "serverCalls": 0,
  "jobCount": 0,
  "dateStart": "YYYY-01-01",
  "dateEnd": "YYYY-02-01",
  "globalCompanyId": "exampl0",
  "reportSuiteId": "examplersid"
}
```
