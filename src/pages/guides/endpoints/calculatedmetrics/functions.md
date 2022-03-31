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
curl -X GET "https://analytics.adobe.io/api/exampleco/calculatedmetrics/functions" \
  -H "x-api-key: {CLIENTID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: exampleco"
```

#### Response

```json

[
  {
  "id": "col-sum",
  "category": "basic",
  "persistable": true,
  "name": "Column Sum",
  "description": "Adds all of the numeric values for a metric within a column (across the elements of a dimension).",
  "definition": {
    "func": "calc-metric",
    "parameters": [
      {
        "func": "parameter-def",
        "name": "col",
        "type": "column",
        "friendlyName": "metric",
        "description": "Requires at least one metric but can take any number of metrics as parameters."
      }
    ],
    "version": [
      1,
      0,
      0
    ]
    }
  },
  {
    ...
  }
]
```

## Get a single function

Returns details around a single calculated metric function if you specify the `id`. You can obtain the desired `id` by calling the multiple calculated metrics endpoint.

`GET https://analytics.adobe.io/api/{GLOBALCOMPANYID}/calculatedmetrics/functions/{ID}`

For example, the following request returns information around the `add` calculated metric function:

<CodeBlock slots="heading, code" repeat="3" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/exampleco/calculatedmetrics/functions/add" \
  -H "x-api-key: {CLIENTID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-proxy-global-company-id: exampleco"
```

#### Response

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
