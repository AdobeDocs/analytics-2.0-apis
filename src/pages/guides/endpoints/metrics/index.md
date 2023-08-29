---
title: Metrics API
description: Retrieve metrics information using the API.
---

# Analytics Metrics API

The Analytics 2.0 Metrics API endpoints allow you to retrieve metrics programmatically through Adobe Developer. The endpoints use the same data and methods that are used when working with metrics in the UI. See [Metrics](https://experienceleague.adobe.com/docs/analytics/components/metrics/overview.html) in the Analytics Components guide for more information. For information on using the Calculated Metrics API (a separate service), see the [Calculated Metrics API endpoint guide](../calculatedmetrics/index.md). 

The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to [Getting started with the Analytics API](../../index.md).

This guide includes instructions for using the following endpoints:

* GET metrics: Returns a list of metrics for a given report suite ID
* GET metrics ID: Returns a metric corresponding to a supplied ID for a given report suite

## GET metrics

Use this endpoint to return a list of metrics for a given report suite ID.

**GET**  `https://analytics.adobe.io/api/{globalCompanyId}/metrics?rsid={RSID}`

You can find your global company ID by using the [Discovery API](../discovery.md).

### Request parameters

The GET metrics endpoint includes the following request query parameters:


| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `rsid` | required | string | Report suite ID |
| `locale` | optional | string | Specified language |
| `segmentable` | optional | boolean | Whether to include only metrics that are valid within a segment |
| `reportable` | optional | boolean | Whether to include only metrics that are valid within the report |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response parameters

The GET metrics endpoint includes the following response parameters:

| Parameter | Type | Description |
| --- | --- | -- |
| `id` | string | Metric ID |
| `title` | string | Metric title |
| `name` | string | Metric name |
| `type` | array of enums | Lists the data type of the metric |
| `extraTitleInfo` | string | Additional title info |
| `category` | string | Product category |
| `support` | string | Support information |
| `allocation` | boolean | Allocation information |
| `precision` | $int32 | Support information |
| `calculated` | boolean | Whether it is a calculated metric |
| `polarity` | string | Whether the polarity is `positive` or `negative` |
| `helplink` | string | URL that provides documentation resources |
| `tags` | object | An extra metadata item in response to the `expansion` request parameter. This can include the tag ID, tag name, tag description, and a list of components associated the tag. |
| `allowedForReporting` | boolean | An extra metadata item in response to the `expansion` request parameter. Indicates whether the metric is set to be allowed for reporting. |
| `categories` | string | Product categories. An extra metadata item in response to the `expansion` request parameter. |
| `pathable` | boolean | Whether the metric in the report is pathing enabled |
| `parent` | string | Parent metric |
| `segmentable` | boolean | Whether the metric is segmentable |
| `reportable` | array (string) | Whether the metric is segmentable |
| `description` | string | Contents of metric description field in report |
| `noneSettings` | boolean | Whether "none" item report setting is set  |

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request. 

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{globalCompanyId}/metrics?rsid=examplersid&locale=en_US&segmentable=true&expansion=allowedForReporting" \
" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}"
```

#### Response

```json
[
  {
    "id": "metrics/campaigninstances",
    "title": "Campaign Click-throughs",
    "name": "Campaign Click-throughs",
    "type": "int",
    "category": "Traffic Sources",
    "support": [
      "oberon",
      "dataWarehouse"
    ],
    "allocation": true,
    "precision": 0,
    "calculated": false,
    "segmentable": true,
    "supportsDataGovernance": false,
    "polarity": "positive",
    "allowedForReporting": true,
    "standardComponent": true
  },
  {
    "id": "metrics/cartadditions",
    "title": "Cart Additions",
    "name": "Cart Additions",
    "type": "int",
    "category": "Conversion",
    "support": [
      "oberon",
      "dataWarehouse"
    ],
    "allocation": true,
    "precision": 0,
    "calculated": false,
    "segmentable": true,
    "supportsDataGovernance": true,
    "description": "The number of times a visitor added something to their cart. This can help you understand at what part of the conversion funnel that customers show enough interest in a product to add it to their cart.",
    "polarity": "positive",
    "allowedForReporting": true,
    "standardComponent": true
  },
]
```

#### Request example details

The above example requests the following details:

* The GET metrics list for `examplersid` report suite. 
* Specifies the response language in `locale` as US English with the value as `en_US`. 
* To retrieve only `segmentable` metrics. This is specified with the value `true`.
* Information on whether the metric is `allowedForReporting`.


#### Response example details

The above JSON response example shows the following details:

* Information for two metrics in the `examplersid` report suite, including `campaigninstances` and `cartadditions`.
* Both metrics have the same data `type`, set as `int`. 
* The metrics differ in `category`. The `category` for `campaigninstances` is `Traffic sources`. The `category` for `cartadditions` is `Conversion`. 
* The information that both metrics are `segmentable` and `allowedForReporting`, as requested. This is indicated by the value `true` for each pair.

## GET metrics ID

Use this endpoint to retrieve information for a single metric in a report suite.

**GET**  `https://analytics.adobe.io/api/{globalCompanyId}/metrics/{Metric ID}?rsid={report suite ID}`

You can find your global company ID by using the [Discovery API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/discovery/).

### Request parameters

The GET metrics ID endpoint includes the following request query parameters:

| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `id` | required | string | Metric ID (e.g.`evar1`) |
| `rsid` | required | string | Report suite ID |
| `locale` | optional | string | Specified language |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response parameters

The GET metrics ID endpoint includes the same response parameters as the GET metrics response parameters, as described above.

### Request and response examples

Click the **Request** tab in the following example to see a cURL request. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{globalCompanyId/metrics/carts?rsid=examplersid&locale=en_US&expansion=categories" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}"
```

#### Response

```json
{
  "id": "metrics/carts",
  "title": "Carts",
  "name": "Carts",
  "type": "int",
  "category": "Conversion",
  "categories": [],
  "support": [
    "oberon",
    "dataWarehouse"
  ],
  "allocation": true,
  "precision": 0,
  "calculated": false,
  "segmentable": true,
  "supportsDataGovernance": true,
  "description": "The number of times visitors to the site added items to their online shopping carts.",
  "polarity": "positive",
  "standardComponent": true
}
```
#### Request example details

In the above example, the GET metrics ID request specifies the metric ID as `carts` and the `rsid` as `examplersid`. It includes the query parameters `locale` as `en_US`, and the `expansion` parameter `categories` as `true`.

The above example requests the following details:

* The GET metrics ID for `carts` in the `examplersid` report suite. 
* Specifies the response language in `locale` as US English with the value as `en_US`. 
* Information on any data associated with `expansion` parameter `categories`.

#### Response example details

The above JSON response example shows the following details:

* Information for the `carts` metric in the `examplersid` report suite. 
* The `type` is `int`, and the `category` is `Conversion`.
* No `categories` metadata is associated with this metric.

For more information on the Metrics API endpoints, see the [Adobe Analytics 2.0 API Reference](https://adobedocs.github.io/analytics-2.0-apis/#/).
