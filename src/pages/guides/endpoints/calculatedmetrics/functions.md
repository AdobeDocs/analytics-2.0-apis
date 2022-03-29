---
title: Calculated metric functions
description: Call or reference calculated metric functions in API requests.
---

# Calculated metric functions

Calculated Metrics are comprised of several different mathematical functions that work on available metrics for a given report suite.

## Get all functions

Returns a full list of calculated metric functions that the user can access.

`GET https://analytics.adobe.io/api/{GLOBALCOMPANYID}/calculatedmetrics/functions/`

<CodeBlock slots="heading, code" repeat="3" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST -H "accept: application/json" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" \
    -H "x-api-key: {CLIENTID}" \
    -H "x-adobe-vgid: example_group" \
    -F file=@/tmp/ingest_file.gz \
    "https://analytics.adobe.io/aa/collect/v1/events/validate"
```

#### Success response

```json
{
    "success": "File is valid"
}
```
## Example response

The following response shows data about the calculated metric function `add`:

```json
{
    "id": "add",
    "category": "internal",
    "persistable": true,
    "definition": {
      "func": "calc-metric",
      "parameters": [
        {
          "func": "parameter-def",
          "name": "col1",
          "type": "column",
          "friendlyNameKey": "metric_X",
          "descKey": "FirstMetricToAdd"
        },
        {
          "func": "parameter-def",
          "name": "col2",
          "type": "column",
          "friendlyNameKey": "metric_Y",
          "descKey": "SecondMetricToAdd"
        }
      ],
      "version": [
        1,
        0,
        0
      ]
    }
}
```
