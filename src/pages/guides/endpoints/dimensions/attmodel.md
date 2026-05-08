---
title: Dimension attribution models
description: Use the attributionModel expansion to retrieve attribution model settings for a dimension using the Analytics 2.0 API.
---

# Dimension attribution models

The Analytics 2.0 Dimensions API supports an `attributionModel` expansion that returns the attribution model configuration for a given dimension. This includes the allocation model type, expiration settings, and context scope. You can request this expansion on both the GET multiple dimensions and GET single dimension endpoints.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Analytics Reporting API. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

## Request the attributionModel expansion

To include attribution model data in a dimensions response, pass `attributionModel` as a value in the `expansion` query parameter. The `attributionModel` expansion is supported on both dimensions endpoints:

* [GET multiple dimensions](#get-multiple-dimensions-with-attribution-model): Pass `expansion=attributionModel` to include attribution model data for all dimensions returned.
* [GET single dimension](#get-single-dimension-with-attribution-model): Pass `expansion=attributionModel` to include attribution model data for a specific dimension.

Attribution model data is only returned for dimensions that have an attribution model configured, such as eVars. Dimensions that do not support attribution (such as traffic variables) do not include the `attributionModel` field in the response.

## GET multiple dimensions with attribution model

Use this endpoint to return attribution model data for all dimensions in a report suite.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}&expansion=attributionModel`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid=examplersid&expansion=attributionModel" \
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
    "type": "string",
    "category": "Traffic Sources",
    "support": [
      "oberon",
      "dataWarehouse"
    ],
    "pathable": false,
    "segmentable": true,
    "reportable": [
      "oberon"
    ],
    "supportsDataGovernance": true,
    "multiValued": false,
    "standardComponent": false,
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
    "type": "string",
    "category": "Conversion",
    "support": [
      "oberon",
      "dataWarehouse"
    ],
    "pathable": false,
    "segmentable": true,
    "reportable": [
      "oberon"
    ],
    "supportsDataGovernance": true,
    "multiValued": false,
    "standardComponent": false,
    "attributionModel": {
      "func": "allocation-linear",
      "context": "visitors"
    }
  }
]
```

#### Request example details

The example requests all dimensions for the `examplersid` report suite with the `attributionModel` expansion included.

#### Response example details

The response returns standard dimension fields for each dimension, along with an `attributionModel` object where one is configured. In this example:

* `evar1` uses a Last Touch (`allocation-lastTouch_dim`) model scoped to sessions, with a 30-day inactivity expiration.
* `evar2` uses a Linear (`allocation-linear`) model scoped to visitors. Linear models do not include an `expiration` object.
* Dimensions without attribution model support omit the `attributionModel` field entirely.

### Request parameters

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID |
| `expansion` | optional | array (string) | Pass `attributionModel` to include attribution model data in the response. Multiple expansion values can be comma-delimited (for example, `expansion=attributionModel,tags`). |
| `locale` | optional | string | The language for the response. Default is `en_US`. |
| `segmentable` | optional | boolean | When `true`, returns only dimensions that are valid within a segment. |
| `reportable` | optional | boolean | When `true`, returns only dimensions that are valid within a report. |
| `classifiable` | optional | boolean | When `true`, returns only classifiable dimensions. |

### Response parameters

The following table describes the `attributionModel` object returned in the response. Other standard dimension response parameters are described in the [Dimensions API](../index.md) guide.

| Name | Type | Description |
| --- | --- | --- |
| `attributionModel` | object | Attribution model configuration for the dimension. Only present when `expansion=attributionModel` is requested and the dimension supports attribution. |
| `attributionModel.func` | string | The allocation model type. See [Attribution model values](#attribution-model-values) for all possible values. |
| `attributionModel.context` | string | The scope used for attribution calculations. Possible values are `sessions` and `visitors`. Present on most models; not present on `allocation-instance`. |
| `attributionModel.expiration` | object | Expiration and persistence settings for the dimension. Present on Last Touch and First Touch models. |
| `attributionModel.expiration.func` | string | The expiration type. Typically `allocation-inactivity`. |
| `attributionModel.expiration.granularity` | string | The time unit for the expiration window. Possible values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, and `year`. |
| `attributionModel.expiration.numPeriods` | integer | The number of time units in the expiration window. For example, `30` combined with `granularity: "day"` produces a 30-day expiration. |
| `attributionModel.firstWeight` | number | The percentage weight given to the first touch point. Present only on Custom (`allocation-positionBased`) models. |
| `attributionModel.lastWeight` | number | The percentage weight given to the last touch point. Present only on Custom (`allocation-positionBased`) models. |
| `attributionModel.middleWeight` | number | The percentage weight distributed across middle touch points. Present only on Custom (`allocation-positionBased`) models. |
| `attributionModel.halfLifeNumPeriods` | number | The number of time units in the half-life decay period. Present only on Time Decay (`allocation-timeDecay`) models. |
| `attributionModel.halfLifeGranularity` | string | The time unit for the half-life decay period. Present only on Time Decay (`allocation-timeDecay`) models. Possible values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, and `year`. |

## GET single dimension with attribution model

Use this endpoint to return attribution model data for a specific dimension in a report suite.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions/{DIMENSION_ID}?rsid={RSID}&expansion=attributionModel`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions/evar1?rsid=examplersid&expansion=attributionModel" \
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
  "type": "string",
  "category": "Traffic Sources",
  "support": [
    "oberon",
    "dataWarehouse"
  ],
  "pathable": false,
  "segmentable": true,
  "reportable": [
    "oberon"
  ],
  "supportsDataGovernance": true,
  "multiValued": false,
  "standardComponent": false,
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

The example requests the `evar1` dimension from the `examplersid` report suite with the `attributionModel` expansion included.

#### Response example details

The response returns standard dimension fields for `evar1`, along with its `attributionModel` configuration. In this example:

* The `func` value `allocation-lastTouch_dim` indicates a Last Touch model applied at the dimension level.
* The `context` value `sessions` means attribution is scoped to the visit.
* The `expiration` object shows a 30-day inactivity window.

### Request parameters

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | required | string | The dimension ID (for example, `evar1`) |
| `rsid` | required | string | The report suite ID |
| `expansion` | optional | array (string) | Pass `attributionModel` to include attribution model data in the response. Multiple expansion values can be comma-delimited. |
| `locale` | optional | string | The language for the response. Default is `en_US`. |

### Response parameters

The GET single dimension endpoint returns the same `attributionModel` response parameters as described in the [GET multiple dimensions response parameters](#response-parameters) section above.

## Attribution model values

The `attributionModel.func` field returns one of the following values. Each value corresponds to an allocation model configurable in the Analytics UI. For conceptual descriptions of each model, see [Attribution models and lookback windows](https://experienceleague.adobe.com/en/docs/analytics/analyze/analysis-workspace/attribution/models).

| `func` value | Model name | Additional properties |
| --- | --- | --- |
| `allocation-lastTouch` | Last Touch | `expiration` |
| `allocation-lastTouch_dim` | Last Touch | `context`, `expiration` |
| `allocation-firstTouch` | First Touch | `expiration` |
| `allocation-firstTouch_dim` | First Touch | `context`, `expiration` |
| `allocation-linear` | Linear | `context` |
| `allocation-participation` | Participation | `context`, `expiration` |
| `allocation-participation_dim` | Participation | `context` |
| `allocation-instance` | Same Touch | none |
| `allocation-uShaped` | U Shaped | `context` |
| `allocation-jShaped` | J Curve | `context` |
| `allocation-reverseJShaped` | Inverse J | `context` |
| `allocation-timeDecay` | Time Decay | `context`, `halfLifeNumPeriods`, `halfLifeGranularity` |
| `allocation-positionBased` | Custom | `context`, `firstWeight`, `lastWeight`, `middleWeight` |
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
