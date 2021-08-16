---
title: Segments
description: Create, edit, or delete segments using the API.
---

# Segments endpoint

*This help page describes how to use the segments endpoint. For more information around how to use segments in Reporting API calls, see [Segments](../reports/segments.md) in the Reporting API guide.*

The Analytics 2.0 Segments APIs allow you to retrieve, update, or create segments programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with segments in the UI. See [Segments](https://experienceleague.adobe.com/docs/analytics/components/segmentation/seg-home.html) in the Analytics Components user guide for more information.

## Retrieve multiple segments

When requesting a list of segments, you can use multiple URL query parameter filters. You can filter by `name`, `tagNames`, segment id (`segmentFilter`), and `rsids`. For example, to retrieve all segments tagged as part of the *SpringPromotion* campaign, you can add the URL parameter `tagNames=SpringPromotion`. The `tagNames`, `segmentFIlter`, and `rsids` filters accept comma-delimited lists. These lists should be short, with no more than 100 items. While segments are global to a company, the `rsid` filter specifically designates the Report suite ID that the segment was created/validated against. The `rsid` filter designation does not mean that it is the only report suite the segment can be used on.

`GET https://analytics.adobe.io/api/{REPORT_SUITE_ID}/segments`

## Retrieve a single segment

You can retrieve segments individually by segment ID.

`GET https://analytics.adobe.io/api/{REPORT_SUITE_ID}/segments/{ID}`

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

## Update a segment

You can edit existing segments using a `PUT` API call. Note that `tags`, `compatibility`, and `reportSuiteName` cannot be edited.

The `PUT` endpoint also supports partial updates. Instead of sending the entire JSON object to the API, you can only send fields that you want to update. For example, if you only want to update the name, use the JSON `{"name":"Updated name"}`. The entire object is returned in the response, modified by the requested expansions.

`PUT https://analytics.adobe.io/api/{REPORT_SUITE_ID}/segments/{ID}`

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

`DELETE https://analytics.adobe.io/api/{REPORT_SUITE_ID}/segments/{ID}`

```json
{
	"status": "ok"
}
```
