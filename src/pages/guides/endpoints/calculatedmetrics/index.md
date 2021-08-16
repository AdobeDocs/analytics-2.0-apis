---
title: Calculated Metrics
description: Add, edit, or delete calculated metrics using the API.
---

# Calculated metrics

The Analytics 2.0 Calculated Metrics APIs allow you to retrieve, update, or create calculated metrics programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with calculated metrics in the UI. See [Calculated metrics](https://experienceleague.adobe.com/docs/analytics/components/calculated-metrics/cm-overview.html) in the Analytics Components guide for more information.

## Predefined calculated metrics

Adobe provides predefined calculated metrics templates for clients. Although original templates cannot be modified or deleted, copies of them can be made and then the copies can be modified. You can identify templates by the additional attribute `template: true`. Also, all template ids start with `cm_`. These calculated metrics templates can be used in Workspace projects like any other type of calculated metric but will not work in any other contexts.

## Expansions

The primary calculated metrics endpoints support the URL query parameter `expansion`. This parameter allows requests for some response fields to be populated that would otherwise not be included. They include the following:

* `reportSuiteName`
* `ownerFullName`
* `modified`
* `tags`
* `definition`
* `compatibility`
* `categories`

See the [API reference](/src/pages/2.0/api.md) for the full list and descriptions.

### IncludeTypes

The GET multiple `/calculatedmetrics` endpoint supports the query parameter `includeType`. This parameter alters the set of calculated metrics that are included in API responses. By default, responses without this parameter include only calculated metrics owned by the user making the request. When using this parameter, the following values are possible:

* `all`: Returns all calculated metrics linked to this company - this includeType is only available to admin users
* `shared`: Returns calculated metrics shared with the user
* `templates`: Returns all calculated metric templates

### Locale

All calculated metrics endpoints support the URL query parameter `locale`. Supported values are `en_US`, `fr_FR`, `jp_JP`, `ja_JP`, `de_DE`, `es_ES`, `ko_KR`, `pt_BR`, `zh_CN`, and `zh_TW`. This query parameter specifies which language is to be used for localized sections of responses. This parameter primarily affects the names of calculated metric templates, as most other parts of a calculated metric object include standard values (e.g. metric ids) or are set by the client (e.g. description), which are not localized.

### Pagination

Any response that can return multiple calculated metrics can be paginated with the `page` and `limit` URL query parameters. The `limit` parameter indicates the size of the desired page, and the `page` parameter indicates which page you want.

## Retrieving calculated metrics

The GET multiple calculated metrics endpoint supports several URL query parameters that can be used to filter out which calculated metrics are included in the response. When requesting multiple calculated metrics, you can use the URL query parameters in the following table to filter and limit your response:

|           Parameter       | 	Description         |
|---------------------|-------------------------|
| `rsids` | Comma separated list of report suite ids. Returns only calculated metrics linked to these report suites |
| `ownerId` | Filter list to only include calculated metrics owned by the specified loginId |
| `filterByIds` | Comma separated list of calculated metric ids. Returns only calculated metrics with these ids |
| `toBeUsedInRsid` | A single report suite id. Returns only calculated metrics that are compatible with this report suite |
| `name` | A list of key words. Returns only calculated metrics with these key words in their names |
| `tagNames` | A list of tags. Returns only calculated metrics with these tags |
| `favorite` | `true` or `false`. Returns only calculated metrics that are flagged as favorites |
| `approved` | `true` or `false`. Returns only calculated metrics that are flagged as approved |
| `sortDirection` | Sort direction (ASC or DESC) |
| `sortProperty` | Property to sort by (name, modified_date, id is currently allowed) |

For example, to retrieve all calculated metrics tagged as part of the *SpringPromotion* campaign, you can add the URL parameter `tagNames=SpringPromotion`.

## Retrieve multiple calculated metrics

The following example shows a calculated metrics request for a response localized in US English, limited to the first page, and with the size of ten responses per page.

```sh
curl -X GET "https://analytics.adobe.io/api/[company name]/calculatedmetrics?locale=en_US&limit=10&page=0" -H "x-api-key: [oauth token]" -H "x-proxy-global-company-id: [company name]" -H "Authorization: Bearer [ims user token]" -H "Accept: application/json" -H "Content-Type: application/json"
```

### Example response

The following example shows the response for the previous request, including the predefined calculated metrics for Bounce Rate and Revenue per Visitor (`cm_bouncerate_defaultmetric` and `cm_revenue_visitor_defaultmetric`):

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
```

## Retrieving a single calculated metric

To retrieve a single calculated metric, include its `id` in the request.

### Example request

```sh
curl -X GET "https://analytics.adobe.io/api/[company name]/calculatedmetrics/[calculated metric id]?locale=en_US" -H "x-api-key: [oauth token]" -H "x-proxy-global-company-id: [company id]" -H "Authorization: Bearer [ims user token]" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example response

```json
{
  "id": "cm_bouncerate_defaultmetric",
  "name": "Bounce Rate",
  "description": "Default Bounce Rate Metric",
  "polarity": "positive",
  "precision": 1,
  "type": "percent",
  "definition": { "formula": { "col": { "func": "divide", "col2": { "func": "metric", "name": "metrics/entries", "description": "Entries" }, "col1": { "func": "metric", "name": "metrics/bounces", "description": "Bounces" } }, "func": "visualization-group" }, "func": "calc-metric", "version": [ 1, 0, 0 ] },
  "template": true,
  "categories": [ "Calculated Metrics" ]
}

```

## Deleting a calculated metric

The `DELETE` single calculated metric can be used to remove a calculated metric that is no longer needed.

### Example `DELETE` request

The request is the same as retrieving a single calculated metric except to change the HTTP method to `DELETE`.

```sh
curl -X DELETE "https://analytics.adobe.io/api/[company name]/calculatedmetrics/[calculated metrics id]?locale=en_US" -H "x-api-key: [oauth token]" -H "x-proxy-global-company-id: [company name]" -H "Authorization: Bearer [ims user token]" -H "Accept: application/json" -H "Content-Type: application/json"
```

## Updating or Changing a Calculated Metric

Existing calculated metrics can be edited via the `PUT /calculatedmetrics/[calculated metric id]` endpoint. Most calculated metrics fields can be updated, not including those that are derived or provided by the API.

The `PUT` endpoint also supports partial updates. This means that instead of sending the entire JSON object to the API, the request may include only the fields that need to be updated.

### Example `PUT` request

The following example shows JSON fields to be updated with a `PUT` request:

```json
{

    "id": "cm1234_abcdef0123456789",
    "name": "new name",
    "description": "new description",
    "rsid": "[report suite id]",
    "owner": {
        "id": 123456
    }

}
```

## Creating a Calculated Metric

Calculated metric names are allowed to include utf-8 character combinations that are not empty strings or null. However, if the name is too long, it does not display properly in the UI, so provide only useful and understandable names to improve readability.

To create a calculated metric with the Analytics APIs:

1. Define/Specify/Configure/Build a definition.
1. `POST` the definition against the validate endpoint as in the above example with the id of the report suite the calculated metric is most likely to be used with.
1. Specify a name. The name should be descriptive of what the calculated metric does. The description field can provide additional context about the calculated metric.
1. `POST` to the `/calculatedmetrics` endpoint.
