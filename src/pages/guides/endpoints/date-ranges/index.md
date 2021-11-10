---
title: Date ranges API
description: Create, edit, or delete date ranges using the API.
---

# Date ranges API

The Analytics 2.0 Date Range APIs allow you to retrieve, update, or create date ranges programmatically through Adobe I/O. These APIs use the same data and methods that Adobe uses inside the product UI.

## Retrieve multiple date ranges

See [Date range parameters](parameters.md) for query strings that you can attach to this API call.

`GET https://analytics.adobe.io/api/{COMPANYID}/dateranges`

For example, get a response localized in English, limited to the first page, with three responses per page.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/aawapp6/dateranges?locale=en_US&limit=3&page=0" \
    -H "x-api-key: [oauth token]" \
    -H "x-proxy-global-company-id: [company name]" \
    -H "Authorization: Bearer [ims user token]" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "content": [
    {
      "id": "5a5e294452faff002119a986",
      "name": "Curated Data Range Test",
      "description": "Curated Data Range Test",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "591f2edabef0d37113bbcbf5",
      "name": "Sample Date Range (Don't delete it)",
      "description": "Sample Date Range",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e79255b4201ce1b3cfd7b2b",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    }
  ],
  "totalElements": 34,
  "totalPages": 12,
  "numberOfElements": 3,
  "number": 0,
  "firstPage": true,
  "lastPage": false,
  "sort": null,
  "size": 3
}
```

## Retrieve a single date range

If you know the ID of the date range that you want to retrieve, include it as part of the call.

`GET https://analytics.adobe.io/api/{COMPANYID}/dateranges/{ID}`

For example, get a date range with ID `839455` and also include its definition.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/aawapp6/dateranges/839455?expansion=definition" \
    -H "x-api-key: [oauth token]" \
    -H "x-proxy-global-company-id: [company id]" \
    -H "Authorization: Bearer [ims user token]" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "839455",
  "name": "Curated Data Range Test",
  "description": "Curated Data Range Test",
  "owner": {
    "id": 622291
  },
  "definition": "tm/tm+1m",
  "createDate": null,
  "disabledDate": null
}
```

## Delete a date range

Permanently deletes a date range by ID. The request is similar to retrieving a single date range, but with a `DELETE` request instead of a `GET` request.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/dateranges/{ID}`

## Update or change a date range

Overwrite fields in a date range with desired values. Partial updates are supported, meaning that you can send only the parts of the date range that you want updated and the other fields are not changed. If you send an empty string, that field is cleared.

Date range templates cannot be updated. Copy a template to a new date range, then make the changes to the copy.

`PUT https://analytics.adobe.io/api/{COMPANYID}/dateranges/{ID}`

This API call requires a JSON body. Include the fields that you want to update in the body. For example:

```json
{
  "name": "New name",
  "description": "New description",
  "definition": "tm/tm+1m"
}
```

## Create a date range

Create a date range. The name cannot be an empty string or null, and is encoded in UTF-8. Adobe recommends clear and concise names so that they render correctly in the product UI.

`POST https://analytics.adobe.io/api/{COMPANYID}/dateranges/`

This API call requires a JSON body. Required fields include `name` and `definition`. For example:

```json
{
  "name": "Two months ago",
  "description": "Description",
  "definition": "tm-3m/tm-2m"
}
```
