---
title: Date range examples
description: Several example API calls and responses.
---

# Date range examples

Example API calls made using the date range API.

## Request multiple date ranges

A date range request for a response localized in English, limited to the first page, with ten responses per page.

```sh
curl -X GET "https://analytics.adobe.io/api/aawapp6/dateranges?locale=en_US&limit=10&page=0" -H "x-api-key: [oauth token]" -H "x-proxy-global-company-id: [company name]" -H "Authorization: Bearer [ims user token]" -H "Accept: application/json" -H "Content-Type: application/json"
```

Response:

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
    },
    {
      "id": "5e793112e58055470d34589a",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e7a1334e58055470d34592f",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e8b80ca1d77104488659d9a",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e8b80d7c50fbf606ac3843b",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e8b80df7f17335cfa66680a",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e8b80e90d087502cdf43b67",
      "name": "Integration Test 1",
      "description": "Integration Test 1 Description",
      "owner": {
        "id": 622291
      },
      "createDate": null,
      "disabledDate": null
    },
    {
      "id": "5e8b80f18191bc0e83c22b1a",
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
  "totalPages": 4,
  "numberOfElements": 10,
  "number": 0,
  "firstPage": true,
  "lastPage": false,
  "sort": null,
  "size": 10
}
```

## Retrieve a single date range

Send a call that retrieves a single date range based on its ID.

```sh
curl -X GET "https://analytics.adobe.io/api/aawapp6/dateranges/5a5e294452faff002119a986?locale=en_US&expansion=definition" -H "x-api-key: [oauth token]" -H "x-proxy-global-company-id: [company id]" -H "Authorization: Bearer [ims user token]" -H "Accept: application/json" -H "Content-Type: application/json"
```

Response:

```json
{
  "id": "5a5e294452faff002119a986",
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
