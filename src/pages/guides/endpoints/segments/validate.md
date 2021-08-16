---
title: Validate segments
description: Check to see if a segment API call is valid.
---

# Validate Endpoint

Because report suites can have different configurations, variables, or metrics, one segment that is valid in one report suite may not be valid in another. To determine which segments to use in different report suites, you can use the `validate` endpoint. This endpoint allows you to `POST` a definition along with a target `rsid`. The validate endpoint responds with compatibility information on the segment.

## Example Request

```sh
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer {ACCESSTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -d '{
    "container": {
      "func": "container",
      "pred": {
        "str": "",
        "val": {
          "func": "attr",
          "name": "variables/evar7"
        },
        "func": "streq",
        "description": "Custom Conversion 7"
      },
      "context": "hits"
    },
    "func": "segment",
    "version": [
      1,
      0,
      0
    ]
  }' "https://analytics.adobe.io/api/examplersid/segments/validate" -H "x-api-key: {OAUTHTOKEN}"
```

## Response

The following response shows validation for the segment, including its compatibility with supported products, supported schema, and supported features.

```json
{
  "valid": true,
  "validator_version": "1.1.11",
  "supported_products": [
    "data_warehouse",
    "oberon",
    "discover"
  ],
  "supported_schema": [
    "schema_data_warehouse",
    "schema_oberon"
  ],
  "supported_features": [
    "function_attr",
    "function_container",
    "function_streq"
  ]
}
```
