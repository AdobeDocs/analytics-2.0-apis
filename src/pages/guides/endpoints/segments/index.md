---
title: Segments API
description: Create, edit, or delete segments using the API.
---

# Segments API

*This help page describes how to use the segments endpoint. For more information around how to use segments in Reporting API calls, see [Segments](../reports/segments.md) in the Reporting API guide.*

The Analytics 2.0 Segments APIs allow you to retrieve, update, or create segments programmatically through Adobe Developer. The APIs use the same data and methods that are used when working with segments in the UI. See [Segments](https://experienceleague.adobe.com/docs/analytics/components/segmentation/seg-home.html) in the Analytics Components user guide for more information.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Retrieve multiple segments

Retrieves all segments owned by the user. The following query string parameters are supported:

* **`rsid`**: Return segments that were created in the desired report suite(s). Separate multiple report suites with a comma. Note that while a segment can be used within multiple report suites, all segments have a single report suite that it belongs to. This query string filters by that parent report suite.
* **`segmentFilter`**: Return segments that match the desired ID(s). Separate multiple segment IDs with a comma.
* **`name`**: Return segments that contain this string in the segment's name.
* **`tagNames`**: Return segments that contain the desired tag(s).
* **`filterByPublishedSegments`**: Return segments by published state. Valid values include `true`, `false`, and `all`. Defaults to `all`.
* **`limit`**: The number of results per page. Default is `10`.
* **`page`**: If a response includes more results than `limit`, you can see additional results. The first page is `0`.
* **`expansion`**: Include additional fields for each segment returned. Valid values include `reportSuiteName`, `ownerFullName`, `modified`, `tags`, `compatibility`, `definition`, `publishingStatus`, `definitionLastModified`, and `categories`.
* **`includeType`**: If you have admin permissions, you can also include results for segments that you did not create. Valid values include `shared`, `templates`, and `all`.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/segments`

## Retrieve a single segment

You can retrieve segments individually by segment ID. You can use the API call that retrieves multiple segments to obtain the segment ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/segments/{ID}`

```json
{
  "id": "s300000022_5bb7c94e80f0073611afb35c",
  "name": "Example segment",
  "description": "",
  "rsid": "examplersid",
  "owner": {
    "id": 596983
  }
}
```

## Create a segment

Adobe recommends using the product UI to create segments. If you opt to use the API to create segments, note that some fields are ignored. For example, `tags` are not stored in segments themselves and are ignored if included when creating segments through the API. Use the [Tags endpoint](../componentmetadata/tags.md) to set or modify a segment's tags.

This API call requires a JSON request body, representing the segment definition to create.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/segments/`

## Update a segment

You can edit existing segments using a `PUT` API call. Note that `tags`, `compatibility`, and `reportSuiteName` cannot be edited.

The `PUT` endpoint also supports partial updates. Instead of sending the entire JSON object to the API, you can only send fields that you want to update. For example, if you only want to update the name, use the JSON `{"name":"Updated name"}`. The entire object is returned in the response, modified by the requested expansions.

`PUT https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/segments/{ID}`

```json
{
  "id": "s300000022_5bb7c94e80f0073611afb35c",
  "name": "Updated Example segment",
  "description": "",
  "rsid": "examplersid",
  "owner": {
    "id": 596983
  }
}
```

## Delete a segment

If you delete a segment, it is hidden from all users in all menus. It is also no longer returned when retrieving multiple segments in an API call. However, reports and other sources that reference the deleted segment can still use it. You can also continue to request it from the single segment API endpoint.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/segments/{ID}`

```json
{
  "status": "ok"
}
```
