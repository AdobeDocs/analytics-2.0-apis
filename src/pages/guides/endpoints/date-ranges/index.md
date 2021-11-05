---
title: Date ranges API
description: Create, edit, or delete date ranges using the API.
---

# Date ranges API

The Analytics 2.0 Date Range APIs allow you to retrieve, update, or create date ranges programmatically through Adobe I/O. These APIs use the same data and methods that Adobe uses inside the product UI.

## Retrieve multiple date ranges

See [Date range parameters](parameters.md) for query strings that you can attach to this API call.

`GET https://analytics.adobe.io/api/{COMPANYID}/dateranges`

## Retrieve a single date range

If you know the ID of the date range that you want to retrieve, include it as part of the call.

`GET https://analytics.adobe.io/api/{COMPANYID}/dateranges/{ID}`

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
