---
title: Job ID endpoint
description: View progress on a data repair job.
---

# Job ID endpoint

You can call the `/job/{JOB_ID}` endpoint to check on the progress of a data repair job. Following submission of a job, `status` reports as `processing` and `progress` is a number between `0` and `100`. Once complete, `status` reports as `complete` and `serverCalls` is set to the number of server calls scanned during the job. This `serverCalls` value is used to calculate usage.

Completion of a repair job can take hours to days, depending on the date range of the repair job and the amount of traffic the report suite gets per day.

`GET https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/job/{JOB_ID}`

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
