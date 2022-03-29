---
title: Projects APIs
description: Create, edit, or delete projects using the API.
---

# Projects API

The Analytics 2.0 Projects APIs allow you to retrieve, update, or create projects programmatically through Adobe I/O. These APIs use the same data and methods that Adobe uses inside the product UI.

## Retrieve multiple projects

See [Project parameters](parameters.md) for a list of query strings that you can attach to this API call.

`GET https://analytics.adobe.io/api/{GLOBALCOMPANYID}/projects`

For example, get a response localized in English, limited to the first page, with three responses per page.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/examplecompany/projects?locale=en_US&limit=3&page=0" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {GLOBALCOMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "content": [
    {
      "id": "6091a10005c7706c0acdd751",
      "name": "New Project 1",
      "description": "",
      "rsid": "examplersid",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "YYYY-05-04T19:31:12Z"
    },
    {
      "id": "6094a7e01936af351300b81b",
      "name": "Example project",
      "description": "",
      "rsid": "examplersid",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "YYYY-05-07T02:37:20Z"
    },
    {
      "id": "6094aa6b318ae31bf7d0a052",
      "name": "My project 3",
      "description": "",
      "rsid": "examplersid",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "YYYY-05-07T02:48:11Z"
    }
  ],
  "totalPages": 32,
  "totalElements": 94,
  "number": 0,
  "numberOfElements": 3,
  "firstPage": true,
  "lastPage": false,
  "sort": [
    {
      "direction": "ASC",
      "property": "id",
      "ignoreCase": false,
      "ascending": true
    }
  ],
  "size": 3
}
```

## Retrieve a single project

You can retrieve details around a single project if you know the project ID. You can find the project ID by looking in the [debugger](../reports/debugger.md) or using the multiple projects endpoint.

`GET https://analytics.adobe.io/api/{GLOBALCOMPANYID}/projects/{ID}`

For example, find details around the project with an ID of `6091a`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/examplecompany/projects/6091a" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {GLOBALCOMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "6091a",
  "name": "Example project",
  "description": "",
  "rsid": "examplersid",
  "owner": {
    "id": 622291
  },
  "type": "project",
  "created": "YYYY-05-04T19:31:12Z"
}
```

## Delete a project

When you delete a project, it is hidden from all users in all menus. It is also hidden from API calls to the multiple projects endpoint. You can still retrieve details on a deleted project if you still have the project ID.

`DELETE https://analytics.adobe.io/api/{GLOBALCOMPANYID}/projects/{ID}`

For example, delete a project with the ID of `c7706c`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE "https://analytics.adobe.io/api/examplecompany/projects/c7706c" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {GLOBALCOMPANYID}" \
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

## Update a project

You can edit projects using `PUT` API calls. It supports partial updates, meaning that instead of sending an entire project JSON object, you can only send the fields that you want to update. This API call requires a JSON body, which determines the parts of a project that you want to update.

`PUT https://analytics.adobe.io/api/{GLOBALCOMPANYID}/projects/{ID}`

For example, only update the name of the project with an ID of `cdd751`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X PUT "https://analytics.adobe.io/api/examplecompany/projects/cdd751" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {GLOBALCOMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{'name':'Different project name'}"
```

#### Response

```json
{
  "id": "cdd751",
  "name": "Different project name",
  "description": "",
  "rsid": "examplersid",
  "owner": {
    "id": 622291
  },
  "type": "project",
  "created": "YYYY-05-04T19:31:12Z"
}
```

## Validate

Report suites can have different configurations, variables or metrics. One project that is valid in one report suite might not be valid in another. You can use this endpoint to make sure that a project is compatible with a report suite.

This API call requires a JSON request body, which is a [project definition](definition.md). It also requires a report suite ID so it knows which report suite to validate the project against.

`POST https://analytics.adobe.io/api/{GLOBALCOMPANYID}/projects/validate?rsid={RSID}`

For example, validate a basic project against the report suite `apptestpnwtest`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://analytics.adobe.io/api/examplecompany/projects/validate?rsid=apptestpnwtest" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "x-proxy-global-company-id: {GLOBALCOMPANYID}" \
    -d '{
        "project": {
            "id": "6091a10005c7706c0acdd751",
            "name": "New Project",
            "description": "",
            "rsid": "apptestpnwtest",
            "owner": {"id": 622291},
            "type": "project",
            "definition": {See the project definition page for a full example definition},
            "created": "YYYY-05-04T19:31:12Z"
          }
        }'
```

#### Response

```json
{
  "valid": true,
  "validatorVersion": "1.0.0"
}
```
