# Report API: Advanced Date-Trended Report Guide  
## Segments & Date Range Comparisons

This guide extends the **Basic Date-Trended API Report** and introduces two advanced patterns:

1. **Adding a Segment to a Date-Trended Report**
2. **Using Date Range Comparisons in a Date-Trended Report**

Each section follows the same structure:

- Call URL  
- Explanation  
- Example Request  
- Example Response  
- Response Details  
- Parameter Tables  

All examples use the Adobe Analytics 2.0 **Reports API**.

---

# Base Endpoint (Used in All Examples)

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

# 1️⃣ Date-Trended Report with an Added Segment

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
