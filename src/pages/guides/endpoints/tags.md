# Tags APIs

The Analytics 2.0 Tags APIs allow you to retrieve, update, or create tags and their association with components programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with tags in the UI.

## Retrieve multiple tags

Retrieve a list of tags for the organization.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags`

### Example response

```json
{
  "content": [
    {
      "id": 596,
      "name": "sales"
    },
    {
      "id": 597,
      "name": "marketing"
    },
    {
      "id": 662,
      "name": "finance"
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

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{TAG_ID}`

### Example response

```json
{
  "id": 35632,
  "name": "sales",
  "description": "sales department",
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

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagnames`

### Example response

```json
[
  "component-id-1",
  "component-id-2"
]
```

## Retrieving tags for a component of type

Retrieve a list of tags tied to components. List of components are comma-separated IDs in the `componentIds` query string parameter. Include component type using the `componentType` query string parameter.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/search`

### Example response

```json
[
  {
    "id": 35653,
    "name": "sales",
    "description": "sales department",
    "components": [
      {
        "componentType": "{COMPONENT_TYPE}",
        "componentId": "{COMPONENT_ID}"
      }
    ]
  },
  {
    "id": 35654,
    "name": "finance",
    "description": "finance department",
    "components": [
      {
        "componentType": "{COMPONENT_TYPE}",
        "componentId": "{COMPONENT_ID}"
      }
    ]
  }
]
```

## Retrieve tags for multiple components

This API call requires a JSON request body to retrieve tags for multiple components.

`POST https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/component/search`

### Example JSON Request Message
```json
{
  "componentType": "project",
  "componentIds": [
    "component-id-556"
  ]
}
```

### Example response

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

### Example body

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

### Example response

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

### Example response

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

### Example response

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

### JSON request body

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

### Example response

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
