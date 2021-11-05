---
title: Tags API
description: Create, edit, or delete tags using the API.
---

# Tags API

The Analytics 2.0 Tags APIs allow you to retrieve, update, or create tags and their association with components programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with tags in the UI.

## Retrieve multiple tags

Retrieve a list of tags for the organization.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags`

## Retrieve a single tag

Retrieves information around the specified tag ID.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{ID}`

## Retrieve a list of components by tag

Retrieve all components of specific type associated with tag names.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagnames`

This API call requires the `tagNames` query string. Query string values include a comma-separated list of tag names to search.

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

## Update tags for multiple components

This API call requires a JSON request body to retrieve tags for multiple components.

`POST https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/component/search`

Example body:

```json
{
  "componentType": "project",
  "componentIds": [
    "component-id-556"
  ]
}
```

Example response:

```json
{
"content": [
  {
    "componentType": "project",
    "componentId": "component-id-556",
    "tags": [
      {
        "id": 35625,
        "name": "finance",
        "components": []
      },
      {
        "id": 35624,
        "name": "marketing",
        "components": []
      },      
      {
        "id": 35626,
        "name": "warehouse",
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

Example body:

```json
[
   {
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
      ]
   },
   {
      "name":"marketing",
      "description":"Marketing Department",
      "components":[
         {
            "componentType":"project",
            "componentId":"component-id-101"
         },
         {
            "componentType":"segment",
            "componentId":"component-id-102"
         }
      ]
   }
]
```

The JSON message requests the following:

* Create two tags with description `Sales Department` and `Marketing Department`
* Associate `Sales Department` tag with components having ids `component-id-1` and `component-id-2`
* Associate `Marketing Department` tag with components having ids `component-id-101` and `component-id-102`

Example response:

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
            "componentId":"component-id-101"
         },
         {
            "componentType":"segment",
            "componentId":"component-id-102"
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

Example response:

```json
{
  "tagId": "TAG_ID",
  "status": {
    "success": true
  }
}
```

## Remove all tags from component(s)

Removes all tags from list of components. List of components are comma-separated IDs in the `componentIds` query string parameter. Include component type using the `componentType` query string parameter.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags`

Example response:

```json
{
  "id": "{COMMA_SEPARATED_COMPONENT_IDS}",
  "status": {
    "success": true
  }
}
```

## Update tags for components

Create and delete multiple tags associated with components.

`PUT https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagitems`

Example body:

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
            "description":"markerting 2"
         }
      ]
   }
]
```

This example JSON body requests the following:

* Create two tags with description `marketing-1` and `marketing-2`
* Associate `marketing-1` and `marketing-2` tag with components with ids `component-id-1` 
* If there are any preexisting tags associated with `component-id-1`, remove these associations.

Example response:

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
