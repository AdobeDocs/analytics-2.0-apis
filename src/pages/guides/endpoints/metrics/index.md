---
title: Metrics API
description: Retrieve metrics information using the API.
---

# Analytics Metrics API

The Analytics 2.0 Metrics API endpoints allow you to retrieve metrics programmatically through Adobe Developer. The endpoints use the same data and methods that are used when working with metrics in the UI. See [Metrics](https://experienceleague.adobe.com/docs/analytics/components/metrics/overview.html?lang=en) in the Analytics Components guide for more information. For information on  using Calculated Metrics API, see the [Calculated Metrics API endpoint guide](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/calculatedmetrics/). 

The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

This guide includes instructions for using the following endpoints:

* GET metrics: Returns a list of metrics for a given report suite ID
* GET metrics ID: Returns a metric corresponding to a supplied ID for a given report suite

## GET metrics

Use this endpoint to return a list of metrics for a given report suite ID.

**GET**  `https://analytics.adobe.io/api//dimensions?rsid={RSID number}`

### Request parameters

The GET metrics endpoint includes the following request query parameters:


| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `rsid` | required | string | report suite ID |
| `locale` | optional | string | The specified language |
| `segmentable` | optional | boolean | Whether to include only dimensions that are valid within a segment |
| `reportable` | optional | boolean | Whether to include only dimensions that are valid within the report |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response parameters

The GET metrics endpoint includes the following response parameters:

| Parameter | Type | Description |
| --- | --- | -- |
| `id` | string | Dimension ID |
| `title` | string | Dimension title |
| `name` | string | Dimension name |
| `type` | array of enums | Lists the data type of the dimension |
| `category` | string | Product category |
| `categories` | string | Product categories. An extra metadata item in response to the `expansion` request parameter. |
| `support` | string | Support information |
| `pathable` | boolean | Whether the report/dimension is pathing enabled |
| `parent` | string | Parent dimension |
| `extraTitleInfo` | string | Additional title info |
| `segmentable` | boolean | Whether the dimension is segmentable |
| `reportable` | array (string) | Whether the dimension is segmentable |
| `description` | string | Contents of report/dimension description field |
| `allowedForReporting` | boolean | Whether the dimension is set to be allowed for reporting. An extra metadata item in response to the `expansion` request parameter. |
| `noneSettings` | boolean | Whether "none" item report setting is set.  |
| `tags` | object | Metadata tags. An extra metadata item in response to the `expansion` request parameter. |

### Request and response examples

Click the **Request** tab in the following example to see a cURL request. Click the **Response tab** to see a successful JSON response for the request. 

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/exampleco/calculatedmetrics?locale=en_US&limit=10&page=0" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}"
```

#### Response

```json
[    
  {
    "id": "cm_bouncerate_defaultmetric",
    "name": "Bounce Rate",
    "description": "Default Bounce Rate Metric",
    "polarity": "positive",
    "precision": 1,
    "type": "percent",
    "definition": {
      "formula": {
        "col": {
          "func": "divide",
          "col2": {
            "func": "metric",
            "name": "metrics/entries",
            "description": "Entries"
          },
          "col1": {
            "func": "metric",
            "name": "metrics/bounces",
            "description": "Bounces"
          }
        },
        "func": "visualization-group"
      },
      "func": "calc-metric",
      "version": [
        1,
        0,
        0
      ]
    },
    "template": true,
    "categories": [
      "Calculated Metrics"
    ]
  },
  {
    "id": "cm_revenue_visitor_defaultmetric",
    "name": "Revenue / Visitor",
    "description": "Default Revenue / Visitor Metric",
    "polarity": "positive",
    "precision": 2,
    "type": "currency",
    "definition": {
      "formula": {
        "func": "divide",
        "col2": {
          "func": "metric",
          "name": "metrics/visitors"
        },
        "col1": {
          "func": "metric",
          "name": "metrics/revenue"
        }
      },
      "func": "calc-metric",
      "version": [
        1,
        0,
        0
      ]
    },
    "template": true,
    "categories": [
      "Calculated Metrics"
    ]
  }
]
```

## GET metrics ID

Use this endpoint to retrieve information for a specified metric in a report suite.

**GET**  `https://analytics.adobe.io/api//dimensions/{Dimension ID}?rsid={RSID number}`

### Request parameters

The GET metrics ID endpoint includes the following request query parameters:


| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `id` | required | string | Dimenstion ID (e.g.`evar1`) |
| `rsid` | required | string | Report suite ID |
| `locale` | optional | string | The specified language |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response parameters

The GET metrics ID endpoint includes the same response parameters as the GET metrics response parameters, as described above.

### Request and response examples

Click the **Request** tab in the following example to see a cURL request. Click the **Response tab** to see a successful JSON response for the request. 

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/exampleco/calculatedmetrics?locale=en_US&limit=10&page=0" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}"
```

#### Response

```json
[    
  {
    "id": "cm_bouncerate_defaultmetric",
    "name": "Bounce Rate",
    "description": "Default Bounce Rate Metric",
    "polarity": "positive",
    "precision": 1,
    "type": "percent",
    "definition": {
      "formula": {
        "col": {
          "func": "divide",
          "col2": {
            "func": "metric",
            "name": "metrics/entries",
            "description": "Entries"
          },
          "col1": {
            "func": "metric",
            "name": "metrics/bounces",
            "description": "Bounces"
          }
        },
        "func": "visualization-group"
      },
      "func": "calc-metric",
      "version": [
        1,
        0,
        0
      ]
    },
    "template": true,
    "categories": [
      "Calculated Metrics"
    ]
  },
  {
    "id": "cm_revenue_visitor_defaultmetric",
    "name": "Revenue / Visitor",
    "description": "Default Revenue / Visitor Metric",
    "polarity": "positive",
    "precision": 2,
    "type": "currency",
    "definition": {
      "formula": {
        "func": "divide",
        "col2": {
          "func": "metric",
          "name": "metrics/visitors"
        },
        "col1": {
          "func": "metric",
          "name": "metrics/revenue"
        }
      },
      "func": "calc-metric",
      "version": [
        1,
        0,
        0
      ]
    },
    "template": true,
    "categories": [
      "Calculated Metrics"
    ]
  }
]
```

For more information on the Metrics API endpoints, see the [Adobe Analytics 2.0 API Reference](https://adobedocs.github.io/analytics-2.0-apis/#/).
