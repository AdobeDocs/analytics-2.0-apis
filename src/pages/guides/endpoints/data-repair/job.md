---
title: Job endpoints
description: Create a data repair job or view past jobs.
---

# Job endpoints

The Job endpoint allows you to create a data repair job (using `POST`) or retrieve a list of currently running jobs (using `GET`).

## Create a data repair job

<InlineAlert variant="warning" slots="text"/>

**Use of the Data Repair API permanently alters or deletes Adobe Analytics data.** See the [FAQ](faq.md) for the recommended workflow to mitigate accidental deletion of data.

`POST https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{RSID}/job`

This API requires multiple components:

* A [JSON body](json-body.md) that contains the variables and actions to take.
* The query string `validationToken` obtained from the [Server call estimate](server-call-estimate.md) endpoint.
* The query strings `dateRangeStart` and `dateRangeEnd` that match the API call made to the Server call estimate endpoint.

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

The `validationToken` is consumed when you create a data repair job. You must use the [Server call estimate](server-call-estimate.md) endpoint to generate a new `validationToken` to call this API again.

## View a job list

Use this endpoint to retrieve a list of data repair jobs that were created for the given report suite. It includes both currently running and completed jobs.

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

## View an individual job

You can call the `/job/{JOB_ID}` endpoint to check on the progress of a data repair job. Following submission of a job, `status` reports as `processing` and `progress` is a number between `0` and `100`. Once complete, `status` reports as `complete` and `serverCalls` is set to the number of server calls scanned during the job. This `serverCalls` value is used to calculate usage.

Completion of a repair job can take hours to days, depending on the date range of the repair job and the amount of traffic the report suite gets per day.

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
