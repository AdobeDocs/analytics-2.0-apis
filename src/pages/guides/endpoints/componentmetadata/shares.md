---
title: Shares API
description: Determine what components are shared with whom in your organization.
---

# Shares API

The Analytics 2.0 Shares APIs allow you to retrieve, update, or create associations with components programmatically through Adobe I/O. The APIs use the same data and methods that Adobe uses in the product UI.

## Retrieve multiple shares

Retrieve a list of shares for an organization.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares`

You can paginate results by using the `limit` and `page` query strings.

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results.

For example, use the `page` and `limit` query strings to only retrieve the first 3 shares in a company:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "content": [
    {
      "shareId": 2085535,
      "shareToId": 622293,
      "shareToType": "user",
      "componentType": "segment",
      "componentId": "s300006186_590cb8b9e4b0ca84fe8152b9",
      "shareToDisplayName": null
    },
    {
      "shareId": 11684455,
      "shareToId": 239343,
      "shareToType": "group",
      "componentType": "segment",
      "componentId": "s300006186_5f4eb5bc3f56a12f743e1405",
      "shareToDisplayName": null
    },
    {
      "shareId": 11684456,
      "shareToId": 622291,
      "shareToType": "user",
      "componentType": "segment",
      "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
      "shareToDisplayName": null
    }
  ],
  "totalPages": 38,
  "totalElements": 113,
  "number": 0,
  "numberOfElements": 3,
  "firstPage": true,
  "lastPage": false,
  "sort": null,
  "size": 3
}
```

## Retrieve a single share by ID

Returns information around a single share if you know the share ID.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/{ID}`

For example, return information around the share with ID `11684455`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/11684455 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "shareId": 11684455,
  "shareToId": 239343,
  "shareToType": "group",
  "componentType": "segment",
  "componentId": "s300006186_5f4eb5bc3f56a12f743e1405",
  "shareToDisplayName": null
}
```

## Retrieve shares for multiple components

Finds one or more shares with desired values.

`POST https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/component/search`

This API call requires a JSON request body to determine search criteria. For example:

```json
{
  "componentType": "segment",
  "componentIds": [
    "example-component-1"
  ]
}
```

This API call sends a JSON request body with search criteria. Adobe returns the first three shares that involve the segment with ID `92845`.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/component/search?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{"componentType": "segment","componentIds": ["92845"]}'
```

#### Response

```json
{
  "content": [
    {
      "componentType": "segment",
      "componentId": "92845",
      "shares": [
        {
          "shareId": 11684456,
          "shareToId": 622291,
          "shareToType": "user",
          "componentType": "segment",
          "componentId": "92845",
          "shareToDisplayName": null
        }
      ]
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "number": 0,
  "numberOfElements": 1,
  "firstPage": true,
  "lastPage": true,
  "sort": null,
  "size": 10
}
```

## Retrieve components shared to current user

Returns an array of all components of a type shared to the user making the API call.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/sharedto/me?componentType={COMPONENT_TYPE}`

This API call requires the `componentType` query string. Valid values include:

* `dashboard`
* `bookmark`
* `calculatedMetric`
* `project`
* `dateRange`
* `metric`
* `dimension`
* `virtualReportSuite`
* `scheduledJob`
* `alert`
* `classificationSet`

For example, get all calculated metrics shared with me:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/sharedto/me?componentType=calculatedMetric \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
[
  "example-calculated-metric-id-1"
]
```

## Create a share

Shares a component with a group.

`POST https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares`

This API call requires a JSON body that determines what component to share and who to share it with. For example:

```json
{
  "componentId": "{COMPONENTID}",
  "componentType": "{COMPONENTTYPE}",
  "shareToId": "{groupId}",
  "shareToType": "group"
}
```

For example, share a segment with ID `83045` to a group with ID `38951`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{"componentId": "83045",
  "componentType": "segment",
  "shareToId": 38951,
  "shareToType": "group"}'
```

#### Response

```json
{
  "shareId": 12345,
  "componentId": "83045",
  "componentType": "segment",
  "shareToId": 38951,
  "shareToType": "group"
}
```

## Delete a share

Removes a share from a component.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/{ID}`

For example, deletes a share with ID `11439`.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/11439 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "shareId": 11439,
  "status": {
    "success": true
  }
}
```

## Update shares for components

Set the shares for one or more components. This endpoint overwrites all existing shares for the component, meaning that existing shares are removed.

`PUT https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares`

This API call requires a JSON request body that contains the components to update and the tags to set. For example:

```json
[
  {
    "componentType": "{COMPONENT_TYPE}",
    "componentId": "{ID}",
    "shares": [
      {
        "shareId": 11684456,
        "shareToId": 622291,
        "shareToType": "user",
        "componentType": "{COMPONENT_TYPE}",
        "componentId": "{ID}",
        "shareToDisplayName": null
      }
    ]
  }
]
```

For example, creates a share to segment with ID `48372` to user with ID `622291`. If there are any existing shares associated with this segment, those shares are lost.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X PUT \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '[{"componentType": "segment",
    "componentId": "48372",
    "shares": [{
        "shareId": 11684456,
        "shareToId": 622291,
        "shareToType": "user",
        "componentType": "segment",
        "componentId": "48372",
        "shareToDisplayName": null
      }]}]'
```

#### Response

```json
[
  {
    "componentType": "segment",
    "componentId": "48372",
    "shares": [
      {
        "shareToId": 622291,
        "shareToType": "user",
        "accessLevel": null
      }
    ],
    "status": {
      "success": true
    }
  }
]
```
