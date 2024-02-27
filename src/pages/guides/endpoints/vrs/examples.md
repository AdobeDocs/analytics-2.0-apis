---
title: Virtual report suite examples
description: Example calls that you can make to the Virtual report suite API endpoint.
---

# Virtual report suite examples

Example calls that you can make to the Virtual report suite API endpoint.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Basic filtering using a segment

Creates a virtual report suite that filters data by a segment:

```json
{
  "name": "Basic VRS Creation Example",
  "parentRsid": "examplersid",
  "segmentList": [
    "s300005535_5b7d98bc5ef3a562937dba7e"
  ],
  "dataSchema": "Cache",
  "description": "Basic VRS Creation Example description"
}
```

## Timezone override

The parent report suite has a timezone of `US/Mountain` but the virtual report suite overrides the timezone to use `Australia/Sydney` (timezone ID of `47`). Use the `reportsuites/reportsuites/timezones` endpoint to obtain all timezone IDs.

```json
{
  "name": "Timezone Override Example",
  "parentRsid": "examplersid",
  "segmentList": [],
  "dataSchema": "Cache",
  "timezone" : 47
}
```

## Curated components

Creates a virtual report suite that curates the browser dimension and visits metric:

```json
{
  "name": "Curated Components Example",
  "parentRsid": "exampleRsid",
  "segmentList": [],
  "description": "Curated Components Example description",
  "curatedComponents": [{
    "componentId": "variables/browser",
    "componentType": "dimension",
    "curatedName": "Curated dimension example"
    },
    {
    "componentId": "metrics/visits",
    "componentType": "metric",
    "curatedName": "Curated metric example"
  }]
}
```

## Cross-Device Analytics

Creates a virtual report suite that has [CDA](https://experienceleague.adobe.com/docs/analytics/components/cda/overview.html) enabled (once you correctly configure the parent report suite):

```json
{
  "name": "CDA Example",
  "parentRsid": "examplersid",
  "segmentList": [],
  "dataSchema": "Stitched",
  "description": "CDA Example description"
}
```

## Custom session timeout

Creates a virtual report suite which overrides the session timeout rules so a new visit starts after 30 minutes of inactivity or when an order event is fired:

```json
{
  "name": "Custom Session Timeout Example",
  "parentRsid": "examplersid",
  "segmentList": [],
  "dataSchema": "CacheAndMid",
  "sessionDefinition": [{
    "numPeriods": 30,
    "func": "inactivity",
    "granularity": "minute"
    }, {
    "func": "beforeEvents",
    "events": ["metrics/orders"]
  }]
}
```
