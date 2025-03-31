---
title: Dimensions API
description: Retrieve dimensions information using the API
---

# Analytics Dimensions API

The Analytics 2.0 Dimensions API endpoints allow you to retrieve Dimensions programmatically through Adobe Developer. The endpoints use the same data and methods that are used when working with Dimensions in the UI. See [Dimensions](https://experienceleague.adobe.com/docs/analytics/components/dimensions/overview.html?lang=en) in the Analytics Components guide for more information.

The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

This guide includes instructions for using the following endpoints:

* GET multiple dimensions: Returns a list of dimensions for a given report suite ID
* GET a single dimensions: Returns a dimension corresponding to a supplied ID for a given report suite

## GET multiple dimensions

Use this endpoint to return a list of dimensions for a given report suite ID.

**GET**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}`

You can find your global company ID by using the [Discovery API](../discovery.md).

### Request and response examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid=examplersid&locale=en_US&segmentable=true&reportable=true&classifiable=true&expansion=categories" \
    -H "x-api-key: {CLIENT_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}"
```

### Response

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

### Request example details

The above example requests the following details:

* The GET dimensions list for the `examplersid` report suite.
* Specifies the response language in `locale` as US English with the value `en_US`.
* The values for the `segmentable`, `reportable`, and `classifiable` parameters.
* Information for `expansion` parameter `categories`.

#### Request parameters

The GET dimensions endpoint includes the following request query parameters:

| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | -- |
| `rsid` | required | string | report suite ID |
| `locale` | optional | string | The specified language |
| `segmentable` | optional | boolean | Whether to include only dimensions that are valid within a segment |
| `reportable` | optional | boolean | Whether to include only dimensions that are valid within the report |
| `classifiable` | optional | boolean | Whether to include only classifiable dimensions |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

#### Response example details

The JSON response example above shows the following details:

* Information for two `classifiable` dimensions in the `examplersid` report suite, including `campaign` and `clickmaplink`.
* The `title` and `name` values for each dimension.
* Both dimensions have the same data `type`, set as `string`.
* The dimensions differ in `category`. The `category` for `campaign` is `Traffic sources`. The `category` for `clickmaplink` is `ClickMap`.
* Both dimensions are `reportable` in `oberon`. Both are also `segmentable`.
* The dimension `campaign` does not have any categories associated with it, but the `clickmaplink` dimension is associated with `Activity Map`.

#### Response parameters

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
| `tags` | object | An extra metadata item in response to the `expansion` request parameter. This can include the tag ID, tag name, tag description, and a list of components associated the tag. |

## GET a single dimension

Use this endpoint to retrieve information for a specified dimension in a report suite.

**GET**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions/{DIMENSION_ID}?rsid={RSID}`

### Request and response examples

Click the **Request** tab in the following example to see a cURL request. Click the **Response tab** to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions/clickmaplink?rsid=examplersid&locale=en_US&expansion=allowedForReporting
" \
    -H "x-api-key: {CLIENT_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}"
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

### Request example details

The above example requests the following details:

* The dimensions information with the `clickmaplink` ID in the `examplersid` report suite.
* Specifies the response language in `locale` as US English with the value `en_US`.
* Information on whether the dimension is `allowedForReporting`.

#### Request parameters

The GET dimensions ID endpoint includes the following request query parameters:

| Parameter | Req/Opt | Type | Description |
| --- | --- | -- | -- |
| `id` | required | string | Dimenstion ID (e.g.`evar1`) |
| `rsid` | required | string | Report suite ID |
| `locale` | optional | string | The specified language |
| `expansion` | optional | array (string) | A comma-delimited list of additional metadata to items, including `tags`, `allowedForReporting`, and `categories` |

### Response example details

The above JSON response example shows the following `clickmaplink` dimension details for the `examplersid` report suite:

* Standard response details for the dimension, including the information that it is reportable to the `oberon` tool.
* The dimension is allowed for reporting as indicated by `allowedForReporting: true`.

#### Response parameters

The GET dimensions ID endpoint includes the same response parameters as the GET dimensions response parameters, as described above.

For more information on the Dimensions API endpoints, see the [Adobe Analytics 2.0 API Reference](https://adobedocs.github.io/analytics-2.0-apis/#/).
