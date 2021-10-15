
# Date Range APIs

The Analytics 2.0 Date Range APIs allow you to retrieve, update, or create date ranges programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with date ranges in the UI.

## Authorization and authentication

To obtain authorization and authentication, see the [Getting Started Guide for 2.0 APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/readme.md).

## /dateranges endpoint description

The `/dateranges` endpoint description is shown in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). Use the Swagger UI to see endpoint summaries, available methods, parameters, example values, models, and status codes, and to try out the API.

## Best practices

Please follow these guidelines when using the Date Range APIs:

*  Make multiple requests, each one limited to 1000 date ranges or fewer when retrieving them. Avoid making a large, single request for all possible date ranges.
*  Request data once and cache it.
*  Try to avoid creating duplicate date ranges with the same definition. Creating many date ranges will affect performance for your company in some situations.
*  Creating a date range from scratch can be difficult without familiarity of the definition specifications. We recommend using the Analysis Workspace UI for creating a date range. Then use this API to retrieve the date range and modify the definition to match what you want to do programmatically. Then we recommend that you `POST` that date range with the modified definition back to this API.

## Predefined date range

Adobe provides predefined date range templates for clients. Although original templates cannot be modified or deleted, copies of them can be made and then the copies can be modified. You can identify templates by the additional attribute `template: true`. These date range templates can be used in Workspace projects like any other type of date range.

## Expansions

The primary calculated metrics endpoints support the URL query parameter `expansion`. This parameter allows requests for some response fields to be populated that would otherwise not be included. The available options for expansion can be viewed in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). They include the following:

* `reportSuiteName`
* `ownerFullName`
* `modified`
* `tags`
* `definition`

## IncludeTypes

The GET multiple `/dateranges` endpoint supports the query parameter `includeType`. This parameter alters the set of date ranges that are included in API responses. By default, responses without this parameter include only date ranges owned by the user making the request. When using this parameter, the following values are possible:

* `all`: Returns all date ranges linked to this company - this includeType is only available to admin users
* `shared`: Returns date ranges shared with the user
* `templates`: Returns all date range templates

## Locale
All date range endpoints support the URL query parameter `locale`. Supported values are `en_US`, `fr_FR`, `jp_JP`, `ja_JP`, `de_DE`, `es_ES`, `ko_KR`, `pt_BR`, `zh_CN`, and `zh_TW`. This query parameter specifies which language is to be used for localized sections of responses. This parameter primarily affects the names of date range templates, as most other parts of a date range object are set by the client (e.g. description), which are not localized.

## Pagination

Any response that can return multiple date ranges can be paginated with the `page` and `limit` URL query parameters. The `limit` parameter indicates the size of the desired page, and the `page` parameter indicates which page you want.


## Retrieving Date Ranges

The GET multiple date ranges endpoint supports several URL query parameters that can be used to filter out which date ranges are included in the response. When requesting multiple date ranges, you can use the URL query parameters in the following table to filter and limit your response:

|           Parameter       | 	Description         |
|---------------------|-------------------------|
| `filterByIds` | Comma separated list of calculated metric ids. Returns only calculated metrics with these ids |
| `curatedRsid` | Include the curatedItem status for given rsid |

## Example cURL request

The following example shows a date ranges request for a response localized in US English, limited to the first page, and with the size of ten responses per page.

```
curl -X GET “https://analytics.adobe.io/api/aawapp6/dateranges?locale=en_US&limit=10&page=0” -H “x-api-key: [oauth token]” -H “x-proxy-global-company-id: [company name]” -H “Authorization: Bearer [ims user token]” -H “Accept: application/json” -H “Content-Type: application/json”
```

## Example response

The following example shows the response for the previous request:

```
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

## Retrieving a single Date Range

To retrieve a single date range, include its `id` in the request.

### Example request

```
curl -X GET “https://analytics.adobe.io/api/aawapp6/dateranges/5a5e294452faff002119a986?locale=en_US&expansion=definition” -H “x-api-key: [oauth token]” -H “x-proxy-global-company-id: [company id]” -H “Authorization: Bearer [ims user token]” -H “Accept: application/json” -H “Content-Type: application/json”

```

### Example response

```
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

## Deleting a Date Range

The `DELETE` single date range can be used to remove a date range that is no longer needed.

### Example `DELETE` request

The request is the same as retrieving a single date range except to change the HTTP method to `DELETE`.

```
curl -X DELETE “https://analytics.adobe.io/api/aawapp6/dateranges/5a5e294452faff002119a986?locale=en_US” -H “x-api-key: [oauth token]” -H “x-proxy-global-company-id: [company name]” -H “Authorization: Bearer [ims user token]” -H “Accept: application/json” -H “Content-Type: application/json”

```

## Updating or Changing a Date Range

Existing date ranges can be edited via the `PUT` /dateranges/[date range id] endpoint. Most date range fields can be updated, not including those that are derived or provided by the API.

The `PUT` endpoint also supports partial updates. This means that instead of sending the entire JSON object to the API, the request may include only the fields that need to be updated.

### Example `PUT` request

The following example shows JSON fields to be updated with a `PUT` request:

```
{
    "name": "new name",
    "description": "new description",
    "definition": "tm/tm+1m"
}
```

## Creating a Date Range

Date Range names are allowed to include utf-8 character combinations that are not empty strings or null. However, if the name is too long, it does not display properly in the UI, so provide only useful and understandable names to improve readability.

To create a date range with the Analytics APIs:

1. Define/Specify/Configure/Build a definition.
1. Specify a name. The name should be descriptive of what the date range does. The description field can provide additional context about the date range.
1. `POST` to the `/dateranges` endpoint.
