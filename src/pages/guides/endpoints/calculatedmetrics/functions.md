---
title: Calculated metric functions
description: Call or reference calculated metric functions in API requests.
---

# Calculated metric functions

Calculated Metrics are comprised of several different mathematical functions that work on available metrics for a given report suite. These mathematical functions can be retrieved and inspected by making a call to the `GET /calculatedmetrics/functions` endpoint. This returns the full list of all methods. Optionally, the same call can be made to GET `/calculatedmetrics/functions/[function id]` to determine if a function is available, or to retrieve data about that function.

`GET https://analytics.adobe.io/api/[COMPANY_NAME]/calculatedmetrics/functions/`

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
