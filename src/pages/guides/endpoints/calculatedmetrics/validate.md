---
title: Validate calculated metrics
description: Check to see if a calculated metric API call is valid.
---

# Validate calculated metrics

Because report suites can have different configurations, dimensions, or metrics, a calculated metric that is valid in one report suite may not be valid in another. To determine which calculated metric to use in different report suites, and why it may or may not be available, you can use the `/validate` endpoint. This endpoint allows you to `POST` a definition along with a target report suite id. The validate endpoint responds with compatibility information on the calculated metric.

`POST https://analytics.adobe.io/api/{COMPANY_ID}/calculatedmetrics/validate`

## Example validate request

The following example shows a request to validate a target report suite id for a given calculated metric definition:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "http://analytics.adobe.io/api/exampleco/calculatedmetrics/validate?locale=en_US" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -d '{
  "rsid": "[report suite id]",
  "definition": {
    "formula": {
      "func": "subtract",
      "col2": {
        "func": "metric",
        "name": "metrics/reloads"
      },
      "col1": {
        "func": "metric",
        "name": "metrics/occurrences"
      }
    },
    "func": "calc-metric",
    "version": [
      1,
      0,
      0
    ]
  }
}'
```

#### Response

```json
{
  "valid": true,
  "identityMetrics": [ { "identity": "metrics/occurrences" }, { "identity": "metrics/reloads" } ],
  "functions": [ "subtract" ],
  "validator_version": "1.0.0",
  "supported_products": [ "oberon", "frag" ],
  "supported_schema": [ "schema_oberon", "schema_frag" ]
}
```
