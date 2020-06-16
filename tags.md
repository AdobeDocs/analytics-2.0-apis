# Tags APIs

The Analytics 2.0 Tags APIs allow you to retrieve, update, or create tags and their association with components programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with tags in the UI.

## Authorization and authentication

To obtain authorization and authentication, see the [Getting Started Guide for 2.0 APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/readme.md).

## `/componentmetadata/tags` endpoint description

The `/componentmetadata/tags` endpoint description is shown in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). Use the Swagger UI to see endpoint summaries, available methods, parameters, example values, models, and status codes, and to try out the API.

## Example creating tags

The following request example includes both a JSON message request body and a `curl` request to create tags and associate them with existing components.

### JSON Request Message
```json={line-numbers="yes"}
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
* create two tags with description `Sales Department` and `Marketing Department`
* associate `Sales Department` tag with components having ids `component-id-1` and `component-id-2`
* associate `Marketing Department` tag with components having ids `component-id-101` and `component-id-102`

#### `curl` Request

```bash
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

### Example Response

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

## Example deleting a tag

The following request example includes a `curl` request to delete a tag. It will also un-tag any/all components associated with the tag.

### `curl` Request

```bash
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{TAG_ID} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```
The above curl command requests the following:
* Delete tag with id `TAG_ID` and its association with other components

### Example Response

```json
{
  "tagId": "TAG_ID",
  "status": {
    "success": true
  }
}
```

## Example removing all tags from components

The following request example includes a `curl` request to removes all tags from list of components.

### `curl` Request

```bash
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags?componentIds={COMMA_SEPARATED_COMPONENT_IDS}&componentType={COMPONENT_TYPE} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```
The above curl command requests the following:
* Removes all tags from list of component ids

### Example Response

```json
{
  "id": "{COMMA_SEPARATED_COMPONENT_IDS}",
  "status": {
    "success": true
  }
}
```

## Example retrieving list of tags for a company

The following request example includes a `curl` request to retrieve tags for current company.

### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```
The above curl command requests the following:
* Retrieve specific page with query param `page`
* Retrieve specific number of tags in a page with query param `limit`

### Example Response

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

## Example retrieve tags for multiple components

The following request example includes both a JSON message request body and a `curl` request to retrieve tags for multiple components.

### JSON Request Message
```json={line-numbers="yes"}
{
  "componentType": "project",
  "componentIds": [
    "component-id-556"
  ]
}
```

### `curl` Request

```bash
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/component/search?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

The JSON message requests the following:
* Retrieves all tags for component id `component-id-556` of type project
* Retrieve specific page with query param `page`
* Retrieve specific number of tags in a page with query param `limit`

### Example Response

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

## Example retrieving components using tags

The following request example includes a `curl` request to retrieve a components of specific type associated with tag names.

#### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagnames?tagNames={COMMA_SEPARATED_TAG_NAMES}&componentType={COMPONENT_TYPE} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```
The above curl command requests the following:
* Get components associated with tags present in `COMMA_SEPARATED_TAG_NAMES`  and of type `COMPONENT_TYPE`

### Example Response

```json
[
  "component-id-1",
  "component-id-2"
]
```

## Example retrieving tag using id

The following request example includes a `curl` request to retrieve a tag with id.

#### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{TAG_ID} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

### Example Response

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

## Example retrieving tags for a component of particular type

The following request example includes a `curl` request to retrieve tags for a component of particular type.

#### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/search?componentId={COMPONENT_ID}&componentType={COMPOENT_TYPE} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

### Example Response

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

## Update tags for components

The following request example includes both a JSON message request body and a `curl` request to create and delete multiple tags associated with components.

### JSON Request Message
```json={line-numbers="yes"}
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
The JSON message requests the following:
* create two tags with description `marketing-1` and `marketing-2`
* associate `marketing-1` and `marketing-2` tag with components with ids `component-id-1` 
* if there are any preexisting tags associated with `component-id-1` then remove these associations.

#### `curl` Request

```bash
curl -X PUT \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagitems \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

### Example Response

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
