# Segments APIs

## Segments Overview

The Analytics 2.0 Segments APIs allow you to retrieve, update, or create segments programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with segments in the UI. For more information on Adobe Analytics segments, see [Adobe Help](https://docs.adobe.com/content/help/en/analytics/components/segmentation/seg-home.html). For more information on understanding segment definition data architecture, see the [Segment Definition](segments.md) article that accompanies this user guide.

## Authorization and Authentication

To obtain authorization and authentication, see the [Getting Started Guide for 2.0 APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/create-oauth-client.md).

## Best Practices

Please follow these guidelines when using the Segments APIs:

*  Make multiple, smaller requests instead of a large, single request.
*  Request data once and cache it.
*  Use caution when updating a segment so that you do not alter the original segment used by others.
*  Avoid creating duplicate segments with the same definition. Creating many segments will affect performance for your company in some situations.
*  If possible use the Analytics UI for creating segments from scratch. The UI offers significant advantages for managing and optimizing the complexity of this task. If you need to create segments programmatically, it is usually easier to create a template segment in the UI and then have your application change only small portions of the segment definition.

## /segments Endpoint Description

The `/segments` endpoint description is shown in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). Use the Swagger UI to see endpoint summaries, available methods, parameters, example values, models, and status codes, and to try out the API.

## Templates

Adobe provides many predefined segments, or templates, for clients in specific situations. Although original templates cannot be modified, copies of them can be made and then the copies can be modified. You can identify templates by the additional attribute `template: true` as shown at the bottom of the following example:

```

{
      "id": "Has_An_Action",
      "name": "Has an Action",
      "description": null,
      "definition": {
        "container": {
          "func": "container",
          "pred": {
            "val": {
              "func": "attr",
              "name": "variables/mobileaction"
            },
            "func": "exists",
            "description": "Action Name"
          },
          "context": "hits"
        },
        "func": "segment",
        "version": [
          1,
          0,
          0
        ]
      },
      "template": true
},

```
For more information on segments templates, see [Adobe Help](https://docs.adobe.com/content/help/en/analytics/components/segmentation/segmentation-workflow/seg-build.html).

### Expansions

Segments endpoints support the URL query parameter `expansion`. This parameter allows specifying additional data fields to be populated in response objects. Available expansions are shown in the [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/) description. The following table describes expansion fields:

|           Field       | 	Description         |
|---------------------|-------------------------|
| reportSuiteName | The name of the report suite |
| ownerFullName | The name of the owner of the segment |
| modified | The date the segment was last modified |
| tags |  Tags applied to the segment |
| compatibility| The Analytics products compatible with this segment |
| definition | The [segment definition](segments.md) |

### Locale

Segment endpoints support the URL query parameter `locale`. Supported values are `en_US`, `fr_FR`, `jp_JP`, `ja_JP`, `de_DE`, `es_ES`, `ko_KR`, `pt_BR`, `zh_CN`, and `zh_TW`. This query parameter specifies the language for responses. For example, the `en_US` localized name for the `Abandon_Cart` segment is returned as *Abandon Cart*. With the `es_ES` (Spanish) value, the same segment is returned as *Vaciar carro*.

### Compatibility

Some segments can only be used with certain reporting engines. For example, some segments work only with Data Warehouse and some work only with Analysis Workspace. The compatibility expansion includes a return object that specifies the products in which the segment can be used. The version information of the products is also included in the response. The version information is for internal use and can be ignored. Compatibility and version information cannot be edited because they are derived from the definition of the segment.

## Pagination

Any response that can return multiple segments can be paginated with the `page` and `limit` URL query parameters. The `limit` parameter indicates the size of the desired page, and the `page` parameter indicates which page you want. A maximum page size of 1000 is enforced.

## Creating Segments

As mentioned in the [Best Practices](#best-practices) section above, the Analytics UI is recommended for creating segments from scratch. If you do choose to use the API to create segments, keep in mind that certain fields cannot be supplied via the `POST /segments` endpoint. For example, `tags` are not stored within the segments themselves and will therefore be ignored if supplied on a creation request. To modify a segment's tags, use the [Tags APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/tags.md).

## Retrieving Segments

When requesting a list of segments, you can use multiple URL query parameter filters. You can filter by `name`, `tagNames`, segment id (`segmentFilter`), and `rsids`. For example, to retrieve all segments tagged as part of the *SpringPromotion* campaign, you can add the URL parameter `tagNames=SpringPromotion`. The `tagNames`, `segmentFIlter`, and `rsids` filters accept comma-delimited lists. These lists should be short, with no more than 100 items.

*Note: While segments are global to a company, the rsid filter specifically designates the rsid that the segment was created/validated against. The rsid filter designation does not mean that it is the only report suite the segment can be used on.*

### Example cURL Request

The following example requests all segments tagged as part of the *SpringPromotion* campaign on page 0 with page size 10:

```

curl -X GET "https://analytics.adobe.io/api/cellina/segments?locale=en_US&tagNames=SpringPromotion&limit=10&page=0" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example Response

The following response shows six segments tagged as part of the *SpringPromotion* campaign returned on one page:

```

{
   "content":[
      {
         "id":"s300000022_591a105ce4b0fc8647cec9ae",
         "name":"non-oberon segment",
         "description":"non-oberon segment",
         "rsid":"obue.analytics.spa",
         "owner":{
            "id":596983
         }
      },
      {
         "id":"s300000022_5924b570e4b0b06b9cc6e74b",
         "name":"LONDON",
         "description":"",
         "rsid":"obue.appservicesprod",
         "owner":{
            "id":596983
         }
      },
      {
         "id":"s300000022_5b9fe2a19678905e58c6f2b6",
         "name":"test aam",
         "description":"test aam",
         "rsid":"myrsid",
         "owner":{
            "id":596983
         }
      },
      {
         "id":"s300000022_5b9fee889678905e58c6f2c3",
         "name":"test aam 2",
         "description":"test aam2",
         "rsid":"myrsid",
         "owner":{
            "id":596983
         }
      },
      {
         "id":"s300000022_5b9fef419678905e58c6f2c5",
         "name":"test aam 3",
         "description":"test aam 3",
         "rsid":"myrsid",
         "owner":{
            "id":596983
         }
      },
      {
         "id":"s300000022_5bb7c94e80f0073611afb35c",
         "name":"test create",
         "description":"",
         "rsid":"myrsid",
         "owner":{
            "id":596983
         }
      }
   ],
   "totalElements":6,
   "firstPage":true,
   "numberOfElements":6,
   "totalPages":1,
   "lastPage":true,
   "sort":null,
   "size":10,
   "number":0
}

```

## Retrieving a Single Segment

You can retrieve segments individually if you know the segment `id`. To find the segment `id`, you can refer to the report descriptions or find it by using the multiple segments endpoint.

### Example Request

The following example requests data on the segment `s300000022_5bb7c94e80f0073611afb35c` with company ID `obueng0`:

```

curl -X GET "https://analytics.adobe.io/api/obueng0/segments/s300000022_5bb7c94e80f0073611afb35c?locale=en_US" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: obueng0" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example Response

The following example shows the response data for the request on segment `s300000022_5bb7c94e80f0073611afb35c` with company ID `obueng0`:

```

{
  "id": "s300000022_5bb7c94e80f0073611afb35c",
  "name": "test create",
  "description": "",
  "rsid": "myrsid",
  "owner": {
    "id": 596983
  }
}

```

## Deleting a Segment

If you delete a segment, it is hidden from all users in all menus. Additionally, it is no longer returned when retrieving multiple segments in an API call. However, reports and other sources that reference the deleted segment are still able to use it. You can also continue to request it from the single segment API endpoint.

### Example Request

The following example deletes segment `s300000022_5bb7c94e80f0073611afb35c`:

```
curl -X DELETE "https://analytics.adobe.io/api/obueng0/segments/s300000022_5bb7c94e80f0073611afb35c?locale=en_US" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example Response

The following response shows the deletion status for segment `s300000022_5bb7c94e80f0073611afb35c`:

```

{
	"status":"ok"
}

```

## Updating a Segment

You can edit existing segments with the `PUT /segments/{id} endpoint`. Some fields cannot be edited on a segment with the PUT endpoint, including `tags`, `compatibility`, and `reportSuiteName`. Other fields, including `owner`, `name`, `description`, `rsid`, and `definition`, can be edited.

The `PUT` endpoint also supports partial updates. This means that instead of sending the entire JSON object to the API, you can simply send fields that you want to update. For example, if you only want to update the name, use the JSON `{"name":"Updated name"}`. The entire object is returned in the response, modified by the requested expansions.

### Example Request

The following example updates the segment `s300000022_5bb7c94e80f0073611afb35c` with a new name:

```

curl -X PUT "https://analytics.adobe.io/api/obueng0/segments/s300000022_5bb7c94e80f0073611afb35c?locale=en_US" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json" -d "{NAME}":"{NAME UPDATE}"

```

### Example Response

The following example shows the response with updated name data:

```

{
  "id": "s300000022_5bb7c94e80f0073611afb35c",
  "{NAME}": "{NAME UPDATE}",
  "description": "",
  "rsid": "myrsid",
  "owner": {
    "id": 596983
  }
}

```

## Validate Endpoint

Because report suites can have different configurations, variables, or metrics, one segment that is valid in one report suite may not be valid in another. To determine which segments to use in different report suites, you can use the `validate` endpoint. This endpoint allows you to `POST` a definition along with a target `rsid`. The validate endpoint responds with compatibility information on the segment.

### Example Request

The following example requests validation for the segment with `rsid`: `obunpurserdev`. The example first shows a `POST` of the JSON [definition](segments.md), followed by the request for compatibility data:

```

curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer {ACCESSTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -d "{
    "container": {
      "func": "container",
      "pred": {
        "str": "",
        "val": {
          "func": "attr",
          "name": "variables/evar7"
        },
        "func": "streq",
        "description": "Custom Conversion 7"
      },
      "context": "hits"
    },
    "func": "segment",
    "version": [
      1,
      0,
      0
    ]
  }" "https://analytics.adobe.io/api/obueng0/segments/validate?rsid=obunpurserdev" -H "x-api-key: {OAUTHTOKEN}"

```

### Example Response

The following response shows validation for the segment with `rsid`: `obunpurserdev`, including its compatibility with supported products (Data Warehouse, Oberon, and Discover), supported schema, and supported features.

```

{
  "valid": true,
  "validator_version": "1.1.11",
  "supported_products": \[
    "data_warehouse",
    "oberon",
    "discover"
  ],
  "supported_schema": \[
    "schema_data_warehouse",
    "schema_oberon"
  ],
  "supported_features": \[
    "function_attr",
    "function_container",
    "function_streq"
  ]
}
```
