---
title: Tags API
description: Create, edit, or delete tags using the API.
---

# Tags API

The Analytics 2.0 Tags APIs allow you to retrieve, update, or create tags and their association with components programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with tags in the UI.

## Retrieve multiple tags

Retrieve a list of tags for the organization.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags`

You can paginate results by using the `limit` and `page` query strings.

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results.

For example, use the `page` and `limit` query strings to only retrieve the first 3 tags in a company:

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

## Retrieve a single tag

Retrieves information around the specified tag ID.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{ID}`

For example, get details around a tag with the ID of `35632`:

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

## Retrieve a list of components by tag

Retrieve all components of specific type associated with tag names.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagnames?tagNames={TAGNAMES}`

This API call requires the `tagNames` query string. Query string values include a comma-separated list of tag names to search. For example, retrieve calculated metrics associated with any one of multiple tags.

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

## Retrieve all tags for one or more components

Retrieve a list of tags tied to one or more components.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/search?componentId={ID}&componentType={TYPE}`

This API call requires two query string parameters:

* **`componentId`**: The ID of the component(s). Separate multiple ID's with a comma.
* **`componentType`**: The type of the component. Valid component types include:
  * `segment`
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

For example, retrieve the tags associated with two bookmarks:

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

## Retrieve tags for multiple components

Finds one or more tags with desired values.

`POST https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/component/search`

This API call requires a JSON request body to determine search criteria. For example:

```json
{
  "componentType": "project",
  "componentIds": [
    "component-id-556"
  ]
}
```

This API call sends a JSON request body with search criteria. Adobe returns the first three projects that contain that component.

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

## Create a tag

Creates tags for use with components.

`POST https://analytics.adobe.io/api/{COMPANY_ID}/componentmetadata/tags`

This API call requires a JSON request body so it can create the desired tag. The JSON request body is an array of tags to create. For example:

```json
[
   {
      "name":"Tag name",
      "description":"Description",
      "components":[
         {
            "componentType":"project",
            "componentId":"component-id-1"
         }
      ]
   }
]
```

The following example API call performs several actions:

* Creates two tags named "Sales Department" and "Marketing Department"
* Ties "Sales Department" with two components: one with ID `component-id-1` and `component-id-2`
* Ties "Marketing Department" with two components: one with ID `component-id-3` and `component-id-4`

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
  -d '[{ 
      "name":"sales",
      "description":"Sales Department",
      "components":[{
            "componentType":"project",
            "componentId":"component-id-1"
         },{
            "componentType":"segment",
            "componentId":"component-id-2"
         }
      ]
   },
   {
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
      ]
   }
]'
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

## Delete a tag

Deletes a tag. It also untags all components associated with the tag.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{TAG_ID}`

For example, deletes a tag with the ID `38945` and untags all components associated with it.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/38945 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

#### Response

```json
{
  "tagId": "38945",
  "status": {
    "success": true
  }
}
```

## Remove all tags from component(s)

Removes all tags from list of components.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags?componentId={ID}&componentType={TYPE}`

This API call requires two query string parameters:

* **`componentId`**: The ID of the component(s). Separate multiple ID's with a comma.
* **`componentType`**: The type of the component. Valid component types include:
  * `segment`
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

For example, remove all tags associated with two segments.

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

## Overwrite tags for components

Set the tags for one or more components. This endpoint overwrites all existing tags for the component, meaning that existing tags are removed.

`PUT https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagitems`

This API call requires a JSON request body that contains the components to update and the tags to set. For example:

```json
[
   {
      "componentType":"project",
      "componentId":"component-id-1",
      "tags":[
         {
            "name":"marketing-1",
            "description":"marketing 1"
         },
         {
            "name":"marketing-2",
            "description":"marketing 2"
         }
      ]
   }
]
```

For example, this API call performs several actions:

* Creates two tags named "marketing-1" and "marketing-2"
* Ties these two tags with the component `component-id-1`
* If there are any existing tags tied with `component-id-1`, remove those ties.

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
