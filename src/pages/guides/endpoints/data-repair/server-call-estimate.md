---
title: Server call estimate endpoint
description: Estimate the size of a data repair job.
---

# Server call estimate endpoint

The `/serverCallEstimate` endpoint calculates the number of server calls for the given report suite and date range provided.  It also returns a `validationToken`, which is passed to `/job` in the `validationToken` query string parameter.

You can calculate the approximate cost of a repair job with the following formula:

`[Server calls returned by API call] * [CPMM rate found in sales order]`

The date range is specified in days and is based on the time zone of the report suite. The date range is inclusive of the start and end dates for estimates and repairs. The `ANALYTICS_GLOBAL_COMPANY_ID` can be found in API Access under [Company settings](https://experienceleague.adobe.com/docs/analytics/admin/company-settings/c-company-settings.html) in Adobe Analytics.

`GET https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/serverCallEstimate`

## Example request

```sh
curl -X GET -H "accept: application/json" -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" -H "x-api-key: {API_KEY/CLIENT_ID}" \
    "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/serverCallEstimate?dateRangeStart={YYYY-MM-DD}&dateRangeEnd={YYYY-MM-DD}"
```

## Response

```json
{
    "dateRangeEnd": "2019-03-28",
    "dateRangeStart": "2019-03-28",
    "reportSuiteId": "sample.reportsuite",
    "serverCallEstimate": 150000,
    "validationToken": "gAAAAABee777APCKafp7zDu-I3kFIEq_4AoeZSIap8wt0RhgNHmVdjnlrKCjPOo_PW74uj0qvDPG9B_SiYOe4p1Rg6Um1vCpL7dLwtkBX7i8wNheVPhb2j4nAapE-k6WPVcdP7FXNdjKvogMwHBEvGpAz6uO6TmpxwZUa3LMixaeN65BOFZW3i9ZnzZ400oCHte6XAX6Mo7QF-PyZZ6D--693K0cO_oUYg=="
}
```
