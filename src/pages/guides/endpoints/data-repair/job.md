---
title: Job endpoints
description: Create a data repair job or view past jobs.
---

# Job endpoints

The Job endpoint allows you to create a Data Repair API job (using `POST`) or retrieve a list of your currently running jobs (using `GET`).

## Create a Data Repair API job

<InlineAlert variant="warning" slots="text"/>

**Use of the Data Repair API permanently deletes or edits your Adobe Analytics data.** See the [Overview page](index.md#Workflow) for the recommended workflow to mitigate accidental deletion or alteration of your data.

`POST https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{RSID}/job`

This endpoint requires multiple components:

* A [Job definition](json-body.md) in the form of a JSON request body that contains the variables and actions to take.
* The query string `validationToken` obtained from the [Server Call estimate](server-call-estimate.md) endpoint.
* The query strings `dateRangeStart` and `dateRangeEnd` that match the API call made to the Server Call estimate endpoint.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST -H "accept: application/json" \
  -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY/CLIENT_ID}" \
  -d '{"variables": {"ipaddress": {"action": "delete"}}}' \
  "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/examplersid/job?validationToken={VALIDATION_TOKEN}&dateRangeStart=YYYY-03-28&dateRangeEnd=YYYY-03-29"
```

#### Response

```json
{
  "dateRangeEnd": "YYYY-03-28",
  "dateRangeStart": "YYYY-03-29",
  "jobCompleteTime": null,
  "jobCreateTime": "YYYY-04-24T09:02:59+00:00",
  "jobDefinition": {
    "variables": {
      "ipaddress": {
        "action": "delete"
      }
    }
  },
  "jobId": 24,
  "progress": 0,
  "reportSuiteId": "examplersid",
  "serverCalls": 100,
  "status": "processing"
}
```

The `validationToken` is consumed when you create a data repair job. You must use the [Server Call estimate](server-call-estimate.md) endpoint to generate a new `validationToken` to call this endpoint again.

## View a Data Repair API job list

Use this endpoint to retrieve a list of your data repair jobs that were created for the given Report Suite. It includes both currently running and completed jobs.

`GET https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{RSID}/job`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET -H "accept: application/json" \
  -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY/CLIENT_ID}" \
  "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/examplersid/job"
```

#### Response

```json
[
  {
    "dateRangeEnd": "YYYY-03-28",
    "dateRangeStart": "YYYY-03-28",
    "jobCompleteTime": "YYYY-04-24T10:13:51+00:00",
    "jobCreateTime": "YYYY-04-24T09:02:59+00:00",
    "jobDefinition": {
      "variables": {
        "activitymap": {
          "action": "delete"
        },
        "prop12": {
          "action": "delete"
        },
        "evar74": {
          "action": "delete"
        },
        "evar107": {
          "action": "delete"
        }
      }
    },
    "jobId": "24",
    "progress": 100,
    "reportSuiteId": "examplersid",
    "serverCalls": 2,
    "status": "complete"
  },
  {
    "dateRangeEnd": "YYYY-04-24",
    "dateRangeStart": "YYYY-04-24",
    "jobCompleteTime": null,
    "jobCreateTime": "YYYY-05-18T09:02:59+00:00",
    "jobDefinition": {
      "variables": {
        "prop82": {
          "action": "delete"
        }
      }
    },
    "jobId": "25",
    "progress": 0,
    "reportSuiteId": "examplersid",
    "serverCalls": 2,
    "status": "processing"
  }
]
```

## View an individual Data Repair API job

You can call the `/job/{JOB_ID}` endpoint to check on the progress of a data repair job. Following submission of a job, `status` reports as `processing` and `progress` is a number between `0` and `100`. Once complete, `status` reports as `complete` and `serverCalls` is set to the number of Data Rows Scanned during the job. This `serverCalls` value is used to calculate usage.

Completion of your data repair job can take hours to days, depending on the date range of the data repair job and the amount of traffic the Report Suite gets per day.

`GET https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{RSID}/job/{JOB_ID}`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET -H "accept: application/json" \
  -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY/CLIENT_ID}" \
  "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/examplersid/job/24"
```

#### Response

```json
{
  "dateRangeEnd": "YYYY-01-28",
  "dateRangeStart": "YYYY-01-28",
  "jobCompleteTime": "YYYY-03-24T10:13:51+00:00",
  "jobCreateTime": "YYYY-03-24T09:02:59+00:00",
  "jobDefinition": {
    "variables": {
      "activitymap": {
        "action": "delete"
      },
      "prop12": {
        "action": "delete"
      },
      "evar74": {
        "action": "delete"
      },
      "evar107": {
        "action": "delete"
      }
    }
  },
  "jobId": "24",
  "progress": 100,
  "reportSuiteId": "examplersid",
  "serverCalls": 2,
  "status": "complete"
}
```
