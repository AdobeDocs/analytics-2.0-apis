---
title: Annotations APIs
description: Create, edit, or delete annotations using the API.
---

# Annotations API

The Analytics 2.0 Annotations APIs allow you to retrieve, update, or create annotations programmatically through Adobe I/O. These APIs use the same data and methods that Adobe uses inside the product UI.

## Retrieve multiple annotations

See [Annotation parameters](parameters.md) for a list of query strings that you can attach to this API call.

`GET https://analytics.adobe.io/api/{COMPANYID}/annotations`

For example, get a response localized in English, limited to the first page, with three responses per page.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/examplecompany/annotations?locale=en_US&limit=3&page=0" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "dateRange": "string",
  "color": "STANDARD1",
  "applyToAllReports": true,
  "scope": {
    "metrics": [
      {
        "id": "string",
        "componentType": "string"
      }
    ],
    "filters": [
      {
        "id": "string",
        "operator": "string",
        "dimensionType": "string",
        "terms": [
          "string"
        ],
        "componentType": "string"
      }
    ]
  },
  "deleted": true,
  "internal": true,
  "createdDate": "YYYY-03-23T01:03:05.252Z",
  "modifiedDate": "YYYY-03-23T01:03:05.252Z",
  "modifiedById": "string",
  "tags": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "shares": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "approved": true,
  "favorite": true,
  "usageSummary": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "owner": {
    "id": 0,
    "imsUserId": "string"
  },
  "companyId": 0,
  "reportSuiteName": "string",
  "rsid": "string"
}
```

## Retrieve a single annotation

You can retrieve details around a single annotation if you know the annotation ID. You can find the annotation ID by using the multiple annotations endpoint.

`GET https://analytics.adobe.io/api/{COMPANYID}/annotations/{ID}`

For example, find details around the annotation with an ID of `6091a`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/examplecompany/annotations/6091a" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "dateRange": "string",
  "color": "STANDARD1",
  "applyToAllReports": true,
  "scope": {
    "metrics": [
      {
        "id": "string",
        "componentType": "string"
      }
    ],
    "filters": [
      {
        "id": "string",
        "operator": "string",
        "dimensionType": "string",
        "terms": [
          "string"
        ],
        "componentType": "string"
      }
    ]
  },
  "deleted": true,
  "internal": true,
  "createdDate": "YYYY-03-23T01:05:24.362Z",
  "modifiedDate": "YYYY-03-23T01:05:24.362Z",
  "modifiedById": "string",
  "tags": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "shares": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "approved": true,
  "favorite": true,
  "usageSummary": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "owner": {
    "id": 0,
    "imsUserId": "string"
  },
  "companyId": 0,
  "reportSuiteName": "string",
  "rsid": "string"
}
```

## Delete an annotation

When you delete an annotation, it is hidden from all users in all menus. It is also hidden from API calls to the multiple annotations endpoint. You can still retrieve details on a deleted annotation if you still have the annotation ID.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/annotations/{ID}`

For example, delete an annotation with the ID of `c7706c`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE "https://analytics.adobe.io/api/examplecompany/annotations/c7706c" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "result": "success"
}
```

## Update an annotation

You can edit annotations using `PUT` API calls. It supports partial updates, meaning that instead of sending an entire annotation JSON object, you can only send the fields that you want to update. This API call requires a JSON body, which determines the parts of an annotation that you want to update.

`PUT https://analytics.adobe.io/api/{COMPANYID}/annotations/{ID}`

For example, only update the name of the annotation with an ID of `cdd751`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X PUT "https://analytics.adobe.io/api/examplecompany/annotations/cdd751" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{'name':'Different annotation name'}"
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "dateRange": "string",
  "color": "STANDARD1",
  "applyToAllReports": true,
  "scope": {
    "metrics": [
      {
        "id": "string",
        "componentType": "string"
      }
    ],
    "filters": [
      {
        "id": "string",
        "operator": "string",
        "dimensionType": "string",
        "terms": [
          "string"
        ],
        "componentType": "string"
      }
    ]
  },
  "deleted": true,
  "internal": true,
  "createdDate": "2022-03-23T01:07:24.199Z",
  "modifiedDate": "2022-03-23T01:07:24.199Z",
  "modifiedById": "string",
  "tags": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "shares": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "approved": true,
  "favorite": true,
  "usageSummary": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "owner": {
    "id": 0,
    "imsUserId": "string"
  },
  "companyId": 0,
  "reportSuiteName": "string",
  "rsid": "string"
}
```
