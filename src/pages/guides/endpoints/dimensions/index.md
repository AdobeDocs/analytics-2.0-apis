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

**GET**  `https://analytics.adobe.io/api/{globalCompanyId}/dimensions?rsid={RSID}`

You can find your global company ID by using the [Discovery API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/discovery/).


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
| `description` | string | Contents of dimension description field in report|
| `allowedForReporting` | boolean | Whether the dimension is set to be allowed for reporting. An extra metadata item in response to the `expansion` request parameter. |
| `noneSettings` | boolean | Whether "none" item report setting is set.  |
| `tags` | object | An extra metadata item in response to the `expansion` request parameter. This can include the tag ID, tag name, tag description, and a list of components associated the tag. | |

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request. 

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{globalCompanyId}/dimensions?rsid=amc.exl.global.prod&locale=en_US&segmentable=true&reportable=true&classifiable=true&expansion=categories" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}"
```

#### Response

```json
[
  {
    "id": "variables/campaign",
    "title": "Tracking Code",
    "name": "Tracking Code",
    "type": "string",
    "category": "Traffic Sources",
    "categories": [],
    "support": [
      "dataWarehouse",
      "oberon"
    ],
    "pathable": false,
    "segmentable": true,
    "reportable": [
      "oberon"
    ],
    "supportsDataGovernance": true,
    "multiValued": false,
    "standardComponent": true
  },
  {
    "id": "variables/clickmaplink",
    "title": "Activity Map Link",
    "name": "Activity Map Link",
    "type": "string",
    "category": "ClickMap",
    "categories": [
      "Activity Map"
    ],
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
    "dataGroup": "clickmap",
    "multiValued": false
  },
]
```

#### Request example details

In the above example, the GET dimensions request specifies the `rsid` as `examplersid`. It includes the query parameter `locale` as `en_US`. The request specifies that `segmentable`, `reportable`, `classifiable`, and the `expansion` parameter `categories` as `true` so that information for those items will be returned.


#### Response example details

In the above example, the GET dimensions response lists two `classifiable` dimensions for this report suite, including `campaign` and `clickmaplink`. Each dimension title and name are also included. Both dimensions have the same `type` as `string`. But they differ in `category` -- the first is `Traffic sources` and the second is `ClickMap`. It also includes the information that both dimensions are `reportable` in `oberon` and that both are `segmentable`. Note that the dimension `campaign` does not have any categories associated with it but that the `clickmaplink` dimension is associated with `Activity Map`.

## GET dimensions ID

Use this endpoint to retrieve information for a specified dimension in a report suite.

**GET**  `https://analytics.adobe.io/api/[globalCompanyId}/dimensions/{Dimension ID}?rsid={RSID number}`

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
curl -X GET "https://analytics.adobe.io/api/{globalCompanyId}/dimensions/clickmaplink?rsid=amc.exl.global.prod&locale=en_US&expansion=allowedForReporting
" \
    -H "x-api-key: {CLIENTID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}"
```

#### Response

```json
{
  "id": "variables/clickmaplink",
  "title": "Activity Map Link",
  "name": "Activity Map Link",
  "type": "string",
  "category": "ClickMap",
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
  "dataGroup": "clickmap",
  "allowedForReporting": true,
  "multiValued": false
}
```

#### Request example details

In the above example, the request specifies the GET dimensions ID for `clickmaplink` in the `examplersid` report suite. The query parameter `locale` is included as `en_US`. The request also specifies that the response include information on whether the dimension is `allowedForReporting`.


#### Response example details

In the above example, the GET dimensions ID response shows the `clickmaplink` dimension in the `examplersid` report suite. In addition to providing standard response details for the dimension, the example shows that the dimension is `allowedForReporting`.


For more information on the Dimensions API endpoints, see the [Adobe Analytics 2.0 API Reference](https://adobedocs.github.io/analytics-2.0-apis/#/).
