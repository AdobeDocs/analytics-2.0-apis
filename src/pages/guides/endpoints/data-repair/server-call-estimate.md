---
title: Server Call estimate endpoint
description: Estimate the size of a data repair job.
---

# Server Call estimate endpoint

The Server Call estimate endpoint calculates the number of Server Calls for the given Report Suite and date range provided.  It also returns a `validationToken`, which is required to use the [Job](job.md) endpoint.

This endpoint requires two query string parameters:

* **`dateRangeStart`**: The start of the date range that you would like to repair.
* **`dateRangeEnd`**: The last day of the date range that you would like to repair (inclusive). You cannot include the current month as part of your date range.

The date range is based on the time zone of the Report Suite.

`GET https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{RSID}/serverCallEstimate?dateRangeStart={YYYY-MM-DD}&dateRangeEnd={YYYY-MM-DD}`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET -H "accept: application/json" \
    -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" \
    -H "x-api-key: {API_KEY/CLIENT_ID}" \
    "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/examplersid/serverCallEstimate?dateRangeStart={YYYY-03-28}&dateRangeEnd={YYYY-03-29}"
```

#### Response

```json
{
    "dateRangeEnd": "YYYY-03-28",
    "dateRangeStart": "YYYY-03-29",
    "reportSuiteId": "examplersid",
    "serverCallEstimate": 150000,
    "validationToken": "gAAAAABee777APCKafp7zDu-I3kFIEq_4AoeZSIap8wt0RhhNHmVdjnlrKCjPOo_PW74uj0qvDPG9B_SiYOe4p1Rg6Um1vCpL7dLwtkBX7i8wNheVPhb2j4nAapE-k6WPVcdP7FXNdjKvogMwHBEvGpAz6uO6TmpxwZUa3LMixaeN65BOFZW3i9ZnzZ400oCHte6XAX6Mo7QF-PyZZ6D--693K0cO_oUYg=="
}
```

Once you receive a `validationToken`, you can start formulating the call to make to the Data Repair API. See [Job definition reference](json-body.md) to establish the desired data repair job variables, actions, and filters.
