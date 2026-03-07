---
title: Reporting API
description: Use the Reporting API to create advanced date-trended reports
---

# Report API: Advanced Date-Trended Report Guide  

This guide extends the features described in the [Basic Date-Trended API Report](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/kpi/) and introduces two advanced features:

1. Using date range comparisons in a date-trended report
2. Adding a segment to a date-trended report

All examples in this guide use the Adobe Analytics 2.0 **Reports API**. The endpoints described are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/).

# Include date range comparisons in a date-trended report


To make the request, use the following URI for your POST HTTP call:

POST `https://analytics.adobe.io/api/{global-company-id}/reports`

<InlineAlert variant="info" slots="text" />

The dimension object member is not required in report request payloads. For more information, see [Using `dimension` in report payload requests](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/#using-dimension-in-report-payload-requests).


```http
POST https://analytics.adobe.io/api/{globalCompanyId}/reports
```

### Required Headers

```http
Authorization: Bearer {ACCESS_TOKEN}
x-api-key: {CLIENT_ID}
x-proxy-global-company-id: {GLOBAL_COMPANY_ID}
Content-Type: application/json
```

---

## Date-Trended Report with an Added Segment

## Overview

A segment is applied using the `globalFilters` array.  
Segments limit the data included in the report before aggregation occurs.

Segments:

- Filter data **before** metric aggregation
- Can be applied alongside date ranges
- Can reference:
  - Saved segment IDs (`s123456789_abcdef`)
  - Dynamic inline segments (JSON definition)

---

## Call URL

```http
POST https://analytics.adobe.io/api/{globalCompanyId}/reports
```

---

## Explanation

To add a segment:

1. Keep your date trend dimension (e.g., `variables/daterangeday`)
2. Include both:
   - A `dateRange` filter
   - A `segment` filter

The segment acts as a pre-aggregation filter.

---

## Example Request  
### Visits by Day — Mobile Visitors Only

```json
{
  "rsid": "your_rsid",
  "globalFilters": [
    {
      "type": "dateRange",
      "dateRange": "2024-01-01T00:00:00.000/2024-01-31T23:59:59.999"
    },
    {
      "type": "segment",
      "segmentId": "s123456789_abcdef"
    }
  ],
  "dimension": "variables/daterangeday",
  "metricContainer": {
    "metrics": [
      {
        "id": "metrics/visits"
      }
    ]
  }
}
```

---

## Example Response

```json
{
  "rows": [
    {
      "itemId": "20240101",
      "value": "Jan 1, 2024",
      "data": [842]
    },
    {
      "itemId": "20240102",
      "value": "Jan 2, 2024",
      "data": [915]
    }
  ],
  "columns": {
    "columnIds": ["0"],
    "metricIds": ["metrics/visits"]
  },
  "summa
