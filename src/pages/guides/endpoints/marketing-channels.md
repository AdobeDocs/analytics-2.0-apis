---
title: Marketing Channels API
description: Use the Analytics Marketing Channels API to retrieve the marketing channels configured for your report suites.
---

# Marketing Channels API

Use the Analytics 2.0 Marketing Channels API endpoint to retrieve the marketing channels configured for one or more report suites.

Marketing channels are created in Adobe Analysis Workspace but can be identified in report suites with this endpoint. For more information regarding marketing channels, see the [Marketing channels overview](https://experienceleague.adobe.com/en/docs/advertising/integrations/analytics/mc/mc-overview).

The endpoint described in this guide is routed through `analytics.adobe.io`. To use it, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## POST marketing channels

Use the following URI path for this endpoint:

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/marketingchannels`

Although this endpoint retrieves data, it uses the `POST` method so that a list of report suite IDs can be supplied in the request body. It does not create or modify marketing channels.

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/marketingchannels" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "rsidList": [
      "examplersid"
    ]
  }'
```

#### Response

```json
[
  {
    "rsid": "examplersid",
    "marketingChannels": [
      {
        "channelId": 1,
        "name": "Paid Search",
        "enabled": true,
        "type": "online",
        "color": "0F59A9",
        "channelBreakdown": 0,
        "overrideLastTouchChannel": false
      },
      {
        "channelId": 2,
        "name": "Natural Search",
        "enabled": true,
        "type": "online",
        "color": "E07804",
        "channelBreakdown": 0,
        "overrideLastTouchChannel": false
      },
      {
        "channelId": 6,
        "name": "Direct",
        "enabled": true,
        "type": "online",
        "color": "056F73",
        "channelBreakdown": 0,
        "overrideLastTouchChannel": true
      }
    ]
  }
]
```

#### Request example details

The example above requests the marketing channels configured for the `examplersid` report suite ID. To retrieve marketing channels for multiple report suites in a single call, add additional IDs to the `rsidList` array.

#### Response example details

The example above returns the marketing channels for the requested report suite:

* Each item in the response corresponds to one report suite from the `rsidList`, identified by its `rsid`.
* The `marketingChannels` array lists each channel configured for that report suite.
* Each channel includes its `channelId`, display `name`, and whether it is `enabled`.
* The `color` value is the hexadecimal code (without a leading `#`) used to represent the channel in the interface.
* `overrideLastTouchChannel` indicates whether the channel overrides the last-touch channel in attribution.

### Request Parameters

The POST marketing channels endpoint accepts the following request body parameter:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsidList` | required | array of strings | A list of report suite IDs to retrieve marketing channels for. Must be non-empty. |

### Response Parameters

The following table describes the POST marketing channels response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `rsid` | string | The report suite ID that the returned marketing channels belong to |
| `marketingChannels` | container | The list of marketing channels configured for the report suite. Each item contains the fields below. |
| `channelId` | integer | Unique identifier for the marketing channel within the report suite |
| `name` | string | The display name of the marketing channel |
| `enabled` | boolean | Whether the marketing channel is enabled for the report suite |
| `type` | string | The marketing channel type (for example, `online`). |
| `color` | string | The hexadecimal color code (without the leading `#`) used to display the channel in the interface |
| `channelBreakdown` | integer | A numeric indicator of how the channel is broken down in reporting |
| `overrideLastTouchChannel` | boolean | Whether this channel overrides the last-touch channel in attribution |

## Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

| HTTP code | Meaning | Description |
| --- | --- | --- |
| 200 | Success | The request is successful. |
| 400 | Bad Request | The request was improperly constructed or missing key information. `rsidList` is required and must be non-empty. |
| 401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. |
| 403 | Forbidden | You do not have access to one or more of the requested report suites. |
| 404 | Not found | One or more of the requested report suites could not be found. |
| 500 | Internal server error | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. |
