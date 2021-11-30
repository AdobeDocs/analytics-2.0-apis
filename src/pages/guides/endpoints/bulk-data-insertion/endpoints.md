---
title: Bulk Data Insertion API endpoints
description: All of the available endpoints related to the BDIA.
---

# Bulk Data Insertion API endpoints

Once you have met all [prerequisites](index.md) and have a [correctly formatted file](file-format.md), you can begin making API calls to Adobe's endpoints for this API.

## Validate

Before uploading your first file, Adobe strongly recommends running the file through the validation endpoint. This endpoint exists to test files before you upload them to the `events` endpoint. Files uploaded to this endpoint are not stored on Adobe's servers or processed. This API is synchronous and returns an immediate reply that states the file's validation status. If a file fails validation, the reason is also returned. See [Troubleshoot uploads](troubleshooting.md) for more information.

<InlineAlert variant="info" slots="text"/>

When you upload a file to the `events` endpoint, it is also validated.

`POST https://analytics.adobe.io/aa/collect/v1/events/validate`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET -H "accept: application/json" \
    -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" \
    -H "x-api-key: {API_KEY/CLIENT_ID}" \
    -F file=@/tmp/ingest_file.gz \
    "https://analytics.adobe.io/aa/collect/v1/events/validate"
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