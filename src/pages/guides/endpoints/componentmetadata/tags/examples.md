---
title: Tags API examples
description: Example calls and responses using the tags API.
---

# Tags API examples

Example requests and responses that you can make using the tags API.

## Retrieve the first 3 tags in a company

Use the `page` and `limit` query strings to only retrieve the first 3 tags in a company.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "content": [
    {
      "id": 596,
      "name": "Sales"
    },
    {
      "id": 597,
      "name": "Marketing"
    },
    {
      "id": 662,
      "name": "Finance"
    }
  ],
  "numberOfElements": 3,
  "totalElements": 385,
  "totalPages": 129,
  "firstPage": true,
  "lastPage": false,
  "sort": null,
  "size": 3,
  "number": 0
}
```

## Retrieve information about a specific tag

Get details around a single tag if you already know the tag ID.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/35632 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "id": 35632,
  "name": "Sales",
  "description": "Sales department",
  "components": [
    {
      "componentType": "project",
      "componentId": "component-id-1"
    }
  ]
}
```

## Retrieve tags for a component of type

Retrieve the tags associated with two bookmarks.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/search?componentId=bookmark1,bookmark2&componentType=bookmark \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
[
  {
    "id": 35653,
    "name": "Sales",
    "description": "Sales department",
    "components": [
      {
        "componentType": "bookmark",
        "componentId": "bookmark1"
      }
    ]
  },
  {
    "id": 35654,
    "name": "Finance",
    "description": "Finance department",
    "components": [
      {
        "componentType": "bookmark",
        "componentId": "bookmark2"
      }
    ]
  }
]
```

## Search all projects that use a component

The API call sends a JSON request body with search criteria. Adobe returns the first three projects that contain that component.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/component/search?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{"componentType": "project", "componentIds": ["component-id-556"]}'
```

#### Response

```json
{
"content": [
  {
    "componentType": "project",
    "componentId": "component-id-556",
    "tags": [
      {
        "id": 35625,
        "name": "Finance",
        "components": []
      },
      {
        "id": 35624,
        "name": "Marketing",
        "components": []
      },      
      {
        "id": 35626,
        "name": "Warehouse",
        "components": []
      }
    ]
  }
],
"totalElements": 1,
"totalPages": 1,
"number": 0,
"numberOfElements": 1,
"firstPage": true,
"lastPage": true,
"sort": null,
"size": 10
}
```

## Find components that have one or more desired tag

Retrieve calculated metrics associated with any one of multiple tags.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagnames?tagNames=Sales,Marketing&componentType=calculatedMetric \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
[
  "calculatedmetric-1",
  "calculatedmetric-2"
]
```

## Create tags and tie them to components

This API call performs several actions:

* Create two tags named "Sales Department" and "Marketing Department"
* Tie "Sales Department" with two components: one with ID `component-id-1` and `component-id-2`
* Tie "Marketing Department" with two components: one with ID `component-id-3` and `component-id-4`

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

#### Response

```json
[
   {
      "id":35632,
      "name":"sales",
      "description":"Sales Department",
      "components":[
         {
            "componentType":"project",
            "componentId":"component-id-1"
         },
         {
            "componentType":"segment",
            "componentId":"component-id-2"
         }
      ],
      "status":{
         "success":true
      }
   },
   {
      "id":35633,
      "name":"marketing",
      "description":"Marketing Department",
      "components":[
         {
            "componentType":"project",
            "componentId":"component-id-3"
         },
         {
            "componentType":"segment",
            "componentId":"component-id-4"
         }
      ],
      "status":{
         "success":true
      }
   }
]
```

## Update a tag

Updates a tag and overwrites only the included fields from the JSON body. Omitted fields are not overwritten.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X PUT \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagitems \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '[{"componentType":"project",
      "componentId":"component-id-1",
      "tags":[{
          "name":"marketing-1",
          "description":"marketing 1"},
        {"name":"marketing-2",
          "description":"markerting 2"}]
        }
      ]'
```

#### Response

```json
[
  {
    "componentType": "project",
    "componentId": "component-id-1",
    "tags": [
      {
        "id": 35653,
        "name": "marketing-1",
        "description": "marketing 1"
      },
      {
        "id": 35654,
        "name": "marketing-2",
        "description": "marketing 2"
      }
    ],
    "status": {
      "success": true
    }
  }
]
```

## Delete a tag

Deletes a tag and untags all components associated with it.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{ID} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "tagId": "{ID}",
  "status": {
    "success": true
  }
}
```

## Remove all tags from multiple components

Remove all tags associated with two segments.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags?componentIds=segment1,segment2&componentType=segment \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

#### Response

```json
{
  "id": "segment1,segment2",
  "status": {
    "success": true
  }
}
```
