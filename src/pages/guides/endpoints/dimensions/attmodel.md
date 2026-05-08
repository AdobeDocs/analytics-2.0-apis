---
title: Dimension attribution models
description: Retrieve attribution model settings 
---

# Dimension attribution models

The Analytics 2.0 Dimensions API supports an `attributionModel` expansion that returns 
the attribution model configuration for a given dimension. This includes the allocation 
model type, expiration settings, and context scope. You can request this expansion on 
both the GET multiple dimensions and GET single dimension endpoints.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use 
them, you must first create a client with access to the Adobe Analytics Reporting API. 
For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

* [GET multiple dimensions with attribution model](#get-multiple-dimensions-with-attribution-model)
* [GET single dimension with attribution model](#get-single-dimension-with-attribution-model)
* [Attribution model values](#attribution-model-values)

## GET multiple dimensions with attribution model

Use this endpoint to retrieve all dimensions for a report suite, including attribution 
model data for dimensions that support it. Pass `attributionModel` as a value in the 
`expansion` query parameter to include attribution model data in the response. For more 
information on the dimensions endpoint, see the [Dimensions API guide](../index.md).

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}&expansion=attributionModel`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this 
endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid=examplersid&expansion=attributionModel" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
[
  {
    "id": "variables/evar1",
    "title": "Campaign",
    "name": "Campaign",
    "type": "STRING",
    "category": "Traffic Sources",
    "support": ["oberon", "dataWarehouse"],
    "pathable": false,
    "segmentable": true,
    "reportable": ["oberon"],
    "attributionModel": {
      "func": "allocation-lastTouch_dim",
      "context": "sessions",
      "expiration": {
        "func": "allocation-inactivity",
        "granularity": "day",
        "numPeriods": 30
      }
    }
  },
  {
    "id": "variables/evar2",
    "title": "Internal Search Term",
    "name": "Internal Search Term",
    "type": "STRING",
    "category": "Conversion",
    "support": ["oberon", "dataWarehouse"],
    "pathable": false,
    "segmentable": true,
    "reportable": ["oberon"],
    "attributionModel": {
      "func": "allocation-linear",
      "context": "visitors"
    }
  },
  {
    "id": "variables/prop1",
    "title": "Page Section",
    "name": "Page Section",
    "type": "STRING",
    "category": "Traffic Variables",
    "support": ["oberon"],
    "pathable": true,
    "segmentable": true,
    "reportable": ["oberon"]
  }
]
```

#### Request example details

The example requests all dimensions for the `examplersid` report suite with the 
`attributionModel` expansion included.

#### Response example details

The response returns an array of dimension objects. When the `attributionModel` 
expansion is requested, an `attributionModel` object is included for each dimension 
that has attribution configured. In this example:

* `evar1` uses a Last Touch (`allocation-lastTouch_dim`) model scoped to sessions, 
  with a 30-day inactivity expiration.
* `evar2` uses a Linear (`allocation-linear`) model scoped to visitors. Models that 
  use `context` instead of `expiration` do not include an `expiration` object.
* `prop1` is a traffic variable that does not support attribution. It is returned 
  without an `attributionModel` field.

### Request parameters

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID |
| `expansion` | optional | array (string) | Comma-delimited list of additional metadata to include. Pass `attributionModel` to include attribution model data. Can be combined with other expansion values, for example `expansion=attributionModel,tags`. |
| `locale` | optional | string | The language for the response. Default is `en_US`. |
| `segmentable` | optional | boolean | When `true`, returns only dimensions that are valid within a segment. |
| `reportable` | optional | boolean | When `true`, returns only dimensions that are valid within a report. |
| `classifiable` | optional | boolean | When `true`, returns only classifiable dimensions. Default is `false`. |

### Response parameters

The following table describes the `attributionModel` response object. For all other 
dimension response parameters, see the [Dimensions API guide](../index.md).

| Name | Type | Description |
| --- | --- | --- |
| `attributionModel` | object | Attribution model configuration for the dimension. Only present when `expansion=attributionModel` is requested and the dimension supports attribution. |
| `func` | string | Member of `attributionModel`. The allocation model type assigned to this dimension. See [Attribution model values](#attribution-model-values) for all possible values. |
| `context` | string | Member of `attributionModel`. The scope used for attribution calculations. Possible values are `sessions` and `visitors`. Present on most models; not present on `allocation-lastTouch`, `allocation-lastTouch_dim`, `allocation-firstTouch`, `allocation-firstTouch_dim`, and `allocation-instance`. |
| `expiration` | object | Member of `attributionModel`. Expiration and persistence settings for the dimension. Present on `allocation-lastTouch`, `allocation-lastTouch_dim`, `allocation-firstTouch`, and `allocation-firstTouch_dim` models. |
| `func` | string | Member of `expiration`. The expiration type. Typically `allocation-inactivity`. |
| `granularity` | string | Member of `expiration`. The time unit for the expiration window. Possible values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, and `year`. |
| `numPeriods` | integer | Member of `expiration`. The number of time units in the expiration window. For example, a value of `30` with `granularity: "day"` produces a 30-day expiration window. |
| `firstWeight` | number | Member of `attributionModel`. The percentage weight given to the first touch point. Present only on Custom (`allocation-positionBased`) models. |
| `lastWeight` | number | Member of `attributionModel`. The percentage weight given to the last touch point. Present only on Custom (`allocation-positionBased`) models. |
| `middleWeight` | number | Member of `attributionModel`. The percentage weight distributed across middle touch points. Present only on Custom (`allocation-positionBased`) models. |
| `halfLifeNumPeriods` | number | Member of `attributionModel`. The number of time units in the half-life decay period. Present only on Time Decay (`allocation-timeDecay`) models. |
| `halfLifeGranularity` | string | Member of `attributionModel`. The time unit for the half-life decay period. Present only on Time Decay (`allocation-timeDecay`) models. Possible values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, and `year`. |

<InlineAlert variant="info" slots="text" />

The `func` field appears at two levels in the `attributionModel` object. At the top level, `func` identifies the allocation model type (for example, `allocation-lastTouch_dim`). Within the nested `expiration` object, `func` identifies the expiration type (for example, `allocation-inactivity`). These are distinct fields that share the same key name at different levels of the object hierarchy.

## GET single dimension with attribution model

Use this endpoint to retrieve attribution model data for a specific dimension. Pass 
`attributionModel` as a value in the `expansion` query parameter to include attribution 
model data in the response. For more information on the dimensions endpoint, see the 
[Dimensions API](../index.md) guide.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions/{DIMENSION_ID}?rsid={RSID}&expansion=attributionModel`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this 
endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions/evar1?rsid=examplersid&expansion=attributionModel" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "id": "variables/evar1",
  "title": "Campaign",
  "name": "Campaign",
  "type": "STRING",
  "category": "Traffic Sources",
  "support": ["oberon", "dataWarehouse"],
  "pathable": false,
  "segmentable": true,
  "reportable": ["oberon"],
  "attributionModel": {
    "func": "allocation-lastTouch_dim",
    "context": "sessions",
    "expiration": {
      "func": "allocation-inactivity",
      "granularity": "day",
      "numPeriods": 30
    }
  }
}
```

#### Request example details

The example requests the `evar1` dimension from the `examplersid` report suite with 
the `attributionModel` expansion included.

#### Response example details

The response returns the standard dimension object for `evar1` with an `attributionModel` 
object included. In this example:

* The `func` value `allocation-lastTouch_dim` indicates a Last Touch model applied at 
  the dimension level.
* The `context` value `sessions` scopes attribution to the visit level.
* The `expiration` object reflects a 30-day inactivity window.

### Request parameters

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | required | string | The dimension ID. For example, `evar1`. |
| `rsid` | required | string | The report suite ID. |
| `expansion` | optional | array (string) | Comma-delimited list of additional metadata to include. Pass `attributionModel` to include attribution model data. |
| `locale` | optional | string | The language for the response. Default is `en_US`. |

### Response parameters

The GET single dimension endpoint returns the same `attributionModel` object described 
in the [GET multiple dimensions response parameters](#response-parameters) section above.

## Attribution model values

The `func` field within the `attributionModel` object returns one of the following 
values. Each value corresponds to an allocation model configurable in the Analysis Workspace. 
For conceptual descriptions of each model, see 
[Attribution models and lookback windows](https://experienceleague.adobe.com/en/docs/analytics/analyze/analysis-workspace/attribution/models).

Dimension-level variants of a model are identified by a `_dim` suffix. These reflect 
the native persistence setting of the dimension itself and do not include a lookback 
window. Variants without the `_dim` suffix include a `lookbackExpiration` configuration.

| `func` value | Model name | Properties present in response |
| --- | --- | --- |
| `allocation-lastTouch` | Last Touch | `expiration` |
| `allocation-lastTouch_dim` | Last Touch | `context`, `expiration` |
| `allocation-firstTouch` | First Touch | `expiration` |
| `allocation-firstTouch_dim` | First Touch | `context`, `expiration` |
| `allocation-linear` | Linear | `context` |
| `allocation-participation` | Participation | `context` |
| `allocation-participation_dim` | Participation | `context` |
| `allocation-instance` | Same Touch | none |
| `allocation-uShaped` | U Shaped | `context` |
| `allocation-jShaped` | J Curve | `context` |
| `allocation-reverseJShaped` | Inverse J | `context` |
| `allocation-timeDecay` | Time Decay | `context`, `halfLifeNumPeriods`, `halfLifeGranularity` |
| `allocation-positionBased` | Custom | `context`, `middleWeight`, `firstWeight`, `lastWeight` |
| `allocation-algorithmic` | Algorithmic | `context` |

## Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

| HTTP code | Meaning | Description |
| --- | --- | --- |
| 200 | Success | The request is successful. |
| 400 | Bad Request | The request was improperly constructed, missing key information, and/or contained incorrect syntax. |
| 401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. |
| 403 | Forbidden | The resource was found, but you do not have the right credentials to view it. |
| 404 | Not found | The requested resource could not be found on the server. |
| 500 | Internal server errors | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. |
