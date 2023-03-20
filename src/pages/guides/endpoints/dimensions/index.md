---
title: Dimensions API
description: Retrieve dimensions information using the API.
---

# Analytics Dimensions API

The Analytics 2.0 Dimensions API endpoints allow you to retrieve Dimensions programmatically through Adobe Developer. The endpoints use the same data and methods that are used when working with Dimensions in the UI. See [Dimensions](https://experienceleague.adobe.com/docs/analytics/components/dimensions/overview.html?lang=en) in the Analytics Components guide for more information. 

The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

This guide includes instructions for using the following endpoints:

* GET dimensions: Returns a list of dimensions for a given report suite ID
* GET dimensions ID: Returns a dimension corresponding to a supplied ID for a given report suite

## GET dimensions

Use this endpoint to return a list of dimensions for a given report suite ID.

**GET**  `https://analytics.adobe.io/api//dimensions?rsid={RSID number}`

### Request parameters

The GET dimensions endpoint includes the following request query parameters:


| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `rsid` | required | string | report suite ID |
| `locale` | optional | string | The specified language |
| `segmentable` | optional | boolean | Whether to include only dimensions that are valid within a segment |
| `reportable` | optional | boolean | Whether to include only dimensions that are valid within the report |
| `classifiable` | optional | boolean | Whether to include only classifiable dimensions |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response parameters

The GET dimensions endpoint includes the following response parameters:

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

## GET dimensions ID

Use this endpoint to retrieve information for a specified dimension in a report suite.

**GET**  `https://analytics.adobe.io/api//dimensions/{Dimension ID}?rsid={RSID number}`

### Request parameters

The GET dimensions ID endpoint includes the following request query parameters:


| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | --|
| `id` | required | string | Dimenstion ID (e.g.`evar1`) |
| `rsid` | required | string | Report suite ID |
| `locale` | optional | string | The specified language |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response parameters

The GET dimensions ID endpoint includes the same response parameters as the GET dimensions response parameters, as described above.

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

For more information on the Dimensions API endpoints, see the [Adobe Analytics 2.0 API Reference](https://adobedocs.github.io/analytics-2.0-apis/#/).
